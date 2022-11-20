import { API_GET_ALL_STORES_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

const getAllStoresFromApi = (userId: any, loadedStores: number, cbFunction: Function) => {

  const STORES_PER_QUERY = 100
  const currentQuery = loadedStores === 0 ? `limit=${STORES_PER_QUERY}` : `limit=${STORES_PER_QUERY}&skip=${loadedStores}`
  const finalQueryUrl = `${API_GET_ALL_STORES_ROUTE}?${currentQuery}&user_id=${userId}`

  api.get(finalQueryUrl).then((response) => {
    cbFunction(response.data)
  });

}

export { getAllStoresFromApi }
