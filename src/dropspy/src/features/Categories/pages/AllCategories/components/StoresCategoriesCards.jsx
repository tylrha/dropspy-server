import { Card, CardBox } from '../../../../../components/card/Card'

import {
  GENERAL_ICONS
} from '../../../../../utils/box-icons'

const {
  totalSalesIcon,
  totalProductsIcon,
  totalStoresIcon
} = GENERAL_ICONS

const getCategoriesCardsObj = (oldCategories) => {

  const totalCategories = oldCategories.length
  const totalStores = oldCategories.map(category => category.totalStores).reduce((pSum, a) => pSum + a, 0)
  const totalGenericsStores = oldCategories.filter(category => category.storeCategory?.toLowerCase() === 'genérica')[0]?.totalStores || 0
  const totalSpecificsStores = oldCategories.filter(category => category.storeCategory?.toLowerCase() !== 'genérica').map(category => category.totalStores).reduce((pSum, a) => pSum + a, 0)

  return {
    totalCategories,
    totalStores,
    totalGenericsStores,
    totalSpecificsStores
  }

}

const StoresCategoriesCards = (props) => {

  const {
    totalCategories,
    totalStores,
    totalGenericsStores,
    totalSpecificsStores
  } = getCategoriesCardsObj(props.value.storesByCategories)

  return (
    <CardBox number={4}>
      <Card name="Categorias totais" number={totalCategories} icon={totalProductsIcon} />
      <Card name="Lojas totais" number={totalStores} icon={totalProductsIcon} />
      <Card name="Lojas genéricas" number={totalGenericsStores} icon={totalStoresIcon} />
      <Card name="Lojas nichadas" number={totalSpecificsStores} icon={totalSalesIcon} />
    </CardBox>
  )
}

export { StoresCategoriesCards }

