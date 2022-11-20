import { Request, Response } from 'express'

import { getProductsFromDatabase } from '../../../models/Product';
import { getStoresFromDatabase } from '../../../models/Store';
import { getStoreDatesFromDatabase } from '../../../models/StoreDate';
import { getUserInDatabase, IUserMongo } from '../../../models/User';
import addStoreCompleteInfoToComputedStores from '../../utils/add-complete-store-info-to-computed-stores';
import getComputedStoresFromStoreDates from '../../utils/get-computed-stores-from-store-dates';
import addCompleteProductInfoToComputedProducts from '../../utils/add-complete-product-info-to-computed-products';

export default async function getUserFavoritesController(req: Request, res: Response) {

  try {
    const { user_id } = req.query
    if (!user_id) { throw new Error('user id must be provided') }

    const userObj = await getUserInDatabase({ _id: user_id.toString() })
    if (!userObj) { throw new Error('user not found') }

    let finalResponse = {};

    if (userObj.userRole === 'admin') {
      finalResponse = await getAdminUserFavorites(userObj)
    } else if (userObj.userRole === 'user') {
      finalResponse = await getUserFavorites(userObj)
    } else {
      throw new Error("user role not permitted")
    }

    return res.json(finalResponse)

  } catch (e) {
    console.log(e)
    return res.json({ error: e.message });
  }
}

async function getAdminUserFavorites(userObj: IUserMongo) {

  const favoriteProducts = await getProductsFromDatabase({ productLink: { $in: userObj.favoriteProducts.map(product => product.productLink) } })
  const favoriteStores = await getStoresFromDatabase({ storeLink: { $in: userObj.favoriteStores.map(store => store.storeLink) } })

  return {
    favoriteProducts,
    favoriteStores
  }
}

async function getUserFavorites(userObj: IUserMongo) {

  return {
    favoriteStores: await getUserFavoriteStores(userObj),
    favoriteProducts: await getUserFavoriteProducts(userObj)
  }
}

async function getUserFavoriteStores(userObj: IUserMongo) {

  if (userObj.favoriteStores.length === 0){return []}

  const storeDatesQuery = userObj.favoriteStores.map(store => {
    const curStoreObj = userObj.registeredStores.find(str => str.storeLink === store.storeLink)
    if (curStoreObj) {
      return {
        storeLink: store.storeLink,
        date: { $in: curStoreObj.spyDates }
      }
    }
  }).filter(item => item !== undefined)

  const storeDates = await getStoreDatesFromDatabase({ $or: storeDatesQuery })
  const computedStores = getComputedStoresFromStoreDates(storeDates)
  const completeStores = await addStoreCompleteInfoToComputedStores(computedStores)

  return completeStores
}

async function getUserFavoriteProducts(userObj: IUserMongo) {

  if (userObj.favoriteProducts.length === 0){return []}

  const favoritProductsDocs = await getProductsFromDatabase({ productLink: { $in: userObj.favoriteProducts.map(product => product.productLink) } })
  const uniqueStoresFromProductsArr = [...new Set(favoritProductsDocs.map(product => product.storeLink))]

  const storeDatesQuery = uniqueStoresFromProductsArr.map(store => {
    const curStoreObj = userObj.registeredStores.find(str => str.storeLink === store)
    if (curStoreObj){
      return {
        storeLink: store,
        date: {$in: curStoreObj.spyDates}
      }
    }
  }).filter(item => item !== undefined)

  const storeDates = await getStoreDatesFromDatabase({ $or: storeDatesQuery })
  const computedStores = getComputedStoresFromStoreDates(storeDates)

  const allProductsFromStores = [].concat.apply([], [...computedStores.map(store => store.products)])
  const uniqueProductsFromStores = [...new Set(allProductsFromStores)]
  const favoriteOnlyProducts = uniqueProductsFromStores.filter((product: any) => userObj.favoriteProducts.map((prod: any) => prod.productLink).indexOf(product.productLink) > -1)
  const completeProducts = await addCompleteProductInfoToComputedProducts(favoriteOnlyProducts)

  return completeProducts

}
