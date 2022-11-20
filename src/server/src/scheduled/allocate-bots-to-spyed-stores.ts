import { LOGGER } from "../../configs/configs"
import { getBotsFromDatabase } from "../models/Bot"
import { getStoreFromDatabase } from "../models/Store"
import { getUsersFromDatabase } from "../models/User"

export default async function allocateBotsToSpyedStores(){

  LOGGER(`Atualizando alocação de bots para lojas espionadas`, {from: 'SCHEDU', pid: true})
  const allBots = await getBotsFromDatabase({})
  const allUsers = await getUsersFromDatabase({})
  const allRegisteredStores = [].concat.apply([], [...allUsers.map(user => user.registeredStores)])
  const uniqueRegisteredStores = [...new Set(allRegisteredStores.map(item => item.storeLink))]
  const allSpyedStores = allRegisteredStores.filter(store => store.isSpying === true)
  const uniqueSpyedStores = [...new Set(allSpyedStores.map(item => item.storeLink))]

  // console.log(`ALL BOTS: ${allBots.length}`)
  // console.log(`Users = ${allUsers.length}`)
  // console.log(`All stores = ${allRegisteredStores.length}`)
  // console.log(`Unique stores = ${uniqueRegisteredStores.length}`)
  // console.log(`ALL Spyed stores = ${allSpyedStores.length}`)
  // console.log(`Unique spyed stores = ${uniqueSpyedStores.length}`)
  // console.log(uniqueSpyedStores)

  // remove non-spyed stores from bots =========================================
  let updatedBots = []
  let removedStores = []
  for(let x = 0; x < allBots.length; x++){

    let curBot = allBots[x]
    const oldSpyedStores = [...curBot.spyedStores]
    const filteredStores = curBot.spyedStores.filter(store => {
      const storeIndex = uniqueSpyedStores.indexOf(store)
      if (storeIndex === -1){
        LOGGER(`Loja ${store} foi removida da espionagem do bot ${curBot.botNumber}!`, {from: 'SCHEDU', pid: true})
        removedStores.push(store)
      }
      return storeIndex > -1
    })

    curBot.spyedStores = filteredStores
    curBot.totalStores = curBot.spyedStores.length

    if (curBot.status !== "inactive" && curBot.totalStores === 0){
      curBot.status = "inactive"
      await curBot.save()
    }

    if (oldSpyedStores.length !== filteredStores.length){
      await curBot.save()
    }

    updatedBots.push(curBot)
  }

  for(let y = 0; y < removedStores.length; y++){
    let curStore = await getStoreFromDatabase({storeLink: removedStores[y]})
    curStore.isSpying = false
    await curStore.save()
  }

  // add spyed stores to bots ==================================================
  const allCurrentSpyedBots = [].concat.apply([], [...updatedBots.map(bot => bot.spyedStores)])
  const nonSpyedStores = uniqueSpyedStores.filter(spyStore => allCurrentSpyedBots.indexOf(spyStore) === -1)

  let addedIndex = 0;

  for (let x = 0; x < updatedBots.length; x++){
    let curBot = updatedBots[x]
    if (curBot.status !== "inactive"){continue}
    if (addedIndex >= nonSpyedStores.length || nonSpyedStores.length === 0){break}

    curBot.status = "active"
    curBot.spyedStores.push(nonSpyedStores[addedIndex])
    curBot.totalStores = curBot.spyedStores.length
    await curBot.save()

    let curStore = await getStoreFromDatabase({storeLink: nonSpyedStores[addedIndex]})
    curStore.isSpying = true
    await curStore.save()

    LOGGER(`Loja [${nonSpyedStores[addedIndex]}] foi adicionada ao bot ${curBot.botNumber}`, {from: 'MASTER', pid: true})

    addedIndex = addedIndex + 1
  }

  LOGGER(`Um total de ${nonSpyedStores.length} lojas foram adicionadas e ${removedStores.length} foram removidas`, {from: 'SCHEDU', pid: true})

}
