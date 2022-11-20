import { Request, Response } from 'express'
import {getUsersFromDatabase} from '../../../models/User'

export default async function getAllUsersController(request: Request, response: Response) {

  try{
    const allUsers = await getUsersFromDatabase({})
    response.json(allUsers)
  } catch(e){
    response.json({error: e.message})
  }

}
