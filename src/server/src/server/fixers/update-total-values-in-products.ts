import { Request, Response } from 'express';
import {
  DATABASE_DATABASE_SPY,
  DATABASE_COLLECTION_LABELS,
  DATABASE_COLLECTION_SPY_PRODUCTS,
  DATABASE_COLLECTION_SPY_STORES,
  DATABASE_COLLECTION_STORES_BY_DATES
} from '../../../configs/configs';
import { getIsoDateFromString } from '../../../utils/libraries/dates';

export default async function updateTotalValuesInProducts(req: Request, res: Response) {

  console.log("update total values in products")

  try {

    const DBCLIENT = global['DBCLIENT']

    const db = await DBCLIENT.db(DATABASE_DATABASE_SPY)
    const storesByDatesCol = await db.collection(DATABASE_COLLECTION_STORES_BY_DATES)
    const productsCol = await db.collection(DATABASE_COLLECTION_SPY_PRODUCTS)
    const productsDocs = await productsCol.find({}).skip(8000).limit(6000).toArray()

    for(let x = 0; x < productsDocs.length; x++){
      const curProduct = productsDocs[x]
      const allProductsDocs = await storesByDatesCol.find({products: { $elemMatch: {productLink: curProduct.productLink}}}).toArray()

      const productInAllDatesArr = allProductsDocs.map(storeDate => storeDate.products.find(pdt => pdt.productLink === curProduct.productLink))

      const totalRevenue = Number((productInAllDatesArr.map(storeDate => storeDate.revenue).reduce((pSum, a) => pSum + a, 0)).toFixed(2))
      const totalSales = Number((productInAllDatesArr.map(storeDate => storeDate.sales).reduce((pSum, a) => pSum + a, 0)))
      const totalDates = productInAllDatesArr.length

      const newProduct = {
        ...curProduct,
        totalRevenue,
        totalSales,
        totalDates,
      }

      await productsCol.updateOne({productLink: curProduct.productLink}, { '$set': newProduct });

      console.log(x + " - " + curProduct.productLink + " - " + totalDates)

    }

    console.log("Acabou!")

    return {finalResult: true}

  } catch (e) {
    return {
      error: e.message
    }
  }
}
