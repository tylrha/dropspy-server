const groupStoresByTier = (curStores: any) => {

  let tierArr = [...new Set(curStores.map((item: any) => item.tier))].map(item => ({tier: item, id: item, totalStores: 0, totalSales: 0, totalProducts: 0, totalRevenue: 0}))

  tierArr = tierArr.map((tier) => {
    const tierStores = curStores.filter((store: any) => store.tier === tier.tier)

    const totalRevenue = Number((tierStores.map((item: any) => item.totalRevenue).reduce((pSum: any, a: any) => pSum + a, 0)).toFixed(2))
    const totalSales = (tierStores.map((item: any) => item.totalSales).reduce((pSum: any, a: any) => pSum + a, 0))
    const totalProducts = (tierStores.map((item: any) => item.totalProducts).reduce((pSum: any, a: any) => pSum + a, 0))
    const totalStores = tierStores.length

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

export {groupStoresByTier}
