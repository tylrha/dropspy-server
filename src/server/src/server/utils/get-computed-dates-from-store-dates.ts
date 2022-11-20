import { getDateFromString } from "../../../utils/libraries/dates"
import { IStoreDate } from "../../models/StoreDate"

export default function getComputedDatesFromStoreDates(storeDates: IStoreDate[]){

  const uniqueDates = [...new Set(storeDates.map(storeDate => storeDate.date))]
  const sortedUniqueDates = uniqueDates.sort((a: any, b: any) => Number(getDateFromString(a)) - Number(getDateFromString(b)))

  let finalDatesArr = []

  for (let x = 0; x < sortedUniqueDates.length; x++) {

    const curDate = sortedUniqueDates[x]
    const dateDocs = storeDates.filter(dateObj => dateObj.date === curDate)

    const dateTotalRevenue = Number((dateDocs.map(storeDate => storeDate.totalRevenue).reduce((pSum, a) => pSum + a, 0)).toFixed(2))
    const dateTotalSales = dateDocs.map(storeDate => storeDate.totalSales).reduce((pSum, a) => pSum + a, 0)
    const dateTotalProducts = dateDocs.map(storeDate => storeDate.products.length).reduce((pSum, a) => pSum + a, 0)
    const dateTotalStores = dateDocs.length
    const dateProducts = [].concat.apply([], [...dateDocs.map(storeDate => storeDate.products)])
    const dateStores = dateDocs.map(storeDate => ({
      storeLink: storeDate.storeLink,
      totalSales: storeDate.totalSales,
      totalRevenue: storeDate.totalRevenue,
      totalProducts: storeDate.totalProducts,
    }))

    finalDatesArr.push({
      date: curDate,
      totalRevenue: dateTotalRevenue,
      totalSales: dateTotalSales,
      totalProducts: dateTotalProducts,
      totalStores: dateTotalStores,
      products: dateProducts,
      stores: dateStores
    })

  }

  return finalDatesArr

}
