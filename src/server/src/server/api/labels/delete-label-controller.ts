import { Request, Response } from 'express'

import checkQueriesErros from '../../components/query-validation'
import { Label } from '../../../models/Label'

export default async function deleteLabelController(request: Request, response: Response) {

  try{
    const label = request.query.label as string

    if (checkQueriesErros({ label}, response) === true) { return }

    const labelObj = await Label.find({name: label})
    if (labelObj === null){throw new Error(`A etiqueta ${label} não foi encontrada!`)}

    const deletedLabelObj = await Label.deleteOne({name: label})
    response.json(deletedLabelObj)

  } catch(e){
    response.json({ error: e.message })
  }

}
