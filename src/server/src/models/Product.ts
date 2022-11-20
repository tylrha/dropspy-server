import mongoose, { Schema, Document } from 'mongoose'
import { DATABASE_COLLECTION_SPY_PRODUCTS, LOGGER } from '../../configs/configs'

/* -------------------------------------------------------------------------- */

interface IProductLabel {
  name: string,
  type: string
}

const productLabelSchema: Schema = new Schema(
  {
    name: String,
    type: String
  },
  {
    versionKey: false,
    _id: false
  }
)

/* -------------------------------------------------------------------------- */

interface IProductMongo extends Document{
  productName: string,
  productLink: string,
  productImage: string,
  productPrice: number,
  storeName: string,
  storeLink: string,
  initialDate: string,
  lastSale: string,
  lastSaleIso: string,
  totalSales: number,
  totalRevenue: number,
  totalDates: number,
  totalLabels: number,
  labels: IProductLabel[]
}

type IProduct = Omit<IProductMongo, '_id' | '__v'>
type IProductUnion = IProduct | IProductMongo

const productSchema: Schema = new Schema(
  {
    productName: String,
    productLink: String,
    productImage: String,
    productPrice: Number,
    storeName: String,
    storeLink: String,
    initialDate: String,
    lastSale: String,
    lastSaleIso: String,
    totalSales: Number,
    totalRevenue: Number,
    totalDates: Number,
    totalLabels: Number,
    labels: [productLabelSchema]
  },
  {
    versionKey: false
  }
)

const Product = mongoose.model<IProductMongo>(DATABASE_COLLECTION_SPY_PRODUCTS, productSchema)

/* -------------------------------------------------------------------------- */

async function getProductsFromDatabase(productsQuery: any, limit?: number, skip?: number): Promise<IProductMongo[]>{

  LOGGER(`Obtendo produtos`, {from: "DTBASE", pid: true})

  try{
    if (limit && !skip){
      return await Product.find(productsQuery).limit(limit)
    } else if (limit && skip){
      return await Product.find(productsQuery).limit(limit).skip(skip)
    } else {
      return await Product.find(productsQuery)
    }
  } catch(e){
    LOGGER(`ERRO: ${e.message}`, {from: "DTBASE", pid: true})
    return null
  }
}

/* -------------------------------------------------------------------------- */

export {
  IProductMongo,
  IProduct,
  IProductUnion,
  productSchema,
  Product,

  getProductsFromDatabase
}
