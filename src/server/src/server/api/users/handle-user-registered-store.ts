import { Request, Response } from 'express'
import { CURRENT_DATETIME } from '../../../../configs/configs'
import { getUserInDatabase } from '../../../models/User'

export default async function handleUserRegisteredStores(req: Request, res: Response) {

  try{

    const { store_link, user_id, mode } = req.query
    if (Object.keys(req.query).length !== 3){throw new Error("query params were not found!")}

    let userObj = await getUserInDatabase({_id: user_id})
    if (userObj === null) {throw new Error("Usuário não encontrado")}

    const storeIndex = userObj.registeredStores.findIndex(store => store.storeLink === store_link.toString())
    if (storeIndex === -1) {throw new Error("Loja não foi encontrada")}

    const alreadySpyedStores = userObj.registeredStores.filter(store => store.isSpying === true).length
    const userAllowedStores = userObj.allowedStores
    if (userObj.userRole !== "admin" && mode === 'true' && userAllowedStores === alreadySpyedStores){throw new Error("Limite de lojas espionadas foi atingido!")}

    console.log(`Adicionando: ${CURRENT_DATETIME('date')}`)

    if (mode === 'true'){
      const todayDate = CURRENT_DATETIME('date')
      if (!userObj.registeredStores[storeIndex].spyDates.includes(todayDate)){
        userObj.registeredStores[storeIndex].spyDates.push(todayDate)
        userObj.registeredStores[storeIndex].totalDates = userObj.registeredStores[storeIndex].spyDates.length
      }

      userObj.registeredStores[storeIndex].isSpying = true
    } else if (mode === 'false'){
      userObj.registeredStores[storeIndex].isSpying = false
    } else {
      throw new Error("mode not found!")
    }

    await userObj.save()

    return res.json(userObj)

  }catch(e){

    return res.json({error: e.message})

  }
}
