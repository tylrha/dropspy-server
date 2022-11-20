import { BarChart } from "../../../../../components/barChart/BarChart"
import { NoDataToShow } from "../../../../../components/no-data-to-show/NoDataToShow"

const ProductsChart = (props) => {

  const { products, orderBy, maxItems } = props.value
  const getChartItemHeight = (displayedItems) => ((!maxItems || displayedItems <= maxItems) ? Math.max(Number(displayedItems * 15), 500) : Number(displayedItems * 15)).toString()

  const shouldRenderAllStoresChart = !((products.length === 0) || (products[0][orderBy.value] === undefined))
  const labels = shouldRenderAllStoresChart ? products.map(store => store.productName) : []
  const values = shouldRenderAllStoresChart ? products.map(store => store[orderBy.value]) : []

  const productsChartObj = {
    categoriesLabels: maxItems ? labels.slice(0, maxItems) : labels,
    categoriesValues: maxItems ? values.slice(0, maxItems) : values,
    height: getChartItemHeight(maxItems ? maxItems : products.length),
    isHorizontal: true,
    isCurrency: ["totalRevenue"].includes(orderBy.value) ? true : false,
  }

  return (
    <>
      {products.length === 0 ? (
        <NoDataToShow title="Não há produtos a serem mostrados!" />
      ) : (
        <>
          <BarChart value={productsChartObj} />
        </>
      )}
    </>
  )

}

export { ProductsChart }
