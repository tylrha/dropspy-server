import { API_GET_ALL_PRODUCTS_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

const getAllProductsFromApi = (userId: any, loadedStoresProducts: number, cbFunction: Function) => {

  const STORE_PRODUCTS_PER_QUERY = loadedStoresProducts === 0 ? 10 : 50
  const currentQuery = loadedStoresProducts === 0 ? `limit=${STORE_PRODUCTS_PER_QUERY}` : `limit=${STORE_PRODUCTS_PER_QUERY}&skip=${loadedStoresProducts}`
  const finalQueryUrl = `${API_GET_ALL_PRODUCTS_ROUTE}?${currentQuery}&user_id=${userId}`

  api.get(finalQueryUrl).then((response) => {
    cbFunction(response.data, Number(loadedStoresProducts + STORE_PRODUCTS_PER_QUERY))
  });

}

export {getAllProductsFromApi}
