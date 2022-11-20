import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import styled from 'styled-components'

import { getAllCategoriesFromApi } from "../../services/get-all-categories-from-api";
import { addFieldsToCategoryObj } from "../../utils/add-fields-to-category-object";
import { addFieldsToStoreObj, groupStoresByCategory, groupStoresByTier, populateAllStoresProgressively, StoresByTierChart, StoresByTierTable, StoresChart, StoresTable } from '../../../Stores'

import { LayoutContext } from '../../../../features/Layout'
import { Loader } from "../../../../components/loader/Loader";
import { Container } from "../../../../components/container/Container";

import { CategoryCards } from "./components/CategoryCards";
import { OrderBySelect } from "../../../../components/orderBySelect/OrderBySelect";
import { getCategoryProductsFromApi } from "../../services/get-category-products-from-api";
import { addFieldsToProductObj, groupProductsByTier, ProductsByTierChart, ProductsByTierTable, ProductsChart, ProductsTable } from "../../../Products";
import { FloatingContentStyled } from "../../../../components/floating-button/floating-button.styles";
import { FloatingButton } from "../../../../components/floating-button/FloatingButton";
import { LAYOUT_DEFAULT_SORTBY } from "../../../../configs/configs";
import { sortArrayByKey } from "../../../../utils/sort-array-by-key";
import { Tabs } from "../../../../components/tabs/Tabs";
import { AuthContext } from "../../../Authentication";

/* ========================================================================== */

const CategoryStyled = styled.div`
  text-align: center;
  color: red;
  margin-bottom: 15px;
`

const SingleCategory = () => {


  const { userInfo } = useContext(AuthContext)
  const { setIsLoading, setTitle } = useContext(LayoutContext)
  const [orderBy, setOrderBy] = useState(LAYOUT_DEFAULT_SORTBY); // eslint-disable-line

  const [searchParams] = useSearchParams()
  const categoryQuery = searchParams.get('category') || ''

  const [stores, setStores] = useState([]); // eslint-disable-line
  const [products, setProducts] = useState([])
  const [storesByCategories, setStoresByCategories] = useState([]);

  const category = stores.length === 0 ? [] : sortArrayByKey(stores.map(item => addFieldsToStoreObj(item)).filter(item => item.storeCategory.toLowerCase() === categoryQuery.toLocaleLowerCase()), orderBy.value, orderBy.order)
  const tierStores = category.length === 0 ? [] : sortArrayByKey(groupStoresByTier(category), "tier", "ascendent")
  const tierProducts = products.length === 0 ? [] : sortArrayByKey(groupProductsByTier(products), "tier", "ascendent")
  const sortedProducts = products.length === 0 ? [] : sortArrayByKey(products, orderBy.value, orderBy.order)

  useEffect(() => {
    setIsLoading(true)
    setTitle('Categoria')

    const iterationPopulateFn = (curData, aggregatedData) => {
      setStores([...aggregatedData])
      setStoresByCategories([...groupStoresByCategory(aggregatedData)])
    }

    const endPopulateFn = (curData, aggregatedData) => {

      getAllCategoriesFromApi((allCategoriesData) => {
        setStoresByCategories((oldCategories) => [...oldCategories, ...[...allCategoriesData].filter((newLabel) => oldCategories.findIndex(item => item.storeCategory.toLowerCase() === newLabel.name.toLowerCase()) === -1).map(item => addFieldsToCategoryObj(item))])

        getCategoryProductsFromApi(categoryQuery, userInfo._id, (data) => {
          setIsLoading(false)
          setProducts(data.map(item => addFieldsToProductObj(item)))
        })
      })

    }

    populateAllStoresProgressively(userInfo, iterationPopulateFn, endPopulateFn)

    return () => {
      console.log("UNRENDERED ALLALBELS!")
      setIsLoading(false)
    }
  }, []) // eslint-disable-line


  const tierTabsNames = ["Gráfico de lojas por tier", "Tabela de lojas tier"]
  const tierTabsValues = [
    <StoresByTierChart value={{ tierStores, orderBy }} />,
    <StoresByTierTable value={{ tierStores, maxItems: 15 }} />
  ]

  const storesTabsNames = ["Gráfico de lojas", "Tabela de lojas"]
  const storesTabsValues = [
    <StoresChart value={{ stores: category, maxItems: 15, orderBy }} />,
    <StoresTable value={{ stores: category, maxItems: 15 }} />
  ]

  const tierProductsTabsNames = ["Gráfico de produtos por tier", "Tabela de produtos por tier"]
  const tierProductsTabsValues = [
    <ProductsByTierChart value={{ tierProducts, maxItems: 15, orderBy }} />,
    <ProductsByTierTable value={{ tierProducts, maxItems: 15 }} />
  ]

  const productsTabsNames = ["Gráfico de produtos", "Tabela de produtos"]
  const productsTabsValues = [
    <ProductsChart value={{ products: sortedProducts, maxItems: 15, orderBy }} />,
    <ProductsTable value={{ products: sortedProducts, maxItems: 15 }} />
  ]


  return (

    <>
      {storesByCategories.length === 0 ? (
        <Loader text="Carregando categoria" />
      ) : (
        <>
          <Container>
            <CategoryStyled>{categoryQuery}</CategoryStyled>
            <CategoryCards value={{ category }} />
          </Container>

          {tierStores.length > 0 && (
            <Container>
              <Tabs value={{ tabs: tierTabsNames, tabsContent: tierTabsValues }} />
            </Container>
          )}

          {category.length > 0 && (
            <Container>
              <Tabs value={{ tabs: storesTabsNames, tabsContent: storesTabsValues }} />
            </Container>
          )}

          {products.length > 0 && (

            <>
              <Container>
                <Tabs value={{ tabs: tierProductsTabsNames, tabsContent: tierProductsTabsValues }} />
              </Container>

              <Container>
                <Tabs value={{ tabs: productsTabsNames, tabsContent: productsTabsValues }} />
              </Container>
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
      )}
    </>
  )

};

export { SingleCategory }
