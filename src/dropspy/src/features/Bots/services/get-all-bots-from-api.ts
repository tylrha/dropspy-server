import { API_GET_ALL_BOTS_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

const getAllBotsFromApi = (cbFunction: Function) => {

  api.get(API_GET_ALL_BOTS_ROUTE).then((response) => {
    cbFunction(response.data)
  });

}

export {getAllBotsFromApi}
