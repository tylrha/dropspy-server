import { API_GET_TOP_PRODUCTS_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

const getTopProductsFromApi = (userId: string, topN: number, cbFunction: Function) => {

  const query = `${API_GET_TOP_PRODUCTS_ROUTE}?limit=${topN}&user_id=${userId}`

  api.get(query).then((response) => {
    cbFunction(response.data);
  });

}

export {getTopProductsFromApi}
