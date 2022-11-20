import { useState, useEffect, useContext } from "react";

import { LayoutContext } from "../../../Layout";
import { populateAllProductsProgressively } from "../../utils/populate-all-products-progressively";
import { groupProductsByTier } from "../../utils/group-products-by-tier";

import { getLabelsArrFromProducts, getNoLabeledProductsData, filterLabelsByType } from "../../../Labels";

import { Loader } from "../../../../components/loader/Loader";
import { Container } from "../../../../components/container/Container";
import { OrderBySelect } from "../../../../components/orderBySelect/OrderBySelect";

import { LabelsChart, LabelsTable } from "../../../Labels";

import { ProductsTable } from "./components/ProductsTable";
import { ProductsCards } from "./components/ProductsCards";
import { ProductsChart } from "./components/ProductsChart";
import { ProductsByTierChart } from "./components/ProductsByTierChart";
import { ProductsByTierTable } from "./components/ProductsByTierTable";
import { FloatingButton } from "../../../../components/floating-button/FloatingButton";
import { FloatingContentStyled } from "../../../../components/floating-button/floating-button.styles";
import { LAYOUT_DEFAULT_SORTBY } from "../../../../configs/configs";
import { sortArrayByKey } from "../../../../utils/sort-array-by-key";
import { Tabs } from "../../../../components/tabs/Tabs";
import { AuthContext } from "../../../Authentication";
import { addFieldsToProductObj } from "../../utils/add-fields-to-product";
import { NoDataToShow } from "../../../../components/no-data-to-show/NoDataToShow";

/* ========================================================================== */

const AllProducts = () => {

  const { userInfo } = useContext(AuthContext)
  const { setIsLoading, isLoading, setTitle } = useContext(LayoutContext)
  const [products, setProducts] = useState([]);
  const [orderBy, setOrderBy] = useState(LAYOUT_DEFAULT_SORTBY);

  const sortedProducts = products.length === 0 ? [] : sortArrayByKey(products, orderBy.value, orderBy.order)
  const labels = products.length === 0 ? [] : sortArrayByKey([...getLabelsArrFromProducts(products), getNoLabeledProductsData(products)], orderBy.value, orderBy.order)
  const productLabels = products.length === 0 ? [] : sortArrayByKey(filterLabelsByType(labels, 'product'), orderBy.value, orderBy.order)
  const tierProducts = products.length === 0 ? [] : groupProductsByTier(products)

  useEffect(() => {
    setIsLoading(true)
    setTitle('Produtos')

    const iterationPopulateFn = (curData, aggregatedData) => {
      setProducts([...aggregatedData].map(product => addFieldsToProductObj(product)))
    }

    const endPopulateFn = (curData, aggregatedData) => {
      setIsLoading(false)
    }

    populateAllProductsProgressively(userInfo, iterationPopulateFn, endPopulateFn)

    return () => {
      setIsLoading(false)
    }
  }, []) // eslint-disable-line

  const labelsTabsNames = ["Gráfico de etiquetas", "Tabela de etiquetas"]
  const labelsTabsValues = [
    <LabelsChart value={{ orderBy, labels: productLabels, maxItems: 15 }} />,
    <LabelsTable value={{ orderBy, labels: productLabels, maxItems: 15 }} />
  ]

  const tierTabsNames = ["Gráfico de tier", "Tabela de tier"]
  const tierTabsValues = [
    <ProductsByTierChart value={{ tierProducts, orderBy }} />,
    <ProductsByTierTable value={{ tierProducts }} />
  ]

  const productsTabsNames = ["Gráfico de produtos", "Tabela de produtos"]
  const productsTabsValues = [
    <ProductsChart value={{ products: sortedProducts, maxItems: 15, orderBy }} />,
    <ProductsTable value={{ products: sortedProducts, maxItems: 15 }} />
  ]

  return (
    <>
      <Container title="Dados gerais dos produtos">
        <ProductsCards value={{ products: sortedProducts }} />
      </Container>

      {products.length > 0 ? (
        <>
          <Container>
            <Tabs value={{ tabs: labelsTabsNames, tabsContent: labelsTabsValues }} />
          </Container>

          <Container>
            <Tabs value={{ tabs: tierTabsNames, tabsContent: tierTabsValues }} />
          </Container>

          <Container>
            <Tabs value={{ tabs: productsTabsNames, tabsContent: productsTabsValues }} />
          </Container>
        </>
      ) : (
        <>
          {isLoading ? (
            <Loader text="Carregando produtos" />
          ) : (
            <NoDataToShow title="Não há produtos para mostrar!" />
          )}
        </>
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

  )



};

export { AllProducts };
