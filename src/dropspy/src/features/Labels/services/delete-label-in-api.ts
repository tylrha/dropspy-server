import { api } from '../../../services/api'
import { API_DELETE_LABEL_ROUTE } from '../../../routes/api-routes';

const deleteLabelInApi = (finalObj: any, cbFunction: Function) => {

  const { name } = finalObj
  const finalUrl = `${API_DELETE_LABEL_ROUTE}?label=${name}`

  api.get(finalUrl).then((response) => {
    cbFunction(response)
  });

}

export { deleteLabelInApi }
