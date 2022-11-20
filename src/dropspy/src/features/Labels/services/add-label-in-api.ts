import { api } from '../../../services/api'
import { API_ADD_LABEL_ROUTE } from '../../../routes/api-routes';

const addLabelInApi = (finalObj: any, cbFunction: Function) => {

  const {synonyms, name, type, compare} = finalObj
  const finalUrl = `${API_ADD_LABEL_ROUTE}?label=${name}&type=${type}&compare=${compare}&synonyms=${synonyms}`

  api.get(finalUrl).then((response) => {
    cbFunction(response)
  });

}

export {addLabelInApi}
