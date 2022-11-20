import { api } from '../../../services/api'
import { API_HANDLE_USER_REGISTERED_STORES } from '../../../routes/api-routes';

const handleUserRegisteredStores = (finalObj: any, cbFunction: Function) => {

  const { storeLink, userId, mode } = finalObj
  const finalUrl = `${API_HANDLE_USER_REGISTERED_STORES}?mode=${mode}&store_link=${storeLink}&user_id=${userId}`

  api.get(finalUrl).then((response) => {
    cbFunction(response.data)
  });

}

export { handleUserRegisteredStores }
