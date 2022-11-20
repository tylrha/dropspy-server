import { Request, Response } from 'express'
import { getStoreDatesFromDatabase, getUniqueStoresFromStoreDates } from '../../../models/StoreDate'
import { getUserInDatabase, IUserMongo } from '../../../models/User'
import addCompleteProductInfoToComputedProducts from '../../utils/add-complete-product-info-to-computed-products'
import getComputedStoresFromStoreDates from '../../utils/get-computed-stores-from-store-dates'

export default async function getAllProductsController(request: Request, response: Response) {

  try{

    const { limit, skip, user_id  } = request.query

    const userObj = await getUserInDatabase({ _id: user_id})
    if (userObj === null){throw new Error("user not found")}

    let finalProductsArr = []
    if (userObj.userRole === 'admin'){
      finalProductsArr = await getAdminAllProducts(limit ? Number(limit) : undefined, skip ? Number(skip) : undefined)
    } else if (userObj.userRole === 'user'){
      finalProductsArr = await getUserAllProducts(userObj)
    } else {
      throw new Error('user role not found')
    }

    response.json(finalProductsArr)
  }catch(e){
    response.json({error: e.message})

  }
}

async function getAdminAllProducts(limit: number, skip: number){

  const uniqueStores = await getUniqueStoresFromStoreDates()

  let initialLimit = 0
  let finalLimit = uniqueStores.length

  if (limit && !skip){
    initialLimit = 0
    finalLimit = Number(limit)
  } else if (limit && skip){
    initialLimit = Number(skip)
    finalLimit = Number(skip) + Number(limit)
  }

  const currentQueryStores = uniqueStores.slice(initialLimit, finalLimit)
  const storeDates = await getStoreDatesFromDatabase({ storeLink: {$in: currentQueryStores} })
  const computedStores = getComputedStoresFromStoreDates(storeDates)

  let finalProductsArr = [].concat.apply([], [...computedStores.map(store => store.products)])
  finalProductsArr = await addCompleteProductInfoToComputedProducts(finalProductsArr)

  return finalProductsArr
}

async function getUserAllProducts(userObj: IUserMongo){

  if (userObj.registeredStores.length === 0){return []}

  const storeDatesQuery = userObj.registeredStores.map(store => {
    return {
      storeLink: store.storeLink,
      date: { $in: store.spyDates }
    }
  })

  const storeDates = await getStoreDatesFromDatabase({ $or: storeDatesQuery })
  const computedStores = getComputedStoresFromStoreDates(storeDates)

  let finalProductsArr = [].concat.apply([], [...computedStores.map(store => store.products)])
  finalProductsArr = await addCompleteProductInfoToComputedProducts(finalProductsArr)

  return finalProductsArr
}
