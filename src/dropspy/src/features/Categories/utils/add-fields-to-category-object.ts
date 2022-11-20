const addFieldsToCategoryObj = (categoryObj: any) => {

  let newCategory = {
    ...categoryObj,
    id: categoryObj.name,
    storeCategory: categoryObj.name,
    totalRevenue: 0,
    totalProducts: 0,
    totalSales: 0,
    totalStores: 0
  }

  delete newCategory['_id']
  delete newCategory['name']

  return newCategory
}

export {addFieldsToCategoryObj}
