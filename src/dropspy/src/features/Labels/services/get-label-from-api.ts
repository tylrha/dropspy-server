import { API_GET_LABEL_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

function getLabelFromApi(label: string, cbFunction: Function){

  api.get(`${API_GET_LABEL_ROUTE}?label=${label}`).then((response) => {
    cbFunction(response.data);
  });

}

export {getLabelFromApi}
