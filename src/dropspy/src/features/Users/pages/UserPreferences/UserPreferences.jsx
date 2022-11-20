import { useContext, useEffect, useState } from 'react';

import { LAYOUT_DEFAULT_SORTBY } from '../../../../configs/configs';
import { sortArrayByKey } from '../../../../utils/sort-array-by-key';

import { AuthContext } from '../../../Authentication';
import { getUserFavoritesFromApi } from '../../services/get-user-favorites-from-api'
import { addFieldsToProductObj } from '../../../Products';
import { addFieldsToStoreObj } from '../../../Stores';
import { LayoutContext } from '../../../Layout'

import {
  Card, CardBox,
  Container,
  FloatingButton, FloatingContentStyled,
  Tabs
} from "../../../../components";

import { StoresTable } from '../../../Stores';
import { ProductsTable } from '../../../Products';
import { OrderBySelect } from '../../../../components/orderBySelect/OrderBySelect';
import { UserForm } from './components/UserForm';

const getStoresInfo = (oldStores) => {

  const totalStores = oldStores ? oldStores.length : 0
  const totalStoresRevenue = oldStores ? Number(oldStores.map(store => store.totalRevenue).reduce((pSum, a) => pSum + a, 0).toFixed(2)) : 0

  return {
    totalStores,
    totalStoresRevenue: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalStoresRevenue)
  }

}

const getProductsInfo = (oldProducts) => {

  const totalProducts = oldProducts ? oldProducts.length : 0
  const totalProductsRevenue = oldProducts ? Number(oldProducts.map(store => store.totalRevenue).reduce((pSum, a) => pSum + a, 0).toFixed(2)) : 0

  return {
    totalProducts,
    totalProductsRevenue: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(totalProductsRevenue)
  }

}

const UserPreferences = () => {

  const { setTitle } = useContext(LayoutContext)
  const { userId } = useContext(AuthContext)
  const [orderBy, setOrderBy] = useState(LAYOUT_DEFAULT_SORTBY);

  const [favoriteStoresData, setFavoriteStoresData] = useState([])
  const sortedFavoriteStores = favoriteStoresData.length === 0 ? [] : sortArrayByKey(favoriteStoresData, orderBy.value, orderBy.order)

  const [favoriteProductsData, setFavoriteProductsData] = useState([])
  const sortedFavoriteProducts = favoriteProductsData.length === 0 ? [] : sortArrayByKey(favoriteProductsData, orderBy.value, orderBy.order)

  useEffect(() => {
    setTitle('Preferências')
    getUserFavoritesFromApi(userId, (favoritesInfo) => {

      if (favoritesInfo.error) {
        console.log(`ERRO: ${favoritesInfo.error}`)
      } else {
        const { favoriteProducts, favoriteStores } = favoritesInfo
        setFavoriteStoresData(favoriteStores?.map(item => addFieldsToStoreObj(item)))
        setFavoriteProductsData(favoriteProducts?.map(item => addFieldsToProductObj(item)))
      }

    })

  }, []) // eslint-disable-line


  const FavoriteStoresContainer = () => (
    <Container>
      <CardBox number={2}>
        <Card name="Total de lojas" number={getStoresInfo(sortedFavoriteStores).totalStores} icon="bx bx-layer" />
        <Card name="Receita de lojas" small={true} number={getStoresInfo(sortedFavoriteStores).totalStoresRevenue} icon="bx bx-layer" />
      </CardBox>
      <StoresTable value={{ stores: sortedFavoriteStores }} />
    </Container>
  )

  const FavoriteProductsContainer = () => (
    <Container>
      <CardBox number={2}>
        <Card name="Total de produtos" number={getProductsInfo(sortedFavoriteProducts).totalProducts} icon="bx bx-layer" />
        <Card name="Receita de produtos" small={true} number={getProductsInfo(sortedFavoriteProducts).totalProductsRevenue} icon="bx bx-layer" />
      </CardBox>
      <ProductsTable value={{ products: sortedFavoriteProducts }} />
    </Container>
  )

  const favoriteTabsNames = ["Usuário", "Produtos favoritos", "Lojas favoritas"]
  const favoriteTabsValues = [
    <UserForm />,
    <FavoriteProductsContainer />,
    <FavoriteStoresContainer />
  ]

  return (
    <>
      <Container>
        <Tabs value={{ tabs: favoriteTabsNames, tabsContent: favoriteTabsValues }} />
      </Container>

      <FloatingButton title="Opções">
        <FloatingContentStyled columns={1}>
          <div className="action__filters">
            <p>Filtros</p>
            <OrderBySelect value={{ orderBy, setOrderBy }} />
          </div>
        </FloatingContentStyled>
      </FloatingButton>
    </>
  )

};

export { UserPreferences };
