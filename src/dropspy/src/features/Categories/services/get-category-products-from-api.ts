import { API_GET_ALL_CATEGORY_PRODUCTS_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

function getCategoryProductsFromApi(category: string, userId: string, cbFunction: Function){

  const finalQueryUrl = `${API_GET_ALL_CATEGORY_PRODUCTS_ROUTE}?&category=${category}&user_id=${userId}`

  api.get(finalQueryUrl).then((response) => {
    cbFunction(response.data)
  });

}

export {getCategoryProductsFromApi}
