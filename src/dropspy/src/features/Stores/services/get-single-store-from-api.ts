import { API_GET_STORE_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

const getStoreFromApi = (userId: any, storeLink: string, cbFunction: Function) => {

  const storeQuery = `${API_GET_STORE_ROUTE}?store_link=${storeLink}&user_id=${userId}`

  api.get(storeQuery).then((response) => {
    cbFunction(response.data)
  });

}

export {getStoreFromApi}
