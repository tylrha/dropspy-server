import {
  DATABASE_DATABASE_SPY,
  DATABASE_LOGIN_URL,
  LOGGER,
  NODE_ENV,
} from '../configs/configs'

import mongoose from 'mongoose'

import connectDatabase from './connectDatabase'
import scheduleFunctions from './scheduled/scheduleFunctions'
import initServer from './server/init_server';

(async () => {

  LOGGER(`Executando MASTER em ambiente [${NODE_ENV}]`, { from: 'MASTER', pid: true })
  scheduleFunctions()

  global.DBCLIENT = await connectDatabase()
  await mongoose.connect(`${DATABASE_LOGIN_URL}/${DATABASE_DATABASE_SPY}`)

  global.SERVER = initServer()

})()
