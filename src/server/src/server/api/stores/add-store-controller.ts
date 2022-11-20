import { Request, Response } from 'express'
import { generateNewStore, getStoreFromDatabase } from '../../../models/Store'
import { getUserInDatabase } from '../../../models/User'
import getShopifyLogoLink from '../../utils/get-shopify-store-logo-link'

export default async function addStoreController(req: Request, res: Response) {

  try {

    const { userId, storeName, storeLink, storeCategory, storeCountry, storeError } = req.body
    if (Object.keys(req.body).length !== 6) { throw new Error("Body params were not found!") }

    const finalStoreName = storeName.toString().toLowerCase()
    const finalStoreLink = storeLink.slice(-1) === '/' ? storeLink : `${storeLink}/`

    let user = await getUserInDatabase({ _id: userId })
    if (user === null) { throw new Error("Usuário não encontrado!") }

    const storeIndex = user.registeredStores.findIndex(store => store.storeLink === finalStoreLink)
    if (storeIndex > -1) { throw new Error(`Loja [${finalStoreLink}] já foi adicionada anteriormente!`) }

    user.registeredStores.push({
      storeLink: finalStoreLink,
      isSpying: false,
      totalDates: 0,
      spyDates: []
    })

    await user.save()

    let finalStoreObj = {}
    const isStoreInDatabase = await (getStoreFromDatabase({ storeLink: finalStoreLink }))
    if (isStoreInDatabase !== null) {
      finalStoreObj = isStoreInDatabase

      if (user.userRole !== "admin"){
        finalStoreObj = {
          ...finalStoreObj['_doc'],
          totalDates: 0,
          totalSales: 0,
          totalRevenue: 0,
          totalProducts: 0
        }
      }

      console.log(`A loja [${finalStoreLink}] já está cadastrada no banco de dados!`)
    } else {
      const storeLogoLink = await getShopifyLogoLink(finalStoreLink)

      let tmpStore = {
        storeName: finalStoreName,
        storeLink: finalStoreLink,
        storeLogoLink,
        storeCategory,
        storeError,
        storeCountry,
      }

      finalStoreObj = await generateNewStore(tmpStore).save()
      console.log(`A loja [${finalStoreLink}] foi cadastrada no banco de dados!`)
    }

    return res.json(finalStoreObj);

  } catch (e) {
    return res.json({ error: e.message })
  }

}
