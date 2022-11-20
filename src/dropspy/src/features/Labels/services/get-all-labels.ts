import { API_GET_ALL_LABELS_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

function getAllLabels(cbFunction: Function){

  api.get(API_GET_ALL_LABELS_ROUTE).then((response) => {
    cbFunction(response.data);
  });

}

export {getAllLabels}
