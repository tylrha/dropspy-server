import { API_GET_ALL_CATEGORIES_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

const getAllCategoriesFromApi = (cbFunction: Function) => {

  api.get(API_GET_ALL_CATEGORIES_ROUTE).then((response) => {
    cbFunction(response.data);
  });

}

export {getAllCategoriesFromApi}
