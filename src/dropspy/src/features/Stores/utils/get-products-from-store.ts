import { getSalesTier } from "../../../utils/get-sales-tier"

const getProductsFromStore = (curStoreObj: any) => {

  const storeProducts = curStoreObj.products

  const modifiedProducts = storeProducts?.map((item: any) => ({
    ...item,
    id: item.productLink,
    tier: getSalesTier(item.totalRevenue, item.totalDates),
  }))


  return modifiedProducts

}

export {getProductsFromStore}
