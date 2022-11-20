import { Request, Response } from 'express'
import {
  IMPORT_MODULE,
  DATABASE_DATABASE_SPY,
  DATABASE_COLLECTION_SPY_PRODUCTS
} from '../../../configs/configs'
import checkQueriesErros from '../components/query-validation'

export default async function deleteLabelInProductController(request: Request, response: Response) {

  const DBCLIENT = global['DBCLIENT']

  const { label, productLink } = request.query

  if (checkQueriesErros({ label, productLink }, response) === true) { return }

  const db = await DBCLIENT.db(DATABASE_DATABASE_SPY)
  const col = await db.collection(DATABASE_COLLECTION_SPY_PRODUCTS)

  const findObj = await col.find({productLink: productLink, labels: { $elemMatch: {name: label}}}).toArray()

  await deleteLabelInProducts(col, findObj, label)

  if (findObj) {
    response.json(findObj)
  } else {
    response.json({ error: "coundt find labeled products" })
  }

}

async function deleteLabelInProducts(col, findObj, label){

  for(let x = 0; x < findObj.length; x++){

    const newLabelArr = findObj[x].labels.filter(curLabel => curLabel.name !== label)
    const newObj = {
      ...findObj[x],
      labels: newLabelArr,
      totalLabels: newLabelArr.length
    }
    await col.updateOne({_id: findObj[x]._id}, { '$set': newObj });
    console.log(findObj[x].productName + " | " + findObj[x].totalLabels + " -> " + newObj.totalLabels)
  }

}
