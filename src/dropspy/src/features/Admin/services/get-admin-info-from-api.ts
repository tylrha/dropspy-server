import { API_GET_ADMIN_INFO_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

const getAdminInfoFromApi = (cbFunction: Function) => {

  api.get(API_GET_ADMIN_INFO_ROUTE).then((response) => {
    cbFunction(response.data)
  });

}

export {getAdminInfoFromApi}
