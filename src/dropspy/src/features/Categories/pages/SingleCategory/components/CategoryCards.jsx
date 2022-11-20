import { Card, CardBox } from '../../../../../components/card/Card'

import {
  GENERAL_ICONS
} from '../../../../../utils/box-icons'

const {
  totalSalesIcon,
  totalProductsIcon,
  totalRevenueIcon,
  categoriesIcon
} = GENERAL_ICONS

const getStoreCardsObj = (curCategory) => {

  const totalRevenue = (curCategory.map(item => item.totalRevenue).reduce((pSum, a) => pSum + a, 0)).toFixed(2)
  const totalSales = curCategory.map(item => item.totalSales).reduce((pSum, a) => pSum + a, 0)
  const totalProducts = curCategory.map(item => item.totalProducts).reduce((pSum, a) => pSum + a, 0)
  const totalStores = curCategory.length

  return {
    totalRevenue: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalRevenue),
    totalSales: Intl.NumberFormat('pt-br').format(totalSales),
    totalProducts: Intl.NumberFormat('pt-br').format(totalProducts),
    totalStores: Intl.NumberFormat('pt-br').format(totalStores),
  }

}

const CategoryCards = (props) => {

  const {
    totalProducts,
    totalRevenue,
    totalSales,
    totalStores
  } = getStoreCardsObj(props.value.category)

  return (

    <CardBox number={4}>
      <Card name="Lojas totais" number={totalStores} icon={categoriesIcon} />
      <Card name="Produtos totais" number={totalProducts} icon={totalProductsIcon} />
      <Card name="Vendas totais" number={totalSales} icon={totalSalesIcon} />
      <Card name="Receita total" small={true} number={totalRevenue} icon={totalRevenueIcon} />
    </CardBox>

  )
}

export { CategoryCards }
