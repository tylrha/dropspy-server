import { Request, Response } from 'express'
import { getStoreFromDatabase } from '../../../models/Store'

export default async function editStoreController(request: Request, response: Response) {

  console.log(request.body)

  const { storeLink, storeLogoLink, storeCategory, storeCountry, storeError } = request.body

  if (Object.keys(request.body).length !== 5) { throw new Error("Body params were not found!") }

  try{

    let curStore = await getStoreFromDatabase({storeLink: storeLink})
    if (curStore === null){throw new Error(`A loja ${storeLink} não foi encontrada!`)}

    curStore.storeLogoLink = storeLogoLink.toString()
    curStore.storeCategory = storeCategory.toString()
    curStore.storeCountry = storeCountry.toString(),
    curStore.storeError = storeError.toString()

    await curStore.save()

    response.json(curStore)

    console.log("LOJA EDITADA COM SUCESSO!")

  } catch(e){

    response.json({ error: e.message })
  }


}
