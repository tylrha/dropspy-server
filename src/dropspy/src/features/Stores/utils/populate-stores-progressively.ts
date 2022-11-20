import { getAllStoresFromApi } from "../services/get-all-stores-from-api";

const populateAllStoresProgressively = (userInfo: any, iterationPopulateFn: Function, endPopulateFn: Function) => {

  console.log(`POPULATE STORES! - ${userInfo.userRole}`)

  let loadedStoresArr: any = []

  const handleGetAllStoresResponse = (curStores: any) => {

    if (userInfo.userRole === "admin"){
      if (curStores.length === 0) {
        endPopulateFn(curStores, loadedStoresArr)
        return
      } else {
        loadedStoresArr.push(...curStores)
        iterationPopulateFn(curStores, loadedStoresArr)
        getAllStoresFromApi(userInfo._id, loadedStoresArr.length, handleGetAllStoresResponse)
      }
    } else {
      loadedStoresArr.push(...curStores)
      iterationPopulateFn(curStores, loadedStoresArr)
      endPopulateFn(curStores, loadedStoresArr)
      console.log("TERMINOOU STORES!")
    }

  }

  getAllStoresFromApi(userInfo._id, loadedStoresArr.length, handleGetAllStoresResponse)

}

export {populateAllStoresProgressively}
