import {
  IMPORT_MODULE,
  DATABASE_DATABASE_SPY,
  DATABASE_COLLECTION_SPY_STORES,
  DATABASE_COLLECTION_SPY_PRODUCTS,
  DATABASE_COLLECTION_USERS,
  DATABASE_COLLECTION_BOTS,
  DATABASE_COLLECTION_LABELS,
  DATABASE_COLLECTION_CATEGORIES,
  DATABASE_COLLECTION_STORES_BY_DATES
} from '../../../../configs/configs'

export default async function getAdminController(request, response) {

  const DBCLIENT = global['DBCLIENT']

  const db = await DBCLIENT.db(DATABASE_DATABASE_SPY)

  const adminInfo = await db.collection("admin").find({name: "options"}).toArray()
  const storesCount = await db.collection(DATABASE_COLLECTION_SPY_STORES).countDocuments({})
  const datesCount = await db.collection(DATABASE_COLLECTION_STORES_BY_DATES).distinct('date')
  const productsCount = await db.collection(DATABASE_COLLECTION_SPY_PRODUCTS).countDocuments({})
  const usersCount = await db.collection(DATABASE_COLLECTION_USERS).countDocuments({})
  const botsCount = await db.collection(DATABASE_COLLECTION_BOTS).countDocuments({})
  const categoriesCount = await db.collection(DATABASE_COLLECTION_CATEGORIES).countDocuments({})
  const labelsCount = await db.collection(DATABASE_COLLECTION_LABELS).countDocuments({})

  const findObj = {
    ...adminInfo[0],
    storesCount,
    productsCount,
    datesCount: Array.from(datesCount).length,
    usersCount,
    botsCount,
    categoriesCount,
    labelsCount
  }

  if (findObj) {
    response.json(findObj)
  } else {
    response.json({ error: "coundt find store object" })
  }

}
