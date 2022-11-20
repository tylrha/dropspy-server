import mongoose, { Schema, Document } from 'mongoose'
import { DATABASE_COLLECTION_USERS, LOGGER, CURRENT_DATETIME } from '../../configs/configs'
import { hash } from "bcryptjs"

/* -------------------------------------------------------------------------- */

interface IRegisteredStore {
  storeLink: string,
  isSpying: boolean,
  totalDates: number,
  spyDates: string[]
}

const registeredStoreSchema: Schema = new Schema(
  {
    storeLink: String,
    isSpying: Boolean,
    totalDates: Number,
    spyDates: [String]
  },
  {
    versionKey: false,
    _id: false
  }
)

/* -------------------------------------------------------------------------- */

interface IFavoriteStore {
  storeLink: string,
}

const favoriteStoreSchema: Schema = new Schema(
  {
    storeLink: String,
  },
  {
    versionKey: false,
    _id: false
  }
)

/* -------------------------------------------------------------------------- */

interface IFavoriteProduct {
  productLink: string,
}

const favoriteProductSchema: Schema = new Schema(
  {
    productLink: String,
  },
  {
    versionKey: false,
    _id: false
  }
)

/* -------------------------------------------------------------------------- */

interface IUserMongo extends Document{
  name: string,
  email: string,
  password: string,
  userRole: 'admin' | 'user',
  accountCreatedAt: string,
  lastActiveTime: string,
  lastPaidDate: string,
  allowedStores: number,
  registeredStores: IRegisteredStore[],
  favoriteStores: IFavoriteStore[],
  favoriteProducts: IFavoriteProduct[],
}

type IUser = Omit<IUserMongo, '_id' | '__v'>
type IUserUnion = IUser | IUserMongo

const userSchema: Schema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    userRole: String,
    accountCreatedAt: String,
    lastActiveTime: String,
    lastPaidDate: String,
    allowedStores: Number,
    registeredStores: [registeredStoreSchema],
    favoriteStores: [favoriteStoreSchema],
    favoriteProducts: [favoriteProductSchema],
  },
  {
    versionKey: false
  }
)

const User = mongoose.model<IUserMongo>(DATABASE_COLLECTION_USERS, userSchema)

/* -------------------------------------------------------------------------- */

async function generateNewUser(name: string, email: string, password: string): Promise<IUserMongo>{

  LOGGER(`Gerando objeto de usuário [${password}]`, {from: "DTBASE", pid: true})

  const hash_password = await hash(password, 8)

  const addNewUser = {
    name,
    email,
    password: hash_password,
    userRole: 'user',
    accountCreatedAt: CURRENT_DATETIME('date'),
    lastActiveTime: CURRENT_DATETIME(),
    lastPaidDate: "",
    allowedStores: 0,
    registeredStores: [],
    favoriteStores: [],
    favoriteProducts: []
  }

  return new User(addNewUser)
}

async function getUserInDatabase(userQuery: any): Promise<IUserMongo>{

  LOGGER(`Obtendo informação do usuário: [${JSON.stringify(userQuery)}]`, {from: "DTBASE", pid: true})

  try{
    const userObject = await User.findOne(userQuery)
    return userObject
  } catch(e){
    LOGGER(`ERRO: ${e.message}`, {from: "DTBASE", pid: true})
    return null
  }
}

async function getUsersFromDatabase(userQuery: any): Promise<IUserMongo[]>{

  LOGGER(`Obtendo usuários`, {from: "DTBASE", pid: true})

  try{
    const userObject = await User.find(userQuery)
    return userObject
  } catch(e){
    LOGGER(`ERRO: ${e.message}`, {from: "DTBASE", pid: true})
    return null
  }
}

/* -------------------------------------------------------------------------- */

export {
  IRegisteredStore,
  registeredStoreSchema,

  IFavoriteStore,
  favoriteStoreSchema,

  IFavoriteProduct,
  favoriteProductSchema,

  IUserMongo,
  IUser,
  IUserUnion,
  userSchema,
  User,

  generateNewUser,
  getUserInDatabase,
  getUsersFromDatabase

}
