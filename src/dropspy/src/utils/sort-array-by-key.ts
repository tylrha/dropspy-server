const sortArrayByKey = (array: any, key: any, order: string) => {
  if (!array){return array}
  const hasKey = array[0]?.hasOwnProperty(key)
  const [indexA, indexB] = order === "descendent" ? [-1, 1] : [1, -1]
  return hasKey ? [...array]?.sort((a, b) => (a[key] > b[key] ? indexA : indexB)) : []
}

export {sortArrayByKey}
