import { api } from '../../../services/api'
import { API_HANDLE_USER_FAVORITE_STORES } from '../../../routes/api-routes';

const handleUserFavoriteStores = (finalObj: any, cbFunction: Function) => {

  const { storeLink, userId, mode } = finalObj
  const finalUrl = `${API_HANDLE_USER_FAVORITE_STORES}?mode=${mode}&store_link=${storeLink}&user_id=${userId}`

  api.get(finalUrl).then((response) => {
    cbFunction(response.data)
  });

}

export { handleUserFavoriteStores }
