import { Card, CardBox } from '../../../../../components/card/Card'

import {
  GENERAL_ICONS
} from '../../../../../utils/box-icons'

const {
  totalSalesIcon,
  totalProductsIcon,
  totalRevenueIcon,
  totalStoresIcon
} = GENERAL_ICONS

const getLabelCardsObj = (curLabelProductsArr) => {

  return {
    totalRevenue: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(Number(curLabelProductsArr.map(product => product.totalRevenue).reduce((pSum, a) => pSum + a, 0)).toFixed(2)),
    totalSales: Intl.NumberFormat('pt-br').format(Number(curLabelProductsArr.map(product => product.totalSales).reduce((pSum, a) => pSum + a, 0))),
    totalStores: Intl.NumberFormat('pt-br').format([...new Set(curLabelProductsArr.map(product => product.storeLink))].length),
    totalProducts: Intl.NumberFormat('pt-br').format(curLabelProductsArr.length)
  }

}

const LabelCards = (props) => {

  const {
    labelProducts
  } = props.value

  const {
    totalProducts,
    totalRevenue,
    totalSales,
    totalStores,
  } = getLabelCardsObj(labelProducts)

  return (

    <CardBox number={4}>
      <Card name="Lojas totais" number={totalStores} icon={totalStoresIcon} />
      <Card name="Produtos totais" number={totalProducts} icon={totalProductsIcon} />
      <Card name="Vendas totais" number={totalSales} icon={totalSalesIcon} />
      <Card name="Receita total" small={true} number={totalRevenue} icon={totalRevenueIcon} />
    </CardBox>

  )
}

export { LabelCards }

