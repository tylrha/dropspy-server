const getDatesFromStore = (curStoreObj: any) => {

  console.log(curStoreObj)

  const storeDates = curStoreObj?.dates

  return storeDates?.map((item: any) => ({
    ...item,
    id: item.date,
    totalRevenue: item.revenue,
    totalSales: item.sales
  }))

}

export {getDatesFromStore}
