import { Card, CardBox } from '../../../../../components/card/Card'

import {
  GENERAL_ICONS
} from '../../../../../utils/box-icons'

const {
  totalSalesIcon,
  totalDatesIcon,
  totalRevenueIcon,
  labelsIcon
} = GENERAL_ICONS

const getProductCardsObj = (curProduct) => {

  return {
    totalDates: Intl.NumberFormat('pt-br').format(curProduct.totalDates),
    totalLabels: Intl.NumberFormat('pt-br').format(curProduct.totalLabels),
    totalSales: Intl.NumberFormat('pt-br').format(curProduct.totalSales),
    totalRevenue: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(curProduct.totalRevenue)
  }

}

const ProductCards = (props) => {

  const {
    totalDates,
    totalRevenue,
    totalSales,
    totalLabels,
  } = getProductCardsObj(props.value.product)

  return (

    <CardBox number={4}>
      <Card name="Datas totais" number={totalDates} icon={totalDatesIcon} />
      <Card name="Etiquetas totais" number={totalLabels} icon={labelsIcon} />
      <Card name="Vendas totais" number={totalSales} icon={totalSalesIcon} />
      <Card name="Receita total" small={true} number={totalRevenue} icon={totalRevenueIcon} />
    </CardBox>

  )
}

export { ProductCards }

