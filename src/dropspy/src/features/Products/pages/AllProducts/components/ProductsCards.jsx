import { Card, CardBox } from '../../../../../components/card/Card'

import {
  GENERAL_ICONS
} from '../../../../../utils/box-icons'

const {
  totalSalesIcon,
  totalProductsIcon,
  totalRevenueIcon
} = GENERAL_ICONS

const getProductsCardsObj = (oldProducts) => {

  const totalProducts = oldProducts.length
  const totalRevenue = Number(oldProducts.map(product => product.totalRevenue).reduce((pSum, a) => pSum + a, 0).toFixed(2))
  const totalSales = Number(oldProducts.map(product => product.totalSales).reduce((pSum, a) => pSum + a, 0))

  return {
    totalProducts: Intl.NumberFormat('pt-br').format(totalProducts),
    totalRevenue: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalRevenue),
    totalSales: Intl.NumberFormat('pt-br').format(totalSales)
  }
}

const ProductsCards = (props) => {

  const {
    totalProducts,
    totalRevenue,
    totalSales,
  } = getProductsCardsObj(props.value.products)

  return (

    <CardBox number={3}>
      <Card name="Produtos totais" number={totalProducts} icon={totalProductsIcon} />
      <Card name="Vendas totais" number={totalSales} icon={totalSalesIcon} />
      <Card name="Receita total" small={true} number={totalRevenue} icon={totalRevenueIcon} />
    </CardBox>

  )
}

export { ProductsCards }

