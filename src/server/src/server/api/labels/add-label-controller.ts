import { Request, Response } from 'express'

import checkQueriesErros from '../../components/query-validation'
import { generateNewLabel, getLabelFromDatabase, getLabelsFromDatabase } from '../../../models/Label'

export default async function addLabelController(request: Request, response: Response) {

  try {

    const label = request.query.label as string
    const type = request.query.type as string
    const compare = request.query.compare as string
    const synonyms = request.query.synonyms as string[]

    if (checkQueriesErros({ label, type, synonyms, compare }, response) === true) { return }

    const labelObj = await getLabelFromDatabase(label.toString())
    if (labelObj !== null){throw new Error(`A etiqueta [${label}] já foi adicionada anteriormente, remova-a!`)}

    const allLabelsDocs = await getLabelsFromDatabase({})
    const allLabels = allLabelsDocs.map(label => label.name)
    const allSynonyms = [].concat.apply([], [...allLabelsDocs.map(label => label.synonyms)])

    const labelAdded = allLabels.findIndex(item => item === label) > -1
    if (labelAdded) { throw new Error(`A etiqueta [${label}] já foi adicionada anteriormente, remova-a!`) }

    const synonymAdded = allSynonyms.findIndex(item => item === label) > -1
    if (synonymAdded) { throw new Error(`A etiqueta [${label}] já foi adicionada anteriormente como sinônimo, remova-a!`) }

    const finalSynonyms = synonyms.toString().split(',')
    finalSynonyms.forEach(synonym => {
      const synonymAdd = allLabels.findIndex(item => item === synonym) > -1 || allSynonyms.findIndex(item => item === synonym) > -1
      if (synonymAdd) { throw new Error(`O sinônimo [${synonym}] já foi adicionada anteriormente, remova-o!`) }
    })

    let newLabelObject = generateNewLabel({
      name: label,
      type,
      compare,
      synonyms: finalSynonyms
    })

    const savedLabelObject = await newLabelObject.save()
    response.json(savedLabelObject)

  } catch (e) {
    response.json({ error: e.message })

  }
}
