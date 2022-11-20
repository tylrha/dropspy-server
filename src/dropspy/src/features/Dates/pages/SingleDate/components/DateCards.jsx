import { Card, CardBox } from '../../../../../components/card/Card'

import {
  GENERAL_ICONS
} from '../../../../../utils/box-icons'

const {
  totalStoresIcon,
  totalSalesIcon,
  totalProductsIcon,
  totalRevenueIcon
} = GENERAL_ICONS

const getDateCardsObj = (curDate) => {

  return {
    totalRevenue: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(curDate.totalRevenue),
    totalSales: Intl.NumberFormat('pt-br').format(curDate.totalSales),
    totalProducts: Intl.NumberFormat('pt-br').format(curDate.totalProducts),
    totalDates: Intl.NumberFormat('pt-br').format(curDate.totalDates),
    totalStores: Intl.NumberFormat('pt-br').format(curDate.totalStores),
  }

}

const DateCards = (props) => {

  const {
    totalProducts,
    totalRevenue,
    totalSales,
    totalStores
  } = getDateCardsObj(props.value.date)

  return (

    <CardBox number={4}>
      <Card name="Lojas totais" number={totalStores} icon={totalStoresIcon} />
      <Card name="Produtos totais" number={totalProducts} icon={totalProductsIcon} />
      <Card name="Vendas totais" number={totalSales} icon={totalSalesIcon} />
      <Card name="Receita total" small={true} number={totalRevenue} icon={totalRevenueIcon} />
    </CardBox>

  )
}

export { DateCards }

