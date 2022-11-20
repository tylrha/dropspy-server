import { Request, Response } from 'express'

import { getUserInDatabase, IUserMongo } from '../../../models/User'
import { getProductStoreDatesDocs, IStoreDate } from '../../../models/StoreDate'

import checkQueriesErros from '../../components/query-validation'
import getComputedStoresFromStoreDates from '../../utils/get-computed-stores-from-store-dates'
import addCompleteProductInfoToComputedProducts from '../../utils/add-complete-product-info-to-computed-products'

export default async function getProductController(request: Request, response: Response) {

  try {

    const { product_link, user_id } = request.query

    if (checkQueriesErros({ product_link, user_id }, response) === true) { return }

    const userObj = await getUserInDatabase({ _id: user_id})
    if (userObj === null){throw new Error("user not found")}

    let finalProductObj = {}

    if (userObj.userRole === 'admin'){
      finalProductObj = await getAdminProduct(product_link.toString())
    } else if (userObj.userRole === 'user'){
      finalProductObj = await getUserProduct(product_link.toString(), userObj)
    } else {
      throw new Error('user role not found')
    }

    response.json(finalProductObj)

  } catch (e) {

    response.json({ error: e.message})

  }


}

async function getAdminProduct(productLink: string){
  const storeDates = await getProductStoreDatesDocs(productLink)
  return await getProductFromStoreDates(storeDates, productLink)
}

async function getUserProduct(productLink: string, userObj: IUserMongo){

  const storeDates = await getProductStoreDatesDocs(productLink)

  const filteredStoreDates = storeDates.filter((storeDate: IStoreDate) => {
    const storeObj = userObj.registeredStores.find(item => item.storeLink === storeDate.storeLink)
    const dateIndex = storeObj.spyDates.findIndex(date => date === storeDate.date)
    return dateIndex > -1
  })

  return await getProductFromStoreDates(filteredStoreDates, productLink)
}

async function getProductFromStoreDates(storeDates: IStoreDate[], productLink: string) {

  const computedStores = getComputedStoresFromStoreDates(storeDates)

  let allProductsArr = [].concat.apply([], [...computedStores.map(store => store.products)])
  allProductsArr = await addCompleteProductInfoToComputedProducts(allProductsArr)

  let finalProductObj = allProductsArr.find((product: any) => product.productLink === productLink)

  const productDates = storeDates.map((storeDate: any) => {
    return {
      date: storeDate.date,
      sales: storeDate.products.find((pdt: any) => pdt.productLink === productLink).sales,
      revenue: storeDate.products.find((pdt: any) => pdt.productLink === productLink).revenue
    }
  })

  finalProductObj.dates = productDates

  return finalProductObj
}
