const addFieldsToLabelObj = (item: any) => {

  return {
    ...item,
    id: item.name,
    totalProducts: 0,
    totalRevenue: 0,
    totalSales: 0
  }

}

export {addFieldsToLabelObj}
