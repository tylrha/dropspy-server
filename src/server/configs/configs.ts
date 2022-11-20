import { join, basename, dirname } from 'path'
import APP_CONFIGS from './app-configs.json'

import LOGGER from '../utils/logger/logger'
import { delay as DELAY } from '../utils/libraries/utils'
import { importFromRootPath as IMPORT_MODULE, getPathFromRoot as ROOT_PATH } from '../utils/libraries/globalPath'

import {
  addTimeToDateObject,
  converteDateToUTC,
  getDateInfoObjFromIsoDate,
  convertDateInfoObjToStringDate
} from '../utils/libraries/dates'

import dotenv from 'dotenv'
dotenv.config()

const NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV : "development"
const DROPSPY_FOLDER = NODE_ENV === "production" ? join(__dirname, '..', 'dropspy') : ""

const VERSION = process.env.npm_package_version || "#"
const SERVER_PORT = (process.env.PORT || APP_CONFIGS['server_configs'].default_port)?.toString().trim()
const SERVER_BASE = process.env.BASE_URL

let CURRENT_DATE = (): Date => {
  if (NODE_ENV === "production") {
    const _heroku_difference_time_hours = -3
    return addTimeToDateObject(new Date(), _heroku_difference_time_hours)
  } else {
    return new Date()
  }
}

const CURRENT_DATETIME = (option?: 'date' | 'time') => {

  const utcDate = converteDateToUTC(CURRENT_DATE())
  const isoDate = utcDate.toISOString()
  const dateInfoObj = getDateInfoObjFromIsoDate(isoDate)

  return convertDateInfoObjToStringDate(dateInfoObj, option)
}

/* DATABASE ================================================================= */

const {
  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_BASEURL,
} = process.env

const DATABASE_LOGIN_URL = `mongodb+srv://${DATABASE_USERNAME}:${DATABASE_PASSWORD}@${DATABASE_BASEURL}`

const DATABASE_DATABASE_SPY = APP_CONFIGS['database_configs'].database_spy
const DATABASE_COLLECTION_USERS = APP_CONFIGS['database_configs'].collection_users
const DATABASE_COLLECTION_BOTS = APP_CONFIGS['database_configs'].collection_bots
const DATABASE_COLLECTION_SPY_PRODUCTS = APP_CONFIGS['database_configs'].collection_products
const DATABASE_COLLECTION_SPY_STORES = APP_CONFIGS['database_configs'].collection_stores
const DATABASE_COLLECTION_STORES_BY_DATES = APP_CONFIGS['database_configs'].collection_stores_by_dates
const DATABASE_COLLECTION_SPY_DATES = APP_CONFIGS['database_configs'].collection_dates
const DATABASE_COLLECTION_LABELS = APP_CONFIGS['database_configs'].collection_labels
const DATABASE_COLLECTION_CATEGORIES = APP_CONFIGS['database_configs'].collection_categories

export {
  APP_CONFIGS,
  NODE_ENV,
  DROPSPY_FOLDER,
  VERSION,
  SERVER_PORT,
  SERVER_BASE,
  CURRENT_DATETIME,
  CURRENT_DATE,
  IMPORT_MODULE,
  ROOT_PATH,
  DELAY,
  LOGGER,

  DATABASE_USERNAME,
  DATABASE_PASSWORD,
  DATABASE_BASEURL,
  DATABASE_LOGIN_URL,

  DATABASE_DATABASE_SPY,
  DATABASE_COLLECTION_USERS,
  DATABASE_COLLECTION_BOTS,
  DATABASE_COLLECTION_SPY_PRODUCTS,
  DATABASE_COLLECTION_SPY_STORES,
  DATABASE_COLLECTION_STORES_BY_DATES,
  DATABASE_COLLECTION_SPY_DATES,
  DATABASE_COLLECTION_LABELS,
  DATABASE_COLLECTION_CATEGORIES,
}
