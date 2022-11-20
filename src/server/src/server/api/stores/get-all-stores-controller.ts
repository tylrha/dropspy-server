import { Request, Response } from 'express'

import { getStoresFromDatabase } from '../../../models/Store'
import { getStoreDatesFromDatabase } from '../../../models/StoreDate'
import { getUserInDatabase, IUserMongo } from '../../../models/User'
import addStoreCompleteInfoToComputedStores from '../../utils/add-complete-store-info-to-computed-stores'
import getComputedStoresFromStoreDates from '../../utils/get-computed-stores-from-store-dates'
import getUserAllowedStoreDatesQuery from '../../utils/get-user-allowed-store-dates-query'

export default async function getAllStoresController(request: Request, response: Response) {

  try{

    const { skip, limit, user_id } = request.query
    const userObj = await getUserInDatabase({ _id: user_id})
    if (userObj === null){throw new Error("user not found")}

    let finalStoresArr = []
    if (userObj.userRole === 'admin'){
      finalStoresArr = await getAdminAllStores(limit ? Number(limit) : undefined, skip ? Number(skip) : undefined)
    } else if (userObj.userRole === 'user'){
      finalStoresArr = await getUserAllStores(userObj)
    } else {
      throw new Error('user role not found')
    }

    finalStoresArr = finalStoresArr.map((store) => {
      let newStore = {...store}
      newStore.isSpyingGlobal = newStore.isSpying
      delete newStore.isSpying
      return newStore
    })

    response.json(finalStoresArr)

  } catch(e){
    response.json({error: e.message})
  }
}

async function getAdminAllStores(limit: number, skip: number){

  let adminStoresArr = []

  if (limit && !skip){
    adminStoresArr = await getStoresFromDatabase({}, limit)
  } else if (limit && skip){
    adminStoresArr = await getStoresFromDatabase({}, limit, skip)
  } else {
    adminStoresArr = await getStoresFromDatabase({})
  }

  adminStoresArr = adminStoresArr.map((store) => {
    let newStore = {...store}
    return newStore['_doc']
  })

  return adminStoresArr

}

async function getUserAllStores(userObj: IUserMongo){

  if (userObj.registeredStores.length === 0){return []}

  const storeDatesQuery = getUserAllowedStoreDatesQuery(userObj)
  const storeDates = await getStoreDatesFromDatabase({ $or: storeDatesQuery })
  const computedStores = getComputedStoresFromStoreDates(storeDates)

  let finalComputedStores = []

  if (computedStores.length === 0){
    const allStores = await getStoresFromDatabase({storeLink: {$in: userObj.registeredStores.map(store => store.storeLink)}})

    finalComputedStores = allStores.map(store => {

      const userStore = userObj.registeredStores.find(str => str.storeLink === store.storeLink)

      return {
        ...store['_doc'],
        totalDates: userStore.totalDates,
        totalProducts: 0,
        totalRevenue: 0,
        totalSales: 0
      }
    })

  } else {

    let storesToAddArr = userObj.registeredStores.filter((store) => computedStores.map(str => str.storeLink).indexOf(store.storeLink) === -1).map((item: any) => {
      return {
        storeLink: item.storeLink,
        totalSales: 0,
        totalRevenue: 0,
        totalDates: item.totalDates,
        totalProducts: 0,
        products: [],
        dates: item.spyDates.map((date) => {
          return {
            date: date,
            sales: 0,
            revenue: 0
          }
        })

      }
    })

    finalComputedStores = computedStores.concat(storesToAddArr)
    finalComputedStores = await addStoreCompleteInfoToComputedStores(finalComputedStores)
  }

  return finalComputedStores

}
