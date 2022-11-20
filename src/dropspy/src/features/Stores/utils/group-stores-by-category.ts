
const groupStoresByCategory = (oldStores: any) => {

  const storesCategoriesArr = oldStores.reduce((finalArr: any, store: any) => {
    const { storeCategory } = store;
    finalArr[storeCategory] = finalArr[storeCategory] ?? [];
    finalArr[storeCategory].push(store);
    return finalArr;
  }, {});

  const finalStoresCategoriesArr = Object.keys(storesCategoriesArr).map(category => {
    const storesArr = storesCategoriesArr[category]

    const totalStores = storesArr.length
    const totalSales = Number(storesArr.map((store: any) => store.totalSales).reduce((pSum: any, a: any) => pSum + a, 0))
    const totalProducts = Number(storesArr.map((store: any) => store.totalProducts).reduce((pSum: any, a: any) => pSum + a, 0))
    const totalRevenue = Number(storesArr.map((store: any) => store.totalRevenue).reduce((pSum: any, a: any) => pSum + a, 0).toFixed(2))

    return {
      id: category,
      storeCategory: category,
      totalStores,
      totalSales,
      totalProducts,
      totalRevenue
    }
  })

  return finalStoresCategoriesArr

}

export {groupStoresByCategory}
