import { api } from '../../../services/api'
import { API_ADD_STORE_ROUTE } from '../../../routes/api-routes';

const addStoreInApi = (storeObj: any, cbFunction: Function) => {

  api.post(API_ADD_STORE_ROUTE, storeObj).then((response) => {
    cbFunction(response.data)
  });


}

export {addStoreInApi}
