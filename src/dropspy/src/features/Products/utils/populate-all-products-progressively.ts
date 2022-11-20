import {getAllProductsFromApi} from '../services/get-all-products-from-api'

const populateAllProductsProgressively = (userInfo: any, iterationPopulateFn: Function, endPopulateFn: Function) => {

  console.log(`POPULATE PRODUCTS! - ${userInfo.userRole}`)

  let loadedProductsArr: any = []

  const handleGetAllProductsResponse = (curProdcuts: any, loadedStoresProducts: number) => {

    if (userInfo.userRole === "admin"){

      if (curProdcuts.length === 0) {
        console.log("TERMINOU PRODUCTS ADMIN")
        endPopulateFn(curProdcuts, loadedProductsArr)
      } else {
        loadedProductsArr.push(...curProdcuts)
        iterationPopulateFn(curProdcuts, loadedProductsArr)
        getAllProductsFromApi(userInfo._id, loadedStoresProducts, handleGetAllProductsResponse)
      }

    } else {
      loadedProductsArr.push(...curProdcuts)
      iterationPopulateFn(curProdcuts, loadedProductsArr)
      endPopulateFn(curProdcuts, loadedProductsArr)
      console.log("TERMINOOU PRODUCTS USER!")
    }


  }

  getAllProductsFromApi(userInfo._id, 0, handleGetAllProductsResponse)

}

export {populateAllProductsProgressively}
