import { getSalesTier } from "../../../utils/get-sales-tier";

const getProductsFromDate = (curDateObj: any) => {

  let productsArr: any = []

  const dateStores = {...curDateObj}.stores;

  dateStores?.forEach((store: any) => {

    const storeProducts = store.productsArr

    storeProducts?.forEach((product: any) => {

      const alreadyAdded = productsArr.findIndex((item: any) => item?.productLink === product?.productLink) > -1

      if (product !== null && alreadyAdded === false) {
        productsArr.push({
          ...product,
          id: product.productLink,
          tier: getSalesTier(store.totalRevenue, store.totalDates),
          totalRevenue: product.revenue,
          totalSales: product.sales
        })
      }
    })

  })

  return productsArr

}

export {getProductsFromDate}
