import { getAllDatesFromApi } from "../services/get-all-dates-from-api";

const populateAllDatesProgressively = (userId: string, iterationPopulateFn: Function, endPopulateFn: Function) => {

  console.log("POPULATE DATES!")
  let loadedDatesArr: any = []

  const handleGetAllDatesResponse = (curDates: any) => {

    if (curDates.length === 0) {
      console.log("TERMINOU DATES!")
      endPopulateFn(endPopulateFn, loadedDatesArr)
      return
    } else {
      loadedDatesArr.push(...curDates)
      iterationPopulateFn(curDates, loadedDatesArr)
      getAllDatesFromApi(userId, loadedDatesArr.length, handleGetAllDatesResponse)
    }

  }

  getAllDatesFromApi(userId, loadedDatesArr.length, handleGetAllDatesResponse)

}

export {populateAllDatesProgressively}
