import { Card, CardBox } from '../../../../../components/card/Card'

import { getSalesTier } from '../../../../../utils/get-sales-tier'

import {
  GENERAL_ICONS
} from '../../../../../utils/box-icons'

const {
  totalSalesIcon,
  totalProductsIcon,
  totalRevenueIcon,
  categoriesIcon
} = GENERAL_ICONS

const getStoreCardsObj = (curStore) => {

  const totalRevenue = curStore.totalRevenue
  const totalSales = curStore.totalSales
  const totalProducts = curStore.totalProducts

  return {
    totalRevenue: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalRevenue),
    totalSales: Intl.NumberFormat('pt-br').format(totalSales),
    totalProducts: Intl.NumberFormat('pt-br').format(totalProducts),
    storeTier: getSalesTier(curStore.totalRevenue, curStore.totalDates)
  }

}

const StoreCards = (props) => {

  const {
    totalProducts,
    totalRevenue,
    totalSales,
    storeTier
  } = getStoreCardsObj(props.value.store)

  return (
    <CardBox number={4}>
      <Card name="Tier" number={storeTier} icon={categoriesIcon} />
      <Card name="Vendas totais" number={totalSales} icon={totalSalesIcon} />
      <Card name="Produtos totais" number={totalProducts} icon={totalProductsIcon} />
      <Card name="Receita total" small={true} number={totalRevenue} icon={totalRevenueIcon} />
    </CardBox>
  )
}

export { StoreCards }

