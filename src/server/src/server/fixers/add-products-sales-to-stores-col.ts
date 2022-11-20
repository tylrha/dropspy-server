import { Request, Response } from 'express';
import {
  DATABASE_DATABASE_SPY,
  DATABASE_COLLECTION_LABELS,
  DATABASE_COLLECTION_SPY_PRODUCTS,
  DATABASE_COLLECTION_SPY_STORES
} from '../../../configs/configs';
import { getIsoDateFromString } from '../../../utils/libraries/dates';

export default async function addProductsSalesToStoresCol(req: Request, res: Response) {

  console.log("add stores sales to store-dates sales")

  try {

    const DBCLIENT = global['DBCLIENT']

    const db = await DBCLIENT.db(DATABASE_DATABASE_SPY)
    const productsCol = await db.collection(DATABASE_COLLECTION_SPY_PRODUCTS)
    const storesCol = await db.collection("stores-by-date")

    const uniqueStores = await productsCol.distinct("storeLink")

    let finalResult = []

    for(let x = 0; x < uniqueStores.length; x++){
      const curStore = uniqueStores[x]
      const curStoreProducts = await productsCol.find({storeLink: curStore}).toArray()
      finalResult.push(...await saveStoresSalesByDate(curStore, curStoreProducts))

      console.log(`${x + 1}/${uniqueStores.length} - Calculeted ${curStore}`)
    }

    for(let y = 0; y < finalResult.length; y++){
      const queryObj = {storeLink: finalResult[y].storeLink, date: finalResult[y].date}
      const storeDateObjInDatabase = await storesCol.find(queryObj).toArray()
      let mode = ""
      if (storeDateObjInDatabase.length === 0){
        await storesCol.insertOne(finalResult[y]);
        mode = "added                          "
      } else if (storeDateObjInDatabase[0].totalRevenue === finalResult[y].totalRevenue) {
        await storesCol.updateOne(queryObj, { '$set': finalResult[y] });
        mode = "updated                        "
      } else {
        mode = "skiped because has same revenue"
      }

      console.log(y + "/" + finalResult.length + " - " + finalResult[y].date + " - " + mode + " - " + finalResult[y].storeLink)
    }

    return {finalResult}

  } catch (e) {
    return {error: e.message}
  }
}

async function saveStoresSalesByDate(storeLink, storeProducts){

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
          productName: curProduct.productName,
          productLink: curProduct.productLink,
          sales: 0,
          revenue: 0,
        })

        storeDatesDateProductIndex = storeDatesArr[storeDatesDateIndex].products.length - 1
      }

      storeDatesArr[storeDatesDateIndex].totalProducts = storeDatesArr[storeDatesDateIndex].products.length
      storeDatesArr[storeDatesDateIndex].totalSales += curDate.sales
      storeDatesArr[storeDatesDateIndex].totalRevenue = Number((storeDatesArr[storeDatesDateIndex].totalRevenue + curDate.revenue).toFixed(2))
      storeDatesArr[storeDatesDateIndex].products[storeDatesDateProductIndex].sales += curDate.sales
      storeDatesArr[storeDatesDateIndex].products[storeDatesDateProductIndex].revenue = Number((storeDatesArr[storeDatesDateIndex].products[storeDatesDateProductIndex].revenue + curDate.revenue).toFixed(2))

    }
  }

  return storeDatesArr

}
