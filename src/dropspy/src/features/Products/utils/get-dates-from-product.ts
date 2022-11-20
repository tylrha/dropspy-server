import { getSalesTier } from "../../../utils/get-sales-tier"

const getDatesFromProduct = (curProduct: any) => {

  const productDatesArr = curProduct.dates

  const modifiedDatesArr = productDatesArr?.map((item: any) => ({
    ...item,
    id: item.date,
    totalRevenue: item.revenue,
    totalSales: item.sales,
    tier: getSalesTier(item.revenue, 1),
  }))

  return modifiedDatesArr

}

export {getDatesFromProduct}
