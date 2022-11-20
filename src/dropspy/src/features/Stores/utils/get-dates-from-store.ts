const getDatesFromStore = (curStoreObj: any) => {

  const storeDates = curStoreObj.dates

  return storeDates?.map((item: any) => ({
    ...item,
    id: item.date,
    totalRevenue: item.revenue,
    totalSales: item.sales
  }))?.reverse()

}

export {getDatesFromStore}
