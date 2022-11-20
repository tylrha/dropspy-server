import { Request, Response } from 'express'

import checkQueriesErros from '../../components/query-validation'
import { getStoreDatesFromDatabase } from '../../../models/StoreDate'
import { getUserInDatabase, IUserMongo } from '../../../models/User'
import addCompleteProductInfoToComputedProducts from '../../utils/add-complete-product-info-to-computed-products'
import addStoreCompleteInfoToComputedStores from '../../utils/add-complete-store-info-to-computed-stores'

export default async function getDateController(request: Request, response: Response) {

  try {

    const { initial_date, user_id } = request.query
    if (checkQueriesErros({ initial_date, user_id }, response) === true) { return }

    const userObj = await getUserInDatabase({ _id: user_id })
    if (userObj === null) { throw new Error("user not found") }

    let finalDateObj = {}

    if (userObj.userRole === 'admin') {
      finalDateObj = await getAdminDate(initial_date.toString())
    } else if (userObj.userRole === 'user') {
      finalDateObj = await getUserDate(initial_date.toString(), userObj)
    } else {
      throw new Error('user role not found')
    }

    response.json(finalDateObj)

  } catch (e) {
    response.json({ error: e.message })
  }
}

async function getAdminDate(initial_date: string){

  const storeDates = await getStoreDatesFromDatabase({date: initial_date})
  const computedDate = await computeDateFromStoreDates(initial_date, storeDates)

  return computedDate

}

async function getUserDate(initial_date: string, userObj: IUserMongo){

  const storeDatesQuery = userObj.registeredStores.map(store => {
    if (store.spyDates.findIndex(date => date === initial_date) > -1){
      return {
        storeLink: store.storeLink,
        date: initial_date
      }
    }
  }).filter(item => item !== undefined)

  const storeDates = await getStoreDatesFromDatabase({ $or: storeDatesQuery })
  const computedDate = await computeDateFromStoreDates(initial_date, storeDates)

  return computedDate

}

async function computeDateFromStoreDates(initial_date: string, storeDates){

  let finalDateObj = {
    date: initial_date,
    totalRevenue: Number((storeDates.map(item => item.totalRevenue).reduce((pSum, a) => pSum + a, 0)).toFixed(2)),
    totalSales: Number(storeDates.map(item => item.totalSales).reduce((pSum, a) => pSum + a, 0)),
    totalStores: storeDates.length,
    totalProducts: Number(storeDates.map(item => item.totalProducts).reduce((pSum, a) => pSum + a, 0)),
    stores: storeDates.map(item => ({storeLink: item.storeLink, totalSales: item.totalSales, totalRevenue: item.totalRevenue, totalProducts: item.totalProducts})),
    products: [].concat.apply([], [...storeDates.map(item => item.products)])
  }

  const completeProducts = await addCompleteProductInfoToComputedProducts(finalDateObj.products)
  const completeStores = await addStoreCompleteInfoToComputedStores(finalDateObj.stores)

  finalDateObj.stores = completeStores
  finalDateObj.products = completeProducts.map(product => ({...product, totalSales: product.sales, totalRevenue: product.revenue}))

  return finalDateObj
}


/*

  finalDateObj.stores = finalDateObj.stores.map(store => {
    let newStore = {...store}

    const {
      storeName,
      storeLogoLink,
      storeCategory,
      storeCountry
    } = completeStores.find(str => str.storeLink === store.storeLink)

    return {
      ...newStore,
      totalDates: 1,
      storeName,
      storeLogoLink,
      storeCategory,
      storeCountry
    }
  })

  finalDateObj.products = finalDateObj.products.map(product => {
    let newProduct = {...product}

    const {
      productName,
      productImage,
      productPrice,
      totalLabels,
    } = completeProducts.find(pdt => pdt.productLink === product.productLink)

    const {
      sales,
      revenue,
      productLink
    } = newProduct

    return {
      productLink,
      totalSales: sales,
      totalRevenue: revenue,
      totalDates: 1,
      productName,
      productImage,
      productPrice,
      totalLabels,
    }
  })
*/
