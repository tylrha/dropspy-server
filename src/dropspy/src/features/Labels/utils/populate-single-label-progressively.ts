import { getAllProductsOfLabelFromApi } from "../services/get-all-products-of-label-from-api"

const populateSingleLabelProgressively = (userInfo: any, labelName: any, iterationPopulateFn: Function, endPopulateFn: Function) => {
  console.log("POPULATE!")
  console.log(userInfo)

  let loadedProductsArr: any = []

  const handleGetlabelResponse = (curProducts: any) => {

    if (userInfo.userRole === "admin"){

      if (curProducts.length === 0) {
        endPopulateFn(curProducts, loadedProductsArr)
      } else {
        loadedProductsArr.push(...curProducts)
        iterationPopulateFn(curProducts, loadedProductsArr)
        getAllProductsOfLabelFromApi(userInfo._id, labelName, loadedProductsArr.length, handleGetlabelResponse)
      }

    } else {
      loadedProductsArr.push(...curProducts)
      iterationPopulateFn(curProducts, loadedProductsArr)
      endPopulateFn(curProducts, loadedProductsArr)
      console.log("TERMINOOU LABEL USER!")
    }




  }

  getAllProductsOfLabelFromApi(userInfo._id, labelName, loadedProductsArr.length, handleGetlabelResponse)

}

export {populateSingleLabelProgressively}
