import { Request, Response } from 'express'
import checkQueriesErros from '../../components/query-validation'
import { getProductsFromDatabase } from '../../../models/Product'
import { getStoresFromDatabase } from '../../../models/Store'
import { getStoreDatesFromDatabase } from '../../../models/StoreDate'
import { getUserInDatabase, IUserMongo } from '../../../models/User'
import addCompleteProductInfoToComputedProducts from '../../utils/add-complete-product-info-to-computed-products'
import getUniqueProductsFromStoreDates from '../../utils/get-unique-products-from-store-dates'

export default async function getAllCategoryProductsController(request: Request, response: Response) {

  try{

    const { category, user_id } = request.query
    if (checkQueriesErros({ category, user_id }, response) === true) { return }

    const userObj = await getUserInDatabase({ _id: user_id})
    if (userObj === null){throw new Error("user not found")}

    let categoryStores = []
    if (userObj.userRole === 'admin'){
      categoryStores = await getAdminCategory(category.toString())
    } else if (userObj.userRole === 'user'){
      categoryStores = await getUserCategory(category.toString(), userObj)
    } else {
      throw new Error('user role not found')
    }

    response.json(categoryStores)

  } catch(e){
    response.json({ error: e.message})
  }


}

async function getAdminCategory(category: string){
  console.log("CATEGORY PRODUCTS FROM ADMIN")

  const categoryStores = await getStoresFromDatabase({storeCategory: category})
  const categoryProducts = await getProductsFromDatabase({storeLink: {$in: categoryStores.map(store => store.storeLink)}})
  return categoryProducts

}

async function getUserCategory(category: string, userObj: IUserMongo){
  console.log("CATEGORY PRODUCTS FROM USER")

  const categoryStores = await getStoresFromDatabase({storeCategory: category})
  const filteredCategoryStores = userObj.registeredStores.filter(store => categoryStores.findIndex(str => str.storeLink === store.storeLink) > -1)
  const storeDatesQuery = filteredCategoryStores.map(store => ({ storeLink: store.storeLink, date: { $in: store.spyDates }}))
  const storeDates = await getStoreDatesFromDatabase({$or: storeDatesQuery})

  const productsFromStoreDates = getUniqueProductsFromStoreDates(storeDates)
  const completeProducts = await addCompleteProductInfoToComputedProducts(productsFromStoreDates)
  return completeProducts
}
