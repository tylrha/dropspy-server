import { CURRENT_DATETIME, LOGGER } from "../../configs/configs"
import { getUsersFromDatabase } from "../models/User"

export default async function addCurrentDateToSpyedStores(){

  LOGGER(`Adicionar datas nas lojas espionadas`, {from: 'SCHEDU', pid: true})

  const allUsers = await getUsersFromDatabase({})
  for (let x = 0; x < allUsers.length; x++){

    let curUser = allUsers[x]
    console.log(`\n${x + 1}/${allUsers.length} - [${curUser['_doc'].email}]`)

    curUser['_doc'].registeredStores = curUser['_doc'].registeredStores.map(spyedStore => {

      if (spyedStore['_doc'].isSpying === false){return spyedStore}

      let newSpyedStore = {...spyedStore}
      const todayDate = CURRENT_DATETIME('date')

      const isCurrentDateAlready = newSpyedStore['_doc'].spyDates.includes(todayDate)
      if (!isCurrentDateAlready){
        newSpyedStore['_doc'].spyDates.push(todayDate)
        newSpyedStore['_doc'].totalDates = newSpyedStore['_doc'].spyDates.length
        console.log(`Add [${todayDate}] to store [${newSpyedStore['_doc'].storeLink}] at user [${curUser['_doc'].email}]`)
      }

      return newSpyedStore
    })

    await curUser.save()
  }

}


/*

  const allBots = await getBotsFromDatabase({})
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
  let removedStores = 0
  for(let x = 0; x < allBots.length; x++){

    let curBot = allBots[x]
    const oldSpyedStores = [...curBot.spyedStores]
    const filteredStores = curBot.spyedStores.filter(store => {
      const storeIndex = uniqueSpyedStores.indexOf(store)
      if (storeIndex === -1){
        LOGGER(`Loja ${store} foi removida da espionagem do bot ${curBot.botNumber}!`, {from: 'SCHEDU', pid: true})
        removedStores = removedStores + 1
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
    LOGGER(`Loja [${nonSpyedStores[addedIndex]}] foi adicionada ao bot ${curBot.botNumber}`, {from: 'MASTER', pid: true})

    addedIndex = addedIndex + 1
  }

  LOGGER(`Um total de ${nonSpyedStores.length} lojas foram adicionadas e ${removedStores} foram removidas`, {from: 'SCHEDU', pid: true})

*/
