import { api } from '../../../services/api'
import { API_HANDLE_USER_FAVORITE_PRODUCTS } from '../../../routes/api-routes';

const handleUserFavoriteProducts = (finalObj: any, cbFunction: Function) => {

  const { productLink, userId, mode } = finalObj
  const finalUrl = `${API_HANDLE_USER_FAVORITE_PRODUCTS}?mode=${mode}&product_link=${productLink}&user_id=${userId}`

  api.get(finalUrl).then((response) => {
    cbFunction(response.data)
  });

}

export { handleUserFavoriteProducts }
