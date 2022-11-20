import { Request, Response } from 'express'
import {getBotsFromDatabase} from '../../../models/Bot'

export default async function getAllBotsController(request: Request, response: Response) {

  try{
    const allBots = await getBotsFromDatabase({})
    response.json(allBots)
  } catch(e){
    response.json({error: e.message})
  }

}
