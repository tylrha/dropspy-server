import { Card, CardBox } from '../../../../../components/card/Card'

import {
  GENERAL_ICONS
} from '../../../../../utils/box-icons'

const {
  totalSalesIcon,
  totalRevenueIcon,
  totalStoresIcon
} = GENERAL_ICONS

const getStoresCardsObj = (oldStores) => {

  const totalStores = oldStores.length
  const totalRevenue = Number(oldStores.map(store => store.totalRevenue).reduce((pSum, a) => pSum + a, 0).toFixed(2))
  const totalSales = Number(oldStores.map(store => store.totalSales).reduce((pSum, a) => pSum + a, 0))

  return {
    totalStores: Intl.NumberFormat('pt-br').format(totalStores),
    totalRevenue: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalRevenue),
    totalSales: Intl.NumberFormat('pt-br').format(totalSales),
  }
}

const StoresCards = (props) => {

  const {
    totalStores,
    totalRevenue,
    totalSales,
  } = getStoresCardsObj(props.value.stores)

  return (

    <CardBox number={3}>
      <Card name="Lojas totais" number={totalStores} icon={totalStoresIcon} />
      <Card name="Vendas totais" number={totalSales} icon={totalSalesIcon} />
      <Card name="Receita total" small={true} number={totalRevenue} icon={totalRevenueIcon} />
    </CardBox>

  )
}

export {StoresCards}

