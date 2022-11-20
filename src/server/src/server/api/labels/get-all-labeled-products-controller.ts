import { Request, Response } from 'express'

import checkQueriesErros from '../../components/query-validation'
import { getProductsFromDatabase } from '../../../models/Product'
import { getStoreDatesFromDatabase } from '../../../models/StoreDate'
import { getUserInDatabase, IUserMongo } from '../../../models/User'
import getUniqueProductsFromStoreDates from '../../utils/get-unique-products-from-store-dates'

export default async function getAllLabeledProductsController(request: Request, response: Response) {

  try{

    const { skip, limit, label, user_id } = request.query
    if (checkQueriesErros({ label, user_id }, response) === true) { return }

    const userObj = await getUserInDatabase({ _id: user_id})
    if (userObj === null){throw new Error("user not found")}

    let finalLabelProducts = []
    if (userObj.userRole === 'admin'){
      finalLabelProducts = await getAdminLabelProducts(label.toString(), limit ? Number(limit) : undefined, skip ? Number(skip) : undefined)
    } else if (userObj.userRole === 'user'){
      finalLabelProducts = await getUserLabelProducts(label.toString(), limit ? Number(limit) : undefined, skip ? Number(skip) : undefined, userObj)
    } else {
      throw new Error('user role not found')
    }

    response.json(finalLabelProducts)

  } catch(e){
    response.json({ error: e.message})
  }
}

async function getAdminLabelProducts(label: string, limit: number, skip: number){

  const queryObj = label === 'no-label' ? {totalLabels: 0} : {labels: { $elemMatch: {name: label}}}

  let productsArr = [];

  if (limit && !skip){
    productsArr = await getProductsFromDatabase(queryObj, limit)
  } else if (limit && skip){
    productsArr = await getProductsFromDatabase(queryObj, limit, skip)
  } else {
    productsArr = await getProductsFromDatabase(queryObj)
  }

  return productsArr
}

async function getUserLabelProducts(label: string, limit: number, skip: number, userObj: IUserMongo){

  const queryObj = label === 'no-label' ? {totalLabels: 0} : {labels: { $elemMatch: {name: label}}}
  const labeledProducts = await getProductsFromDatabase(queryObj)
  const productLinkArr = labeledProducts.map(product => product.productLink)
  const storeLinkArr = [...new Set(labeledProducts.map(product => product.storeLink))]

  const onlyUserLabeledStores = userObj.registeredStores.filter(store => storeLinkArr.indexOf(store.storeLink) > -1)
  if (onlyUserLabeledStores.length === 0){return []}

  const storeDatesQuery = onlyUserLabeledStores.map(store => ({ storeLink: store.storeLink, date: { $in: store.spyDates }}))
  const storeDates = await getStoreDatesFromDatabase({$or: storeDatesQuery})
  const productsFromStoreDates = getUniqueProductsFromStoreDates(storeDates)

  const onlyLabeledProducts = productsFromStoreDates.filter(product => productLinkArr.findIndex((pdt: any) => pdt === product.productLink) > -1)
  const finalProductsArr = onlyLabeledProducts.map(product => {
    const completeProductObj = labeledProducts.find(pdt => pdt.productLink === product.productLink)
    return {
      ...product,
      productImage: completeProductObj.productImage,
      productPrice: completeProductObj.productPrice,
      storeName: completeProductObj.storeName,
      storeLink: completeProductObj.storeLink,
      totalLabels: completeProductObj.totalLabels,
      labels: completeProductObj.labels,
    }
  })

  return finalProductsArr
}
