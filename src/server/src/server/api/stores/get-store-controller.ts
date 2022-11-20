import { Request, Response } from 'express'

import { getUserInDatabase, IUserMongo } from '../../../models/User'
import { getStoreDatesFromDatabase } from '../../../models/StoreDate'

import checkQueriesErros from '../../components/query-validation'
import getUserAllowedStoreDatesQuery from '../../utils/get-user-allowed-store-dates-query'
import getComputedStoresFromStoreDates from '../../utils/get-computed-stores-from-store-dates'
import addStoreCompleteInfoToComputedStores from '../../utils/add-complete-store-info-to-computed-stores'
import addCompleteProductInfoToComputedProducts from '../../utils/add-complete-product-info-to-computed-products'
import { getStoreFromDatabase } from '../../../models/Store'

export default async function getStoreController(request: Request, response: Response) {

  try {
    const { store_link, user_id } = request.query

    if (checkQueriesErros({ store_link, user_id  }, response) === true) { return }

    const userObj = await getUserInDatabase({ _id: user_id})
    if (userObj === null){throw new Error("user not found")}

    let finalStoreObj = {}
    if (userObj.userRole === 'admin'){
      finalStoreObj = await getAdminStore(store_link.toString())
    } else if (userObj.userRole === 'user'){
      finalStoreObj = await getUserStore(userObj, store_link.toString())
    } else {
      throw new Error('user role not found')
    }

    response.json(finalStoreObj)

  } catch (e) {
    console.log(e)
    response.json({ error: e.message }) //
  }

}

async function getAdminStore(store_link: string){

  const adminStore = await getStoreFromDatabase({storeLink: store_link})
  let storeAditionalInfo = {}

  const storeStoreDates = await getStoreDatesFromDatabase({storeLink: store_link})
  if (storeStoreDates.length === 0){
    storeAditionalInfo = {
      dates: [],
      products: []
    }
  } else {
    const computedStores = getComputedStoresFromStoreDates(storeStoreDates)
    const completedStores = await addStoreCompleteInfoToComputedStores(computedStores)

    storeAditionalInfo = {
      dates: completedStores[0].dates,
      products: await addCompleteProductInfoToComputedProducts(completedStores[0].products)
    }
  }

  const finalStoreObj = {
    ...adminStore['_doc'],
    ...storeAditionalInfo
  }

  return finalStoreObj
}

async function getUserStore(userObj: IUserMongo, store_link: string){
  const storeAllowedStoreDatesQuery = getUserAllowedStoreDatesQuery(userObj).find(str => str.storeLink === store_link)
  const storeAllowedStoreDates = await getStoreDatesFromDatabase(storeAllowedStoreDatesQuery)
  const computedStores = getComputedStoresFromStoreDates(storeAllowedStoreDates)
  const completedStores = await addStoreCompleteInfoToComputedStores(computedStores)

  let finalStoreObj = completedStores[0]
  finalStoreObj.products = await addCompleteProductInfoToComputedProducts(finalStoreObj.products)

  return finalStoreObj
}
