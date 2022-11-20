import { Request, Response } from 'express'

import checkQueriesErros from '../../components/query-validation'
import { getLabelFromDatabase } from '../../../models/Label'

export default async function getLabelController(request: Request, response: Response) {

  try {
    const { label } = request.query
    if (checkQueriesErros({ label }, response) === true) { return }

    const labelObj = await getLabelFromDatabase(label.toString())
    if (labelObj === null) { throw new Error("Label was not found") }

    response.json(labelObj)

  } catch (e) {

    response.json({ error: e.message })
  }


}
