function getSalesTier(revenue: Number, dates: Number, isDate?: boolean): string {

  const dailyRevenue = Number(revenue) / Number(dates)
  const dateIndex = isDate === true ? 1 : 30

  if (dailyRevenue > Number(30000000 / dateIndex)) { return "1-SS" }
  if (dailyRevenue > Number(1000000 / dateIndex)) { return "2-S" }
  if (dailyRevenue > Number(500000 / dateIndex)) { return "3-A" }
  if (dailyRevenue > Number(100000 / dateIndex)) { return "4-B" }
  if (dailyRevenue > Number(30000 / dateIndex)) { return "5-C" }
  if (dailyRevenue > 0) { return "6-D" }
  if (dailyRevenue > 0) { return "7-E" }

  return "8-#"
}

export {getSalesTier}
