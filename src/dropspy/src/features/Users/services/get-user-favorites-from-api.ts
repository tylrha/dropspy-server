import { api } from "../../../services/api";

function getUserFavoritesFromApi(userId: string, cbFunction: Function): void{

  api.get(`/api/users/userfavorites?user_id=${userId}`).then((response) => {
    cbFunction(response.data)
  });

}

export {getUserFavoritesFromApi}
