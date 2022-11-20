import { Request, Response } from 'express'
import {
  IMPORT_MODULE,
  DATABASE_DATABASE_SPY,
  DATABASE_COLLECTION_SPY_PRODUCTS
} from '../../../configs/configs'

export default async function deleteAllLabelsInAllProductsController(request: Request, response: Response) {

  const DBCLIENT = global['DBCLIENT']

  const { skip, limit } = request.query

  console.log("DELETE ALL LABELS IN ALL PRODUCTS!")

  const db = await DBCLIENT.db(DATABASE_DATABASE_SPY)
  const col = await db.collection(DATABASE_COLLECTION_SPY_PRODUCTS)

  const queryObj = {}
  let findObj;

  if (limit && !skip){
    findObj = await col.find(queryObj).limit(Number(limit)).toArray()
  } else if (limit && skip){
    findObj = await col.find(queryObj).skip(Number(skip)).limit(Number(limit)).toArray()
  } else {
    findObj = await col.find(queryObj).toArray()
  }

  await deleteLabelInProducts(col, findObj)

  if (findObj) {
    response.json(findObj)
  } else {
    response.json({ error: "coundt find labeled products" })
  }

}

async function deleteLabelInProducts(col, findObj){

  for(let x = 0; x < findObj.length; x++){

    const newObj = {
      ...findObj[x],
      totalLabels: 0,
      labels: []
    }

    await col.updateOne({_id: findObj[x]._id}, { '$set': newObj });
    console.log(x + " - " + findObj[x].productName + " | " + findObj[x].totalLabels + " -> " + newObj.totalLabels)
  }

}
