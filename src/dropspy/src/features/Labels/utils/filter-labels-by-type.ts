const filterLabelsByType = (oldLabels: any, type: any) => {

  const filteredArr = Array.from([...oldLabels]).filter(item => ((item.type === type) || (item.type === "no-label")))
  const ordenaded = filteredArr.sort((a, b) => (a.totalRevenue < b.totalRevenue ? 1 : -1))
  return ordenaded

}

export {filterLabelsByType}
