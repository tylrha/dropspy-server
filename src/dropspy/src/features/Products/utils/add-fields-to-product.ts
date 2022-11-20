import { getSalesTier } from "../../../utils/get-sales-tier"

const addFieldsToProductObj = (item: any) => {

  return {
    ...item,
    id: item.productLink,
    tier: getSalesTier(item.totalRevenue, item.totalDates),
  }

}

export {addFieldsToProductObj}
