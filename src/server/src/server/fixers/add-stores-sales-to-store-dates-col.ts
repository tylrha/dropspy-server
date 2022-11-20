import { Request, Response } from 'express';
import {
  DATABASE_DATABASE_SPY,
  DATABASE_COLLECTION_LABELS,
  DATABASE_COLLECTION_SPY_PRODUCTS,
  DATABASE_COLLECTION_SPY_STORES
} from '../../../configs/configs';
import { getIsoDateFromString } from '../../../utils/libraries/dates';

export default async function addStoresSalesToStoreDatesSales(req: Request, res: Response) {

  console.log("add stores sales to store-dates sales")

  try {

    const DBCLIENT = global['DBCLIENT']

    const db = await DBCLIENT.db(DATABASE_DATABASE_SPY)
    const storesCol = await db.collection(DATABASE_COLLECTION_SPY_STORES)
    const productsCol = await db.collection(DATABASE_COLLECTION_SPY_PRODUCTS)
    const storesByDatesCol = await db.collection("stores-by-date")

    const STORES_COUNT = 1
    const storesDocs = await storesCol.find({}).limit(STORES_COUNT).toArray()

    let finalResult = []
    for(let x = 0; x < STORES_COUNT; x++){

      const curStore = storesDocs[x]
      const storeProducts = await productsCol.find({storeLink: curStore.storeLink}).toArray()

      console.log(Number(x + 1) + " / " + storesDocs.length + " - " + storeProducts.length)
      const result1 = await saveStoresSalesByDate(storesByDatesCol, curStore.storeLink, storeProducts)
      finalResult.push(result1)
    }

    res.json({
      finalResult
    })

  } catch (e) {
    res.json({
      error: e.message
    })
  }
}


async function saveStoresSalesByDate(storesByDatesCol, storeLink, storeProducts){

  let storeDatesArr = []

  for (let x = 0; x < storeProducts.length; x++) {
    const curProduct = storeProducts[x];

    for(let y = 0; y < curProduct.dates.length; y++){
      const curDate = curProduct.dates[y]

      let storeDatesDateIndex = storeDatesArr.findIndex(storeDate => storeDate.date === curDate.date)
      if (storeDatesDateIndex === -1){
        storeDatesArr.push({
          storeLink,
          date: curDate.date,
          isoDate: getIsoDateFromString(curDate.date),
          totalSales: 0,
          totalRevenue: 0,
          totalProducts: 0,
          products: []
        })

        storeDatesDateIndex = storeDatesArr.length - 1
      }

      let storeDatesDateProductIndex = storeDatesArr[storeDatesDateIndex].products.findIndex(storeDateProduct => storeDateProduct.productLink === curProduct.productLink)
      if (storeDatesDateProductIndex === -1){
        storeDatesArr[storeDatesDateIndex].products.push({
          productLink: curProduct.productLink,
          sales: 0,
          revenue: 0,
        })

        storeDatesDateProductIndex = storeDatesArr[storeDatesDateIndex].products.length - 1
      }

      storeDatesArr[storeDatesDateIndex].totalProducts += storeDatesArr[storeDatesDateIndex].products.length
      storeDatesArr[storeDatesDateIndex].totalSales += curDate.sales
      storeDatesArr[storeDatesDateIndex].totalRevenue = Number((storeDatesArr[storeDatesDateIndex].totalRevenue + curDate.revenue).toFixed(2))
      storeDatesArr[storeDatesDateIndex].products[storeDatesDateProductIndex].sales += curDate.sales
      storeDatesArr[storeDatesDateIndex].products[storeDatesDateProductIndex].revenue = Number((storeDatesArr[storeDatesDateIndex].products[storeDatesDateProductIndex].revenue + curDate.revenue).toFixed(2))

    }
  }

  return storeDatesArr

}
