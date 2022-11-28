import mongoose, { Schema, Document } from 'mongoose'
import { DATABASE_COLLECTION_STORES_BY_DATES, LOGGER } from '../../configs/configs'

/* -------------------------------------------------------------------------- */

interface IStoreDateProduct {
  productName: string,
  productLink: string,
  sales: number,
  revenue: number
}

const storeDateProductSchema: Schema = new Schema(
  {
    productName: String,
    productLink: String,
    sales: Number,
    revenue: Number
  },
  {
    versionKey: false,
    _id: false
  }
)

/* -------------------------------------------------------------------------- */

interface IStoreDateMongo extends Document{
  storeLink: string,
  date: string,
  isoDate: string,
  totalSales: number,
  totalRevenue: number,
  totalProducts: number,
  products: []
}

type IStoreDate = Omit<IStoreDateMongo, '_id' | '__v'>
type IStoreDateUnion = IStoreDate | IStoreDateMongo

const storeDateSchema: Schema = new Schema(
  {
    storeLink: String,
    date: String,
    isoDate: String,
    totalSales: Number,
    totalRevenue: Number,
    totalProducts: Number,
    products: []
  },
  {
    versionKey: false,
  }
)
const StoreDate = mongoose.model<IStoreDateMongo>(DATABASE_COLLECTION_STORES_BY_DATES, storeDateSchema, DATABASE_COLLECTION_STORES_BY_DATES)

/* -------------------------------------------------------------------------- */

async function getProductStoreDatesDocs(productLink: string){
  return await StoreDate.find({products: { $elemMatch: {productLink: productLink}}})
}

async function getUniqueStoresFromStoreDates(){
  return await StoreDate.find().distinct('storeLink')
}

async function getUniqueDatesFromStoreDates(){
  return await StoreDate.find().distinct('date')
}

async function getStoreDatesFromDatabase(storeDatesQuery: any): Promise<IStoreDateMongo[]>{

  try{
    LOGGER(`Obtendo loja-datas`, {from: "DTBASE", pid: true})
    return await StoreDate.find(storeDatesQuery)
  } catch(e){
    LOGGER(`ERRO: ${e.message}`, {from: "DTBASE", pid: true})
    return null
  }

}

/* -------------------------------------------------------------------------- */

export {
  IStoreDateProduct,
  storeDateProductSchema,

  IStoreDateMongo,
  IStoreDate,
  IStoreDateUnion,
  storeDateSchema,
  StoreDate,

  getProductStoreDatesDocs,
  getUniqueStoresFromStoreDates,
  getUniqueDatesFromStoreDates,
  getStoreDatesFromDatabase

}

