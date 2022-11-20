import { Request, Response } from 'express'
import { getDateFromString } from '../../../../utils/libraries/dates'
import { getStoreDatesFromDatabase, getUniqueDatesFromStoreDates } from '../../../models/StoreDate'
import { getUserInDatabase, IUserMongo } from '../../../models/User'
import getComputedDatesFromStoreDates from '../../utils/get-computed-dates-from-store-dates'

export default async function getAllDatesController(request: Request, response: Response) {

  try {

    const { limit, skip, user_id } = request.query

    const userObj = await getUserInDatabase({ _id: user_id })
    if (userObj === null) { throw new Error("user not found") }

    let finalDatesArr = []
    if (userObj.userRole === 'admin') {
      finalDatesArr = await getAdminAllDates(limit ? Number(limit) : undefined, skip ? Number(skip) : undefined)
    } else if (userObj.userRole === 'user') {
      finalDatesArr = await getUserAllDates(limit ? Number(limit) : undefined, skip ? Number(skip) : undefined, userObj)
    } else {
      throw new Error('user role not found')
    }

    return response.json(finalDatesArr)

  } catch (e) {
    response.json({ error: e.message })
  }

}

async function getAdminAllDates(limit: number, skip: number) {

  const uniqueDatesArr = await getUniqueDatesFromStoreDates()

  let initialLimit = 0
  let finalLimit = uniqueDatesArr.length

  if (limit && !skip) {
    initialLimit = 0
    finalLimit = limit
  } else if (limit && skip) {
    initialLimit = Number(skip)
    finalLimit = Number(skip) + Number(limit)
  }

  const sortedDatesArr = [...uniqueDatesArr].sort((a: any, b: any) => Number(getDateFromString(a)) - Number(getDateFromString(b)))
  const currentQueryStoresDates = [...sortedDatesArr].slice(initialLimit, finalLimit)
  const storeDates = await getStoreDatesFromDatabase({ date: { $in: currentQueryStoresDates } })

  const computedDates = getComputedDatesFromStoreDates(storeDates)

  return computedDates
}

async function getUserAllDates(limit: number, skip: number, userObj: IUserMongo) {

  const userUniqueDates = [...new Set([].concat.apply([], userObj.registeredStores.map(store => store.spyDates)))]
  const sortedUserUniqueDates = [...userUniqueDates].sort((a: any, b: any) => Number(getDateFromString(a)) - Number(getDateFromString(b)))

  let initialLimit = 0
  let finalLimit = sortedUserUniqueDates.length

  if (limit && !skip) {
    initialLimit = 0
    finalLimit = Number(limit)
  } else if (limit && skip) {
    initialLimit = Number(skip)
    finalLimit = Number(skip) + Number(limit)
  }

  const currentQueryStoresDates = [...sortedUserUniqueDates].slice(initialLimit, finalLimit)

  const storeDatesQuery = userObj.registeredStores.map(store => {
    return {
      storeLink: store.storeLink,
      date: { $in: store.spyDates.filter(date => currentQueryStoresDates.indexOf(date) > -1) }
    }
  })

  const storeDates = await getStoreDatesFromDatabase({ $or: storeDatesQuery })
  const computedDates = getComputedDatesFromStoreDates(storeDates)
  return computedDates

}

