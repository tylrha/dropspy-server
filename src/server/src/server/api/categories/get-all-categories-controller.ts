import { Request, Response } from 'express'
import { getCategoriesFromDatabase } from '../../../models/Category'

export default async function getAllCategoriesController(request: Request, response: Response) {

  try {
    return response.json(await getCategoriesFromDatabase({}))
  } catch (e) {
    return response.json({ error: e.message })
  }

}
