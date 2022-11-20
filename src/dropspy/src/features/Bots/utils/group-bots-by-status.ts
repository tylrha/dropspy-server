const groupBotsByStatus = (allBotsArr: any) => {

  const addStatusFieldToBotElement = (item: any, status: any) => ({...item, realStatus: status})

  const inactiveBots = allBotsArr.filter((item: any) => item.status === "inactive")
  const activeBots = allBotsArr.filter((item: any) => item.status === "active")
  const errorBots = allBotsArr.filter((item: any) => item.status === "error")

  let finalBotsArr = []
  finalBotsArr.push(...inactiveBots.map((item: any) => addStatusFieldToBotElement(item, "inactive")))
  finalBotsArr.push(...activeBots.map((item: any) => addStatusFieldToBotElement(item, "active")))
  finalBotsArr.push(...errorBots.map((item: any) => addStatusFieldToBotElement(item, "error")))

  return finalBotsArr

}

export {groupBotsByStatus}
