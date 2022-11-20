export default function getUniqueProductsFromStoreDates(storeDates: any){

  let finalProducts = []

  const allProducts = [].concat.apply([], [...storeDates.map(storeDate => storeDate.products)])
  allProducts.forEach(product => {

    let productIndex = finalProducts.findIndex(pdt => pdt.productLink === product.productLink)

    if (productIndex === -1){
      finalProducts.push(    {
        ...product,
        totalSales: 0,
        totalRevenue: 0,
        totalDates: 0,
        dates: []
      })

      productIndex = finalProducts.length - 1
    }

    finalProducts[productIndex].totalDates += 1
    finalProducts[productIndex].totalSales += product.sales
    finalProducts[productIndex].totalRevenue = Number((finalProducts[productIndex].totalRevenue + product.revenue).toFixed(2))

  })

  return finalProducts
}
