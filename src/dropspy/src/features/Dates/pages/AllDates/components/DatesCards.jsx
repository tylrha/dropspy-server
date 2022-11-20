import { Card, CardBox } from '../../../../../components/card/Card'

import {
  GENERAL_ICONS
} from '../../../../../utils/box-icons'

const {
  totalDatesIcon,
  totalSalesIcon,
  totalRevenueIcon
} = GENERAL_ICONS

const getDatesCardsObj = (oldDates) => {

  const totalDates = oldDates.length
  const totalRevenue = Number(oldDates.map(date => date.totalRevenue).reduce((pSum, a) => pSum + a, 0).toFixed(2))
  const totalSales = Number(oldDates.map(date => date.totalSales).reduce((pSum, a) => pSum + a, 0))

  return {
    totalDates: Intl.NumberFormat('pt-br').format(totalDates),
    totalRevenue: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalRevenue),
    totalSales: Intl.NumberFormat('pt-br').format(totalSales),
  }
}

const DatesCards = (props) => {

  const {
    totalDates,
    totalRevenue,
    totalSales,
  } = getDatesCardsObj(props.value.dates)

  return (

    <CardBox number={3}>
      <Card name="Datas totais" number={totalDates} icon={totalDatesIcon} />
      <Card name="Vendas totais" number={totalSales} icon={totalSalesIcon} />
      <Card name="Receita total" small={true} number={totalRevenue} icon={totalRevenueIcon} />
    </CardBox>

  )
}

export {DatesCards}

