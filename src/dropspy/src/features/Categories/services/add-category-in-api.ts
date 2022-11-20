import { api } from '../../../services/api'
import { API_ADD_CATEGORY_ROUTE } from '../../../routes/api-routes';

const addCategoryInApi = (finalObj: any, cbFunction: Function) => {

  const { name } = finalObj
  const finalUrl = `${API_ADD_CATEGORY_ROUTE}?name=${name}`

  api.get(finalUrl).then((response) => {
    cbFunction(response)
  });

}

export { addCategoryInApi }
