const getNoLabeledProductsData = (curProductsArr: any) => {

  const withoutLabelsProductsArr = curProductsArr.filter((product: any) => product.totalLabels === 0)

  const withoutLabelItem = {
    name: "no-label",
    id: "no-label",
    type: "no-label",
    totalProducts: withoutLabelsProductsArr.length,
    totalRevenue: Number((withoutLabelsProductsArr.map((item: any) => item.totalRevenue).reduce((pSum: any, a: any) => pSum + a, 0)).toFixed(2)),
    totalSales: Number(withoutLabelsProductsArr.map((item: any) => item.totalSales).reduce((pSum: any, a: any) => pSum + a, 0))
  }

  return withoutLabelItem

}

export {getNoLabeledProductsData}
