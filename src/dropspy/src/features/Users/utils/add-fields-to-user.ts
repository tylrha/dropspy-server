const addFieldsToUserObj = (item: any) => {
  return {
    id: item._id,
    ...item
  }
}

export {addFieldsToUserObj}
