import { Request, Response } from 'express';
import {
  DATABASE_DATABASE_SPY,
  DATABASE_COLLECTION_LABELS,
  DATABASE_COLLECTION_SPY_PRODUCTS,
  DATABASE_COLLECTION_SPY_STORES,
  DATABASE_COLLECTION_STORES_BY_DATES
} from '../../../configs/configs';
import { getIsoDateFromString } from '../../../utils/libraries/dates';

export default async function updateProductsCollection(req: Request, res: Response) {

  console.log("update total values in products")

  try {

    const DBCLIENT = global['DBCLIENT']

    const db = await DBCLIENT.db(DATABASE_DATABASE_SPY)
    const productsCol = await db.collection(DATABASE_COLLECTION_SPY_PRODUCTS)
    const productsDocs = await productsCol.find({}).toArray()

    for(let x = 0; x < productsDocs.length; x++){
      const curProduct = productsDocs[x]

      const {
        productName,
        productLink,
        productImage,
        productPrice,
        storeName,
        storeLink,
        initialDate,
        lastSale,
        lastSaleIso,
        totalLabels,
        labels,
        totalDates,
        totalRevenue,
        totalSales
      } = curProduct

      const newProduct = {
        productName,
        productLink,
        productImage,
        productPrice,
        storeName,
        storeLink,
        initialDate,
        lastSale,
        lastSaleIso,
        totalRevenue,
        totalSales,
        totalDates,
        totalLabels,
        labels
      }

      await productsCol.deleteOne({productLink: curProduct.productLink});
      await productsCol.insertOne(newProduct);

      console.log(x + " - " + curProduct.productLink + " - ")

    }

    console.log("Acabou!")

    return {finalResult: true}

  } catch (e) {
    return {
      error: e.message
    }
  }
}
