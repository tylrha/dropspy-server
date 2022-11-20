import { Request, Response } from 'express'
import checkQueriesErros from '../../components/query-validation'
import { getLabelFromDatabase } from '../../../models/Label'

export default async function editLabelController(request: Request, response: Response) {

  try {

    const { label, type, compare, synonyms } = request.query
    if (checkQueriesErros({ label, type, compare, synonyms }, response) === true) { return }

    let labelObj = await getLabelFromDatabase(label.toString())
    if (labelObj === null) { throw new Error(`A etiqueta ${label} não foi encontrada!`) }

    const finalSynonyms = synonyms.toString().split(',')

    labelObj.type = type.toString()
    labelObj.compare = compare.toString()
    labelObj.synonyms = finalSynonyms
    const savedLabelObj = await labelObj.save()

    response.json(savedLabelObj)

  } catch (e) {
    response.json({ error: e.message })
  }

}
