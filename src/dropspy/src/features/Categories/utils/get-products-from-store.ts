import { getSalesTier } from "../../../utils/get-sales-tier"

const getProductsFromStore = (curStoreObj: any) => {

  const storeProducts = curStoreObj?.products

  return storeProducts?.map((item: any) => ({
    ...item,
    id: item.productLink,
    tier: getSalesTier(item.totalRevenue, item.totalDates),
    totalRevenue: item.revenue,
    totalSales: item.sales
  }))

}

export {getProductsFromStore}
