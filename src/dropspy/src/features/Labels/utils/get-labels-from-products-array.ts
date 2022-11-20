const addFieldsToLabelObj = (item: any) => ({...item, id: item.name, totalProducts: 0, totalRevenue: 0, totalSales: 0})

const getLabelsArrFromProducts = (oldProducts: any) => {

  const mergedLabels = [].concat.apply([], oldProducts.map((item: any) => item.labels));
  const uniqueLabelsArr = new Map(mergedLabels.map((item: any) => [item['name'], item])) as any
  const curLabels = [...uniqueLabelsArr.values()];

  let finalLabelsArr = [...curLabels.map((item: any) => addFieldsToLabelObj(item))]

  for (let x = 0; x < oldProducts.length; x++) {
    const curProduct = oldProducts[x]
    const curLabelsArr = curProduct.labels.map((item: any) => item.name)
    const curRevenue = curProduct.totalRevenue
    const curSales = curProduct.totalSales

    curLabelsArr.forEach((item: any) => {
      const labelIndex = finalLabelsArr.findIndex(label => label.name === item)

      if (labelIndex > -1) {
        finalLabelsArr[labelIndex].totalRevenue = Number(((finalLabelsArr[labelIndex].totalRevenue) + (curRevenue)).toFixed(2))
        finalLabelsArr[labelIndex].totalSales = Number((finalLabelsArr[labelIndex].totalSales) + (curSales))
        finalLabelsArr[labelIndex].totalProducts += 1
      }
    })
  }

  const sortedArr = finalLabelsArr.sort((a, b) => (a.totalRevenue < b.totalRevenue ? 1 : -1))
  return sortedArr
}

export {
  getLabelsArrFromProducts
}
