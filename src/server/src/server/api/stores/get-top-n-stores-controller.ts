import { Request, Response } from 'express'

import checkQueriesErros from '../../components/query-validation'
import { Store } from '../../../models/Store'
import { getStoreDatesFromDatabase } from '../../../models/StoreDate'
import { getUserInDatabase, IUserMongo } from '../../../models/User'
import addStoreCompleteInfoToComputedStores from '../../utils/add-complete-store-info-to-computed-stores'
import getComputedStoresFromStoreDates from '../../utils/get-computed-stores-from-store-dates'

export default async function getTopNStoresController(request: Request, response: Response) {

  try {

    const { limit, user_id } = request.query
    if (checkQueriesErros({ limit, user_id }, response) === true) { return }

    const userObj = await getUserInDatabase({ _id: user_id })
    if (userObj === null) { throw new Error("user not found") }

    let topStoresArr = []
    if (userObj.userRole === 'admin') {
      topStoresArr = await getAdminTopStores(Number(limit))
    } else if (userObj.userRole === 'user') {
      topStoresArr = await getUserTopStores(Number(limit), userObj)
    } else {
      throw new Error('user role not found')
    }

    response.json(topStoresArr)

  } catch (e) {
    console.log(e)
    response.json({ error: e.message })
  }

}

async function getAdminTopStores(limit: number) {
  const adminTopStores = await Store.find({}).sort({ "totalRevenue": -1 }).limit(Number(limit))
  return adminTopStores
}

async function getUserTopStores(limit: number, userObj: IUserMongo) {

  if (userObj.registeredStores.length === 0){return []}

  const currentUserSpyingStores = userObj.registeredStores
  const userQuery = currentUserSpyingStores.map(store => {
    return {
      storeLink: store.storeLink,
      date: { $in: store.spyDates }
    }
  })

  const storeDates = await getStoreDatesFromDatabase({ $or: userQuery })
  const computedStores = getComputedStoresFromStoreDates(storeDates)
  const filteredStores = computedStores
    .sort((a, b) => (a.totalRevenue > b.totalRevenue ? -1 : 1))
    .slice(0, Number(limit))
  const completeStores = await addStoreCompleteInfoToComputedStores(filteredStores)

  return completeStores
}
