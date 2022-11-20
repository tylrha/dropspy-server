import { API_ADD_LABELS_TO_ALL_PRODUTS_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

function updateLabelsInAllProducts(loadedProducts: number, cbFunction: Function){

  const PRODUCTS_PER_QUERY = 1500
  const currentQuery = loadedProducts === 0 ? `limit=${PRODUCTS_PER_QUERY}` : `limit=${PRODUCTS_PER_QUERY}&skip=${loadedProducts}`
  const finalQueryUrl = `${API_ADD_LABELS_TO_ALL_PRODUTS_ROUTE}?${currentQuery}`

  api.get(finalQueryUrl).then((response) => {
    cbFunction(response.data);
  });

}

export {updateLabelsInAllProducts}
