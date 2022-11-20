import { API_GET_ALL_LABELED_PRODUCTS_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

function getAllProductsOfLabelFromApi(userId: string, labelQuery: string, loadedLabels: number, cbFunction: Function){

  const PRODUCTS_PER_QUERY = loadedLabels === 0 ? 100 : 800
  const currentQuery = loadedLabels === 0 ? `limit=${PRODUCTS_PER_QUERY}` : `limit=${PRODUCTS_PER_QUERY}&skip=${loadedLabels}`
  const finalQueryUrl = `${API_GET_ALL_LABELED_PRODUCTS_ROUTE}?${currentQuery}&label=${labelQuery}&user_id=${userId}`

  api.get(finalQueryUrl).then((response) => {
    cbFunction(response.data)
  });

}

export {getAllProductsOfLabelFromApi}
