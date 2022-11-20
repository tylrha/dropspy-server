import { Request, Response } from 'express';
import {
  DATABASE_DATABASE_SPY,
  DATABASE_COLLECTION_SPY_PRODUCTS,
} from '../../../configs/configs';

export default async function findDuplicatedProducts(req: Request, res: Response) {

  console.log("find duplicated products!")

  try {

    const DBCLIENT = global['DBCLIENT']

    const db = await DBCLIENT.db(DATABASE_DATABASE_SPY)
    const productsCol = await db.collection(DATABASE_COLLECTION_SPY_PRODUCTS)


    const duplicateProducts = productsCol.aggregate([
      { $sortByCount: '$storeLink' }
    ])

    return {duplicateProducts}

  } catch (e) {
    return {error: e.message}
  }
}
