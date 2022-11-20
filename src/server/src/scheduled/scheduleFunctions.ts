import { CURRENT_DATE, LOGGER } from "../../configs/configs";
import addCurrentDateToSpyedStores from "./add-new-current-to-spyed-stores";
import allocateBotsToSpyedStores from "./allocate-bots-to-spyed-stores";
import restartErrorBots from "./restart-error-bots";

/* ========================================================================== */

const convertDateToUTC = (oldDateObj: Date) => new Date(Date.UTC(oldDateObj.getFullYear(), oldDateObj.getMonth(), oldDateObj.getDate(), oldDateObj.getHours(), oldDateObj.getMinutes(), oldDateObj.getSeconds()));

const addMinutesToCurrentDateTime = (dateObj: Date, minutesToAdd: number) => new Date(dateObj.getTime() + minutesToAdd * 60 * 1000);

const getTimeFromDateObj = (dateObj: Date) => dateObj.toISOString().split("T")[1].split(".")[0]

const runFunctionInNMinutes = (minutes: number, loopInterval: number, fn: Function, fnDescription: string) => {
  setTimeout(() => {
    console.log("")
    LOGGER(`Runing scheduled function: ${fnDescription} - ${loopInterval} min`, {from: "SCHEDU", pid: true})
    fn()
    runFunctionInNMinutes(Number(loopInterval * 60 * 1000), loopInterval, fn, fnDescription)
  }, minutes);
}

/* ========================================================================== */

export default function scheduleFunctions(){

  const nMinutesFromNow = getTimeFromDateObj(addMinutesToCurrentDateTime(CURRENT_DATE(), 1))

  const specificFunctionsArr = [
    [nMinutesFromNow, 1, allocateBotsToSpyedStores, "Alocar bots para lojas espionadas"],
    // [nMinutesFromNow, 15, restartErrorBots, "Reinicia bots com erro"],
    ["00:00:01", 1440, addCurrentDateToSpyedStores, "Adicionar datas para lojas espionadas"],
  ]

  LOGGER(`Scheduling ${specificFunctionsArr.length} functions`, {from: "SCHEDU", pid: true})

  specificFunctionsArr.forEach(element => {

    const datetime = element[0] as string
    const loopInterval = element[1] as number
    const datetimeFn = element[2] as Function
    const fnDescription = element[3] as string

    const [hour, time, seconds] = datetime.toString().split(':').map(item => Number(item))
    const fnTodayDateTime = datetime !== nMinutesFromNow ? new Date(CURRENT_DATE().getFullYear(), CURRENT_DATE().getMonth(), CURRENT_DATE().getDate(), hour, time, seconds, 0) : convertDateToUTC(new Date(CURRENT_DATE().getFullYear(), CURRENT_DATE().getMonth(), CURRENT_DATE().getDate(), hour, time, seconds, 0))

    let minDiff = Number(fnTodayDateTime) - Number(CURRENT_DATE())
    if (minDiff < 0){
      const fnTomorrowDateTime = new Date(fnTodayDateTime.getTime());
      fnTomorrowDateTime.setDate(fnTomorrowDateTime.getDate() + 1);
      minDiff = Number(fnTomorrowDateTime) - Number(CURRENT_DATE())
    }

    const finalMinutes = datetime !== nMinutesFromNow ? datetime : getTimeFromDateObj(addMinutesToCurrentDateTime(convertDateToUTC(CURRENT_DATE()), minDiff/60/1000))
    const remainingTime = (minDiff/60/1000) <= 60 ? `${(minDiff/60/1000).toFixed(0)} min` : `${(minDiff/60/60/1000).toFixed(0)} h`
    LOGGER(`${finalMinutes} - ${remainingTime} - ${fnDescription}`, {from: "SCHEDU", pid: true})

    runFunctionInNMinutes(minDiff, loopInterval, datetimeFn, fnDescription)
  });

}
