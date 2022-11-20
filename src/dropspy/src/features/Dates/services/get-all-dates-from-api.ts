import { API_GET_ALL_DATES_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";
import { getSalesTier } from "../../../utils/get-sales-tier";

const getAllDatesFromApi = (userId: string, loadedDates: number, cbFunction: Function) => {

  const DATES_PER_QUERY = 10
  const currentQuery = loadedDates === 0 ? `limit=${DATES_PER_QUERY}` : `limit=${DATES_PER_QUERY}&skip=${loadedDates}`
  const finalQueryUrl = `${API_GET_ALL_DATES_ROUTE}?${currentQuery}&user_id=${userId}`

  api.get(finalQueryUrl).then((response) => {

    const finalDatesArr = Array.from(response.data).map((old: any) => ({
      ...old,
      id: old.date,
      tier: getSalesTier(old.totalRevenue, 1, true)
    }))

    cbFunction(finalDatesArr)

  })

}

export { getAllDatesFromApi }
