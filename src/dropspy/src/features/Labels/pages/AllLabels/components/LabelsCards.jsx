import { Card, CardBox } from '../../../../../components/card/Card'

import {
  GENERAL_ICONS
} from '../../../../../utils/box-icons'

const {
  totalSalesIcon,
  totalProductsIcon,
  totalStoresIcon
} = GENERAL_ICONS

const getLabelsCardsObj = (oldLabels, oldProducts) => {

  const totalUsedLabels = Number(oldLabels.map(label => label.totalProducts).reduce((pSum, a) => pSum + a, 0))
  const labeledProducts = Number(oldProducts.filter(item => item.totalLabels !== 0).length)
  const noLabeledProducts = Number(oldProducts.filter(item => item.totalLabels === 0).length)
  const totalLabels = oldLabels.length

  return {
    totalUsedLabels: Intl.NumberFormat('pt-br').format(totalUsedLabels),
    labeledProducts: Intl.NumberFormat('pt-br').format(labeledProducts),
    noLabeledProducts: Intl.NumberFormat('pt-br').format(noLabeledProducts),
    totalLabels: Intl.NumberFormat('pt-br').format(totalLabels)
  }

}

const LabelsCards = (props) => {

  const {labels, products} = props.value

  const {
    labeledProducts,
    totalUsedLabels,
    noLabeledProducts,
    totalLabels
  } = getLabelsCardsObj(labels, products)

  return (

    <>
      <CardBox number={4}>
        <Card name="Etiquetas totais" number={totalLabels} icon={totalSalesIcon} />
        <Card name="Etiquetas usadas" number={totalUsedLabels} icon={totalProductsIcon} />
        <Card name="Produtos com etiquetas" number={labeledProducts} icon={totalProductsIcon} />
        <Card name="Produtos sem etiquetas" number={noLabeledProducts} icon={totalStoresIcon} />
      </CardBox>
    </>
  )
}

export { LabelsCards }
