import { Request, Response } from 'express'

import checkQueriesErros from '../../components/query-validation'
import { Product } from '../../../models/Product'
import { getStoreDatesFromDatabase } from '../../../models/StoreDate'
import { getUserInDatabase, IUserMongo } from '../../../models/User'
import addCompleteProductInfoToComputedProducts from '../../utils/add-complete-product-info-to-computed-products'
import getUniqueProductsFromStoreDates from '../../utils/get-unique-products-from-store-dates'

export default async function getRecentSoldProductsController(request: Request, response: Response) {

  try{

    const { limit, user_id } = request.query

    if (checkQueriesErros({ limit, user_id }, response) === true) { return }

    const userObj = await getUserInDatabase({ _id: user_id})
    if (userObj === null){throw new Error("user not found")}

    let recentSoldProductsArr = []

    if (userObj.userRole === 'admin'){
      recentSoldProductsArr = await getAdminRecentSoldProducts(Number(limit))
    } else if (userObj.userRole === 'user'){
      recentSoldProductsArr = await getUserRecentSoldProducts(Number(limit), userObj)
    } else {
      throw new Error('user role not found')
    }

    response.json(recentSoldProductsArr)

  }catch(e){
    response.json({ error: e.message })
  }

}

async function getAdminRecentSoldProducts(limit: number){

  const recentSoldProductsArr = await Product.find({}).sort({"lastSaleIso": -1}).limit(Number(limit))
  return recentSoldProductsArr

}

async function getUserRecentSoldProducts(limit: number, userObj: IUserMongo){

  if (userObj.registeredStores.length === 0){return []}

  const currentUserSpyingStores = userObj.registeredStores.filter(store => store.isSpying === true)
  const userQuery = currentUserSpyingStores.map(store => {
    return {
      storeLink: store.storeLink,
      lastSale: {$in: store.spyDates.map((e: any) => new RegExp(`^${e}`, "i"))}
    }
  })

  const recentSoldProductsArr = await Product.find({$or: userQuery}).sort({"lastSaleIso": -1}).limit(Number(limit))

  const storeDatesQuery = userObj.registeredStores.map(store => {
    return {
      storeLink: store.storeLink,
      date: { $in: store.spyDates }
    }
  })

  const storeDates = await getStoreDatesFromDatabase({ $or: storeDatesQuery })
  const storeDatesProducts = getUniqueProductsFromStoreDates(storeDates)
  const filteredProducts = storeDatesProducts.filter(product => recentSoldProductsArr.findIndex(pdt => pdt.productLink === product.productLink) > -1)
  const completeProduct = await addCompleteProductInfoToComputedProducts(filteredProducts)

  return completeProduct

}
