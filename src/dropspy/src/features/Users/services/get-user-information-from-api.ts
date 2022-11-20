import { api } from "../../../services/api";
import {GET_USER_INFORMATION_ROUTE}  from "../../../routes/api-routes";

function getUserInformationFromApi(userId: string, cbFunction: Function): void{

  api.get(`${GET_USER_INFORMATION_ROUTE}?userId=${userId}`).then((response) => {
    cbFunction(response.data[0])
  });

}

export {getUserInformationFromApi}
