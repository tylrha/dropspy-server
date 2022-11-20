import { getSalesTier } from "../../../utils/get-sales-tier"

const getStoresFromDate = (curDateObj: any) => {

  let storesArr: any = []

  const dateStores = curDateObj.stores

  dateStores?.forEach((store: any) => {

      const alreadyAdded = storesArr.findIndex((item: any) => item?.storeLink === store?.storeLink) > -1
      if (store !== null && alreadyAdded === false) {
      storesArr.push({
        ...store,
        id: store.storeLink,
        tier: getSalesTier(store.totalRevenue, store.totalDates),
        totalRevenue: store.revenue,
        totalSales: store.sales,
        totalProducts: store.products
      })
    }
  })

  return storesArr

}

export {getStoresFromDate}
