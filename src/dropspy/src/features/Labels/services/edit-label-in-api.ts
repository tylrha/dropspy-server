import { api } from '../../../services/api'
import { API_EDIT_LABEL_ROUTE } from '../../../routes/api-routes';

const editLabelInApi = (finalObj: any, cbFunction: Function) => {

  const {synonyms, name, type, compare} = finalObj
  const finalSynonyms = synonyms.length > 0 ? [name, Array.from(synonyms).join(',')] : name
  const finalUrl = `${API_EDIT_LABEL_ROUTE}?label=${name}&type=${type}&compare=${compare}&synonyms=${finalSynonyms}`

  api.get(finalUrl).then((response) => {
    cbFunction(response)
  });

}

export {editLabelInApi}
