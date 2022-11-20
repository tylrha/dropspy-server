export default function getComputedStoresFromStoreDates(storeDates: any){

  let finalStoresArr = []
  storeDates.forEach(store => {
    // console.log(store.storeLink + " - " + store.date)

    let storeIndex = finalStoresArr.findIndex(str => str.storeLink === store.storeLink)

    if (storeIndex === -1){
      finalStoresArr.push({
        storeLink: store.storeLink,
        totalSales: 0,
        totalRevenue: 0,
        totalDates: 0,
        totalProducts: 0,
        products: [],
        dates: []
      })
      storeIndex = finalStoresArr.length - 1
    }


    store.products.forEach((pdt: any) => {

      let pdtIndex = finalStoresArr[storeIndex].products.findIndex((pd: any) => pd.productLink === pdt.productLink)
      if (pdtIndex === -1){
        finalStoresArr[storeIndex].products.push({
          productLink: pdt.productLink,
          totalSales: 0,
          totalRevenue: 0,
          totalDates: 0
        })

        pdtIndex = finalStoresArr[storeIndex].products.length - 1
      }

      finalStoresArr[storeIndex].products[pdtIndex].totalDates += 1
      finalStoresArr[storeIndex].products[pdtIndex].totalSales += pdt.sales
      finalStoresArr[storeIndex].products[pdtIndex].totalRevenue = Number((finalStoresArr[storeIndex].products[pdtIndex].totalRevenue + pdt.revenue).toFixed(2))
    })

    finalStoresArr[storeIndex].dates = [
      ...finalStoresArr[storeIndex].dates,
      {
        date: store['date'],
        sales: store['totalSales'],
        revenue: store['totalRevenue']
      }
    ]

    finalStoresArr[storeIndex].totalDates += 1
    finalStoresArr[storeIndex].totalSales += store.totalSales
    finalStoresArr[storeIndex].totalRevenue = Number((finalStoresArr[storeIndex].totalRevenue + store.totalRevenue).toFixed(2))
    finalStoresArr[storeIndex].totalProducts = finalStoresArr[storeIndex].products.length

  })

  return finalStoresArr
}
