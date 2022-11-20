import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { getSingleDateFromApi } from '../../services/get-single-date-from-api'

import { LayoutContext } from '../../../../features/Layout'
import { Loader } from '../../../../components/loader/Loader'
import { Container } from '../../../../components/container/Container'

import { addFieldsToProductObj, ProductsChart, ProductsTable } from '../../../Products'
import { addFieldsToStoreObj, StoresChart, StoresTable } from '../../../Stores'

import { DateCards } from './components/DateCards'
import { FloatingButton } from '../../../../components/floating-button/FloatingButton'
import { OrderBySelect } from '../../../../components/orderBySelect/OrderBySelect'
import { FloatingContentStyled } from '../../../../components/floating-button/floating-button.styles'
import { LAYOUT_DEFAULT_SORTBY } from '../../../../configs/configs'
import { Tabs } from '../../../../components/tabs/Tabs'
import { AuthContext } from '../../../Authentication'
import { sortArrayByKey } from '../../../../utils/sort-array-by-key'

/* ========================================================================== */

const SingleDate = () => {

  const { userId } = useContext(AuthContext)
  const { setTitle } = useContext(LayoutContext)

  const [searchParams] = useSearchParams()
  const dateQuery = searchParams.get('date') || ''

  const [orderBy, setOrderBy] = useState(LAYOUT_DEFAULT_SORTBY);
  const [date, setDate] = useState({});

  const stores = Object.keys(date).length === 0 ? [] : sortArrayByKey(date.stores.map(str => addFieldsToStoreObj(str)), orderBy.value, orderBy.order)
  const products = Object.keys(date).length === 0 ? [] : sortArrayByKey(date.products.map(pdt => addFieldsToProductObj(pdt)), orderBy.value, orderBy.order)

  useEffect(() => {

    setTitle('Data')

    getSingleDateFromApi(userId, dateQuery, (dateObj) => {
      setDate(dateObj);
    })

  }, [dateQuery]) // eslint-disable-line

  const storesTabsNames = ["Gráfico de lojas", "Tabela de lojas"]
  const storesTabsValues = [
    <StoresChart value={{ stores, maxItems: 15, orderBy }} />,
    <StoresTable value={{ stores, maxItems: 15 }} />
  ]

  const productsTabsNames = ["Gráfico de produtos", "Tabela de produtos"]
  const productsTabsValues = [
    <ProductsChart value={{ products, maxItems: 15, orderBy }} />,
    <ProductsTable value={{ products, maxItems: 15 }} />
  ]

  return (

    <>
      {Object.keys(date).length === 0 ? (
        <Loader text="Carregando data" />
      ) : (
        <>

          <Container title={`Detalhes da data - ${date.date}`}>
            <DateCards value={{ date }} />
          </Container>

          {stores.length > 0 && (
            <Container>
              <Tabs value={{ tabs: storesTabsNames, tabsContent: storesTabsValues }} />
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

export { SingleDate }
