import { API_GET_ALL_USERS_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

const getAllUsersFromApi = (cbFunction: Function) => {

  api.get(API_GET_ALL_USERS_ROUTE).then((response) => {
    cbFunction(response.data)
  });

}

export {getAllUsersFromApi}
