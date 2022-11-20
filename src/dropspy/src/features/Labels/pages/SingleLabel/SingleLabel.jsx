import { useContext, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

import { populateSingleLabelProgressively } from '../../utils/populate-single-label-progressively'

import { LayoutContext } from '../../../Layout'
import { Loader } from '../../../../components/loader/Loader'
import { Container } from '../../../../components/container/Container'
import { FloatingButton } from '../../../../components/floating-button/FloatingButton'
import { FloatingContentStyled } from '../../../../components/floating-button/floating-button.styles'

import { addFieldsToProductObj, groupProductsByTier, ProductsByTierChart, ProductsByTierTable, ProductsChart, ProductsTable } from '../../../Products'

import { LabelCards } from './components/LabelCards'
import { OrderBySelect } from '../../../../components/orderBySelect/OrderBySelect'
import { LAYOUT_DEFAULT_SORTBY } from '../../../../configs/configs'
import { sortArrayByKey } from '../../../../utils/sort-array-by-key'
import { Tabs } from '../../../../components/tabs/Tabs'
import { AuthContext } from '../../../Authentication'

/* ========================================================================== */

const SingleLabel = () => {
  const { setIsLoading, setTitle } = useContext(LayoutContext)
  const { userInfo } = useContext(AuthContext)
  const [searchParams] = useSearchParams()
  const labelName = searchParams.get('label') || ''

  const [orderBy, setOrderBy] = useState(LAYOUT_DEFAULT_SORTBY);
  const [labelProducts, setLabelProducts] = useState([]);

  const products = labelProducts.length === 0 ? [] : sortArrayByKey(labelProducts.map(product => addFieldsToProductObj(product)), orderBy.value, orderBy.order)
  const tierProducts = labelProducts.length === 0 ? [] : sortArrayByKey(groupProductsByTier(labelProducts.map(products => addFieldsToProductObj(products))), orderBy.value, orderBy.order)

  useEffect(() => {

    setIsLoading(true)
    setTitle('Etiqueta')

    const iterationPopulateFn = (curData, aggregatedData) => {
      setLabelProducts([...aggregatedData]);
    }

    const endPopulateFn = (curData, aggregatedData) => {
      console.log("TERMINOOU!")
      setIsLoading(false)
    }

    populateSingleLabelProgressively(userInfo, labelName, iterationPopulateFn, endPopulateFn)

    return () => {
      setIsLoading(false)
    }

  }, []) // eslint-disable-line

  const tierProductsTabsNames = ["Gráfico de produtos por tier", "Tabela de produtos por tier"]
  const tierProductsTabsValues = [
    <ProductsByTierChart value={{ tierProducts, orderBy }} />,
    <ProductsByTierTable value={{ tierProducts }} />
  ]


  const productsTabsNames = ["Gráfico de produtos por tier", "Tabela de produtos por tier"]
  const productsTabsValues = [
    <ProductsChart value={{ products, maxItems: 15, orderBy }} />,
    <ProductsTable value={{ products, maxItems: 15 }} />
  ]

  return (

    <>
      {Object.keys(labelProducts).length === 0 ? (
        <Loader text="Carregando etiqueta" />
      ) : (
        <>

          <Container title={`Detalhes da etiqueta - ${labelName}`}>
            <LabelCards value={{ labelProducts, labelName }} />
          </Container>

          {tierProducts.length > 0 && (
            <Container>
              <Tabs value={{ tabs: tierProductsTabsNames, tabsContent: tierProductsTabsValues }} />
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

export { SingleLabel }
