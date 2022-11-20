import { Request, Response } from 'express'
import checkQueriesErros from '../../components/query-validation'
import { Product } from '../../../models/Product'
import { getStoreFromDatabase } from '../../../models/Store'
import { getStoreDatesFromDatabase } from '../../../models/StoreDate'
import { getUserInDatabase, IUserMongo } from '../../../models/User'
import addCompleteProductInfoToComputedProducts from '../../utils/add-complete-product-info-to-computed-products'
import getUniqueProductsFromStoreDates from '../../utils/get-unique-products-from-store-dates'
import getUserAllowedStoreDatesQuery from '../../utils/get-user-allowed-store-dates-query'

export default async function getTopNProductsController(request: Request, response: Response) {

  try{

    const { limit, user_id } = request.query
    if (checkQueriesErros({ limit, user_id }, response) === true) { return }

    const userObj = await getUserInDatabase({ _id: user_id })
    if (userObj === null) { throw new Error("user not found") }

    let topProductsArr = []
    if (userObj.userRole === 'admin') {
      topProductsArr = await getAdminTopProducts(Number(limit))
    } else if (userObj.userRole === 'user') {
      topProductsArr = await getUserTopProducts(Number(limit), userObj)
    } else {
      throw new Error('user role not found')
    }

    response.json(topProductsArr)

  }catch(e){
    response.json({ error: e.message })
  }
}

async function getAdminTopProducts(limit: number){

  const topProductsArr = await Product.find({}).sort({"totalRevenue": -1}).limit(Number(limit))
  return topProductsArr
}

async function getUserTopProducts(limit: number, userObj: IUserMongo){

  if (userObj.registeredStores.length === 0){return []}

  const storeDatesQuery = getUserAllowedStoreDatesQuery(userObj)
  const storeDates = await getStoreDatesFromDatabase({$or: storeDatesQuery})

  const uniqueProducts = getUniqueProductsFromStoreDates(storeDates)
  const completeProducts = await addCompleteProductInfoToComputedProducts(uniqueProducts)
  const slicedCompleteProducts = completeProducts.sort((a, b) => (a.totalRevenue > b.totalRevenue ? -1 : 1)).slice(0, Number(limit))

  return slicedCompleteProducts
}


