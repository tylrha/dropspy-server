import { Request, Response } from 'express'
import { getLabelsFromDatabase } from '../../../models/Label'

export default async function getAllLabelsController(request: Request, response: Response) {

  try {
    const labelObj = await getLabelsFromDatabase({})
    response.json(labelObj)
  } catch (e) {
    response.json({ error: e.message })
  }

}
