const groupProductsByTier = (curProducts: any) => {

  const addFields = (item: any) => ({tier: item, id: item, totalStores: 0, totalSales: 0, totalProducts: 0, totalRevenue: 0})
  let tierArr = [...new Set(curProducts.map((item: any) => item.tier))].map(item => addFields(item))

  tierArr = tierArr.map((tier) => {
    const curTierProductsArr = curProducts.filter((store: any) => store.tier === tier.tier)
    let uniqueStores = [...new Set(curTierProductsArr.map((item: any) => item.storeLink))]

    const totalRevenue = Number((curTierProductsArr.map((item: any) => item.totalRevenue).reduce((pSum: any, a: any) => pSum + a, 0)).toFixed(2))
    const totalSales = (curTierProductsArr.map((item: any) => item.totalSales).reduce((pSum: any, a: any) => pSum + a, 0))
    const totalProducts = curTierProductsArr.length
    const totalStores = uniqueStores.length

    return {
      ...tier,
      totalRevenue,
      totalSales,
      totalProducts,
      totalStores
    }
  })

  return tierArr
}

export {groupProductsByTier}
