import { Request, Response } from 'express'
import { generateNewCategory, getCategoryFromDatabase } from '../../../models/Category'

export default async function addCategoryController(request: Request, response: Response) {

  try{

    const {name} = request.query
    if (!name){throw new Error(`Category must be set!`)}

    const oldCategoryObj = await getCategoryFromDatabase(name.toString())
    if (oldCategoryObj !== null){throw new Error(`A categoria [${name}] já foi adicionada anteriormente, remova-a!`)}

    let newCategory = generateNewCategory(name.toString())
    const savedCategoryResult = await newCategory.save()

    response.json(savedCategoryResult)

  }catch(e){

    response.json({ error: e.message })

  }
}
