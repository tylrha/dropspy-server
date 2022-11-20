import { api } from "./api";

function fetchData(method: string, queryUrl: string, bodyData?: any) {
  return new Promise((resolve, reject) => {

    switch (method) {
      case 'get':
        api.get(queryUrl)
          .then((response: any) => resolve(response.data))
          .catch((error: any) => reject(error))
        break;

      case 'post':
        api.post(queryUrl, bodyData)
          .then((response: any) => resolve(response.data))
          .catch((error: any) => reject(error))
        break;

      default:
        break;
    }

  });

}

export { fetchData }
