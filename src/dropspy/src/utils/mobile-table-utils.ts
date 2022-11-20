interface ITableField {
  field: string,
  headerName: string,
  flex: number,
  renderCell?: any,
  sortComparator?: any,
  width?: any
}

function getWidthByFlex(flex: number, proportion: number): number{
  return Number(flex) * Number(proportion)
}

function convertTableFieldsToMobile(oldFieldsArr: any, proportion: number){

  if (!oldFieldsArr){return}

  const finalFields = oldFieldsArr.map((item: any) => {
    let newItem = {
      ...item,
      width: getWidthByFlex(item.flex, proportion)
    }
    delete newItem["flex"]
    return newItem
  })

  return finalFields
}

function getMobileTableVisibleFields(allFieldsArr: any, allowedFieldsArr: any, proportion: number){

  if (!allFieldsArr){return}

  const newColumns = allFieldsArr.filter((item: ITableField) => allowedFieldsArr.indexOf(item.field) > -1)
  return convertTableFieldsToMobile(newColumns, proportion)
}

export {
  convertTableFieldsToMobile,
  getMobileTableVisibleFields
}
