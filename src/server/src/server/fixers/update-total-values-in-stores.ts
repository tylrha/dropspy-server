import { Request, Response } from 'express';
import {
  DATABASE_DATABASE_SPY,
  DATABASE_COLLECTION_LABELS,
  DATABASE_COLLECTION_SPY_PRODUCTS,
  DATABASE_COLLECTION_SPY_STORES,
  DATABASE_COLLECTION_STORES_BY_DATES
} from '../../../configs/configs';
import { getIsoDateFromString } from '../../../utils/libraries/dates';

export default async function updateTotalValuesInStores(req: Request, res: Response) {

  console.log("update total values in stores")

  try {

    const DBCLIENT = global['DBCLIENT']

    const db = await DBCLIENT.db(DATABASE_DATABASE_SPY)
    const storesCol = await db.collection(DATABASE_COLLECTION_SPY_STORES)
    const storesByDatesCol = await db.collection(DATABASE_COLLECTION_STORES_BY_DATES)

    const storesDocs = await storesCol.find({}).toArray()

    for(let x = 0; x < storesDocs.length; x++){
      const curStore = storesDocs[x]
      const allStoreDatesDocs = await storesByDatesCol.find({storeLink: curStore.storeLink}).toArray()

      const totalRevenue = Number((allStoreDatesDocs.map(storeDate => storeDate.totalRevenue).reduce((pSum, a) => pSum + a, 0)).toFixed(2))
      const totalSales = Number((allStoreDatesDocs.map(storeDate => storeDate.totalSales).reduce((pSum, a) => pSum + a, 0)))
      const totalDates = allStoreDatesDocs.length
      let productsArr = []
      allStoreDatesDocs.forEach(storeDate => {
        storeDate.products.forEach(product => {
          if (productsArr.indexOf(product.productLink) === -1){
            productsArr.push(product.productLink)
          }
        })
      })
      const totalProducts = productsArr.length

      const newStore = {
        ...curStore,
        totalRevenue,
        totalSales,
        totalDates,
        totalProducts
      }
      await storesCol.updateOne({storeLink: curStore.storeLink}, { '$set': newStore });
      console.log(curStore.storeLink + " - " + allStoreDatesDocs.length)
    }

    return {finalResult: true}

  } catch (e) {
    return {
      error: e.message
    }
  }
}
