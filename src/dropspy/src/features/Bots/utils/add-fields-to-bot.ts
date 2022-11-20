const getTimeDifferenceFromNow = (timeStr: string) => {
  if (timeStr === "#"){return timeStr}

  const item3 = timeStr.split(' ')
  const [day, month, year] = item3[0].split('/')
  const [hour, minutes, seconds] = item3[1].split(':')
  const fnTodayDateTime = new Date(Number(year), Number(Number(month) - 1), Number(day), Number(hour), Number(minutes), Number(seconds), 0)
  const diff = (Number(new Date()) - Number(fnTodayDateTime))/60/1000

  return Number(diff.toFixed(0))
}

const addFieldsToBotObj = (item: any) => {

  const checkedTime = getTimeDifferenceFromNow(item.lastCheckDateTime)
  const status = item.status === "active" && (checkedTime > 25 || checkedTime === "#") ? "error" : item.status

  return {
    ...item,
    id: item.botNumber,
    lastCheckDateMinutes: checkedTime,
    lastSaleDateMinutes: getTimeDifferenceFromNow(item.lastSaleDateTime),
    lastSetupDateMinutes: getTimeDifferenceFromNow(item.lastSetupDateTime),
    status: status
  }
}

export {
  addFieldsToBotObj
}
