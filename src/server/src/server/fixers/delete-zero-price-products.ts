import { Request, Response } from 'express';
import {
  DATABASE_DATABASE_SPY,
  DATABASE_COLLECTION_LABELS,
  DATABASE_COLLECTION_SPY_PRODUCTS,
  DATABASE_COLLECTION_SPY_STORES
} from '../../../configs/configs';
import { getIsoDateFromString } from '../../../utils/libraries/dates';

export default async function deleteZeroPriceProducts(req: Request, res: Response) {

  console.log("delete zero price products!")

  try {

    const DBCLIENT = global['DBCLIENT']

    const db = await DBCLIENT.db(DATABASE_DATABASE_SPY)
    const productsCol = await db.collection(DATABASE_COLLECTION_SPY_PRODUCTS)
    const zeroPriceDocs = await productsCol.find({totalRevenue: 0}).toArray()

    console.log(zeroPriceDocs)

    for(let x = 0; x < zeroPriceDocs.length; x++){
      console.log(x)
      await productsCol.deleteOne({_id: zeroPriceDocs[x]._id});
    }

    return {zeroPriceDocs}

  } catch (e) {
    return {error: e.message}
  }
}
