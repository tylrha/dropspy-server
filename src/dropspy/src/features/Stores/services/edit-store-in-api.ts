import { api } from '../../../services/api'
import { API_EDIT_STORE_ROUTE } from '../../../routes/api-routes';

const editStoreInApi = (storeObj: any, cbFunction: Function) => {

  api.post(API_EDIT_STORE_ROUTE, storeObj).then((response) => {
    cbFunction(response.data)
  });

}

export {editStoreInApi}
