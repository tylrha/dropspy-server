import { getStoresFromDatabase } from "../../models/Store"

export default async function addStoreCompleteInfoToComputedStores(computedStore: any){

  const completStoresDocs = await getStoresFromDatabase({storeLink: {$in: computedStore.map(store => store.storeLink)}})

  const completeStores = computedStore.map(store => {
    const completeStoreObj = completStoresDocs.find(str => str.storeLink === store.storeLink)

    return {
      ...store,
      storeName: completeStoreObj.storeName,
      storeLogoLink: completeStoreObj.storeLogoLink,
      storeCategory: completeStoreObj.storeCategory,
      storeCountry: completeStoreObj.storeCountry,
      isSpying: completeStoreObj.isSpying,
      storeError: completeStoreObj.storeError,
      lastSale: completeStoreObj.lastSale,
    }
  })

  return completeStores.sort((a: any, b: any) => (a.totalRevenue > b.totalRevenue ? -1 : 1))
}
