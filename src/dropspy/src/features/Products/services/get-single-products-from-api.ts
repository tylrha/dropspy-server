import { API_GET_PRODUCT_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

const getProductFromApi = (userId: string, productLink: string, cbFunction: Function) => {

  const productQueryApi = `${API_GET_PRODUCT_ROUTE}?product_link=${productLink}&user_id=${userId}`

  api.get(productQueryApi).then((response) => {
    cbFunction(response.data)
  });

}

export {getProductFromApi}
