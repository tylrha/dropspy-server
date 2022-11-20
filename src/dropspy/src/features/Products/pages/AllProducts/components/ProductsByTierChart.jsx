import { BarChart } from "../../../../../components/barChart/BarChart"

const ProductsByTierChart = (props) => {

  const { tierProducts, orderBy, maxItems } = props.value
  const getChartItemHeight = (displayedItems) => ((!maxItems || displayedItems < maxItems) ? Math.max(Number(displayedItems * 15), 500) : Number(displayedItems * 15)).toString()

  const shouldRenderAllStoresChart = !((tierProducts.length === 0) || (tierProducts[0][orderBy.value] === undefined))
  const labels = shouldRenderAllStoresChart ? tierProducts.map(product => product.tier) : []
  const values = shouldRenderAllStoresChart ? tierProducts.map(product => product[orderBy.value]) : []

  const tierProductsChartObj = {
    categoriesLabels: maxItems ? labels.slice(0, maxItems) : labels,
    categoriesValues: maxItems ? values.slice(0, maxItems) : values,
    height: getChartItemHeight(maxItems ? maxItems : tierProducts.length),
    isHorizontal: false,
    isCurrency: ["totalRevenue"].includes(orderBy.value) ? true : false
  }

  return (
    <BarChart value={tierProductsChartObj} />
  )

}

export {ProductsByTierChart}
