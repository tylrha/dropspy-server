import { API_GET_LAST_N_SALES_ROUTE } from "../../../routes/api-routes";
import { api } from "../../../services/api";

async function getLastNSalesFromApiAsync(userId: string, nsales: number){
  const queryUrl = `${API_GET_LAST_N_SALES_ROUTE}?limit=${nsales}&user_id=${userId}`
  const response = await api.get(queryUrl)
  return response.data
}

function getLastNSalesFromApiCallback (userId: string, nsales: number, cbFunction: Function){
  const query = `${API_GET_LAST_N_SALES_ROUTE}?limit=${nsales}&user_id=${userId}`
  api.get(query).then((response) => {
    cbFunction(response.data)
  })
}

export {
  getLastNSalesFromApiAsync,
  getLastNSalesFromApiCallback
}
