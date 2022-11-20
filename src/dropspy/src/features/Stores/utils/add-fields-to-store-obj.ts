import { getSalesTier } from "../../../utils/get-sales-tier"

const addFieldsToStoreObj = (item: any) => {

  return {
    ...item,
    id: item.storeLink,
    tier: getSalesTier(item.totalRevenue, item.totalDates)
  }

}

export {addFieldsToStoreObj}
