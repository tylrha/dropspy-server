import { API_GET_DATE_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

const getSingleDateFromApi = (userId: String, dateQuery: string, cbFunction: Function) => {

  api.get(`${API_GET_DATE_ROUTE}?initial_date=${dateQuery}&user_id=${userId}`).then((response) => {
    cbFunction(response.data)
  });

}

export {getSingleDateFromApi}
