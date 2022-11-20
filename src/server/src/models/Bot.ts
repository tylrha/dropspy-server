import mongoose, { Schema, Document } from 'mongoose'
import { LOGGER, DATABASE_COLLECTION_BOTS } from '../../configs/configs'

/* -------------------------------------------------------------------------- */

interface IBotMongo extends Document {
  botNumber: string,
  status: string,
  version: string,
  loopInterval: number,
  lastSetupDateTime: string,
  lastCheckDateTime: string,
  lastSaleDateTime: string
  totalStores: number,
  spyedStores: string[]
}

type IBot = Omit<IBotMongo, '_id' | '__v'>
type IBotUnion = IBot | IBotMongo

const botSchema: Schema = new Schema(
  {
    botNumber: String,
    status: String,
    version: String,
    loopInterval: Number,
    lastSetupDateTime: String,
    lastCheckDateTime: String,
    lastSaleDateTime: String,
    totalStores: Number,
    spyedStores: [String]
  },
  {
    versionKey: false
  }
)

const Bot = mongoose.model<IBotMongo>(DATABASE_COLLECTION_BOTS, botSchema)

/* -------------------------------------------------------------------------- */

function generateNewBot(botNumber: string): IBotMongo{

  LOGGER(`Gerando objeto de bot [${botNumber}]`, {from: "DTBASE", pid: true})

  const temBotObj = {
    botNumber: botNumber,
    status: 'inactive',
    version: "#",
    loopInterval: 0,
    lastSetupDateTime: "#",
    lastCheckDateTime: "#",
    lastSaleDateTime: "#",
    totalStores: 0,
    spyedStores: []
  }

  return new Bot(temBotObj)

}

async function getBotsFromDatabase(userQuery: any): Promise<IBotMongo[]>{

  LOGGER(`Obtendo bots`, {from: "DTBASE", pid: true})

  try{
    const botObject = await Bot.find(userQuery)
    return botObject
  } catch(e){
    LOGGER(`ERRO: ${e.message}`, {from: "DTBASE", pid: true})
    return null
  }
}

export {
  IBotMongo,
  IBot,
  IBotUnion,
  botSchema,
  Bot,

  generateNewBot,
  getBotsFromDatabase
}
