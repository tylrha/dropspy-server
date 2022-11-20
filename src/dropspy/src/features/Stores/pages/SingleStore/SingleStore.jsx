import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { getStoreFromApi } from '../../services/get-single-store-from-api'
import { getDatesFromStore } from '../../utils/get-dates-from-store'
import { getProductsFromStore } from '../../utils/get-products-from-store'

import { LayoutContext } from '../../../../features/Layout'
import { Loader } from '../../../../components/loader/Loader'
import { Container } from '../../../../components/container/Container'

import { ProductsChart, ProductsTable } from '../../../Products'
import { DatesChart, DatesTable } from '../../../Dates'

import { StoreCards } from './components/StoreCards'
import { FloatingButton } from '../../../../components/floating-button/FloatingButton'
import { OrderBySelect } from '../../../../components/orderBySelect/OrderBySelect'
import { FloatingContentStyled } from '../../../../components/floating-button/floating-button.styles'
import { StoreIntro } from './components/StoreIntro'
import { LAYOUT_DEFAULT_SORTBY } from '../../../../configs/configs'
import { sortArrayByKey } from '../../../../utils/sort-array-by-key'
import { Tabs } from '../../../../components/tabs/Tabs'
import { AuthContext } from '../../../Authentication'

/* ========================================================================== */

const SingleStore = () => {

  const { setTitle } = useContext(LayoutContext)
  const { userId } = useContext(AuthContext)
  const [searchParams] = useSearchParams()
  const storeLink = searchParams.get('storeLink') || ''
  const [orderBy, setOrderBy] = useState(LAYOUT_DEFAULT_SORTBY);
  const [store, setStore] = useState({});

  const dates = Object.keys(store).length === 0 ? [] : getDatesFromStore(store)
  const products = Object.keys(store).length === 0 ? [] : sortArrayByKey(getProductsFromStore(store), orderBy.value, orderBy.order)

  useEffect(() => {
    setTitle('Loja')
    getStoreFromApi(userId, storeLink, (storeInfo) => {
      setStore(storeInfo);
    })

  }, [storeLink]); // eslint-disable-line

  const datesTabsNames = ["Gráfico de datas", "Tabela de datas"]
  const datesTabsValues = [
    <DatesChart value={{ dates, orderBy }} />,
    <DatesTable value={{ dates, maxItems: 15 }} />
  ]

  const productsTabsNames = ["Gráfico de produtos", "Tabela de produtos"]
  const productsTabsValues = [
    <ProductsChart value={{ products, maxItems: 15, orderBy }} />,
    <ProductsTable value={{ products, maxItems: 15 }} />
  ]

  return (

    <>
      {Object.keys(store).length === 0 ? (
        <Loader text="Carregando loja" />
      ) : (
        <>
          <Container title={`Detalhes da loja`}>
            <StoreIntro value={{ store, setStore }} />
            <StoreCards value={{ store }} />
          </Container>

          {dates.length > 0 && (
            <Container>
              <Tabs value={{ tabs: datesTabsNames, tabsContent: datesTabsValues }} />
            </Container>
          )}

          {products.length > 0 && (
            <Container>
              <Tabs value={{ tabs: productsTabsNames, tabsContent: productsTabsValues }} />
            </Container>
          )}

          <FloatingButton title="Opções">
            <FloatingContentStyled columns={1}>
              <div className="action__filters">
                <p>Filtros</p>
                <OrderBySelect value={{ orderBy, setOrderBy }} />
              </div>
            </FloatingContentStyled>

          </FloatingButton>

        </>
      )}
    </>
  )

}

export { SingleStore }
