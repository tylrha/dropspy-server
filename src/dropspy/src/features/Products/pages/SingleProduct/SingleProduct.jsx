import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { getProductFromApi } from '../../services/get-single-products-from-api'
import { getDatesFromProduct } from '../../utils/get-dates-from-product'

import { Container } from '../../../../components/container/Container'
import { Loader } from '../../../../components/loader/Loader'
import { LayoutContext } from '../../../../features/Layout'

import { DatesChart, DatesTable } from '../../../Dates'

import { ProductCards } from './components/ProductCards'
import { ProductIntro } from './components/ProductIntro'
import { OrderBySelect } from '../../../../components/orderBySelect/OrderBySelect'
import { FloatingButton } from '../../../../components/floating-button/FloatingButton'
import { FloatingContentStyled } from '../../../../components/floating-button/floating-button.styles'
import { LAYOUT_DEFAULT_SORTBY } from '../../../../configs/configs'
import { Tabs } from '../../../../components/tabs/Tabs'
import { AuthContext } from '../../../Authentication'

/* ========================================================================== */

const SingleProduct = () => {
  const { setTitle } = useContext(LayoutContext)
  const { userId } = useContext(AuthContext)
  const [searchParams] = useSearchParams()
  const productQuery = searchParams.get('productLink') || ''

  const [orderBy, setOrderBy] = useState(LAYOUT_DEFAULT_SORTBY);
  const [product, setProduct] = useState({});

  const dates = Object.keys(product).length === 0 ? [] : getDatesFromProduct(product)

  useEffect(() => {
    setTitle('Produto')
    getProductFromApi(userId, productQuery, (curProductObj) => {
      setProduct(curProductObj);
    })
  }, []); // eslint-disable-line


  const datesTabsNames = ["Gráfico de datas", "Tabela de datas"]
  const datesTabsValues = [
    <DatesChart value={{ dates, orderBy }} />,
    <DatesTable value={{ dates }} />
  ]


  return (

    <>
      {Object.keys(product).length === 0 ? (
        <Loader text="Carregando produto" />
      ) : (
        <>

          <Container title={`Detalhes do produto`}>
            <ProductIntro value={{ product }} />
            <ProductCards value={{ product }} />
          </Container>

          {dates.length > 0 && (
            <Container>
              <Tabs value={{ tabs: datesTabsNames, tabsContent: datesTabsValues }} />
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

export { SingleProduct }
