import axios from "axios"
import { LOGGER, CURRENT_DATE, SERVER_BASE } from "../../configs/configs"
import { getTimeDifferenceFromNow } from "../../utils/libraries/dates"
import { getBotsFromDatabase } from "../models/Bot"

export default async function restartErrorBots(){

  LOGGER(`Reiniciando bots com erro`, {from: 'SCHEDU', pid: true})
  const allBots = await getBotsFromDatabase({})
  let restartedBots = 0

  for(let x = 0; x < allBots.length; x++){
    let curBot = allBots[x]
    const hasRecentlyRestarted = curBot.lastSetupDateTime !== "#" ? getTimeDifferenceFromNow(CURRENT_DATE(), curBot.lastSetupDateTime) : 0
    const currentDiff = curBot.lastCheckDateTime !== "#" ? getTimeDifferenceFromNow(CURRENT_DATE(), curBot.lastCheckDateTime) : 0
    const notChecking = curBot.lastCheckDateTime === "#" || currentDiff > 20
    const isActive = curBot.status === "active"

    if (notChecking && isActive && hasRecentlyRestarted > 15){
      const restartUrl = `https://dropspy-${curBot.botNumber.replace("p", "")}.herokuapp.com/restart`
      console.log(restartUrl)

      axios.get(restartUrl)
        .then(res => {
          console.log(`Reinicia o ${curBot.botNumber}: ${restartUrl}`)
        })
        .catch(err => console.log(`Erro: ${err.message}`))
      restartedBots += 1
    }

  }

  LOGGER(`Um total de ${restartedBots} bots foram reiniciados!`, {from: 'SCHEDU', pid: true})

}
