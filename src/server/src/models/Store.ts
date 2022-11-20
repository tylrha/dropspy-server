import mongoose, { Schema, Document } from 'mongoose'
import { LOGGER, DATABASE_COLLECTION_SPY_STORES, CURRENT_DATETIME } from '../../configs/configs'

/* -------------------------------------------------------------------------- */


interface IStoreMongo extends Document{
  storeName: string,
  storeLink: string,
  storeLogoLink: string,
  storeCategory: string,
  storeCountry: string,
  isSpying: boolean,
  storeError: string,
  initialDate: string,
  lastSale: string,
  lastSaleIso: string,
  totalSales: number,
  totalRevenue: number,
  totalDates: number,
  totalProducts: number
}

type IStore = Omit<IStoreMongo, '_id' | '__v'>
type IStoreUnion = IStore | IStoreMongo

const storeSchema: Schema = new Schema(
  {
    storeName: String,
    storeLink: String,
    storeLogoLink: String,
    storeCategory: String,
    storeCountry: String,
    isSpying: Boolean,
    storeError: String,
    initialDate: String,
    lastSale: String,
    lastSaleIso: String,
    totalSales: Number,
    totalRevenue: Number,
    totalDates: Number,
    totalProducts: Number
  },
  {
    versionKey: false
  }
)

const Store = mongoose.model<IStoreMongo>(DATABASE_COLLECTION_SPY_STORES, storeSchema)

/* -------------------------------------------------------------------------- */


function generateNewStore(storeObj: any): IStoreMongo {

  LOGGER(`Gerando objeto de loja [${storeObj.storeName}]`, {from: "DTBASE", pid: true})

  const tmpStoreObj = {
    storeName: storeObj.storeName,
    storeLink: storeObj.storeLink,
    storeLogoLink: storeObj.storeLogoLink,
    storeCategory: storeObj.storeCategory,
    storeCountry: storeObj.storeCountry,
    isSpying: false,
    storeError: storeObj.storeError,
    initialDate: CURRENT_DATETIME('date'),
    lastSale: "#",
    lastSaleIso: "#",
    totalSales: 0,
    totalRevenue: 0,
    totalDates: 0,
    totalProducts: 0
  }

  return new Store(tmpStoreObj)
}


async function getStoreFromDatabase(storeQuery: any): Promise<IStoreMongo>{

  LOGGER(`Obtendo loja`, {from: "DTBASE", pid: true})

  try{
    return await Store.findOne(storeQuery)
  } catch(e) {
    LOGGER(`ERRO: ${e.message}`, {from: "DTBASE", pid: true})
    return null
  }

}

async function getStoresFromDatabase(storesQuery: any, limit?: number, skip?: number): Promise<IStoreMongo[]>{

  LOGGER(`Obtendo lojas`, {from: "DTBASE", pid: true})

  try{
    if (limit && !skip){
      return await Store.find(storesQuery).limit(limit)
    } else if (limit && skip){
      return await Store.find(storesQuery).limit(limit).skip(skip)
    } else {
      return await Store.find(storesQuery)
    }
  } catch(e) {
    LOGGER(`ERRO: ${e.message}`, {from: "DTBASE", pid: true})
    return null
  }

}

/* -------------------------------------------------------------------------- */

export {
  IStoreMongo,
  IStore,
  IStoreUnion,
  storeSchema,
  Store,

  generateNewStore,
  getStoreFromDatabase,
  getStoresFromDatabase
}
