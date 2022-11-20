import { useState, useEffect, useContext } from "react";

import { LayoutContext } from "../../../../features/Layout/context/LayoutContext";
import { groupStoresByTier } from "../../utils/group-stores-by-tier";
import { groupStoresByCategory } from "../../utils/group-stores-by-category";
import { populateAllStoresProgressively } from "../../utils/populate-stores-progressively";

import { Loader } from "../../../../components/loader/Loader";
import { Container } from "../../../../components/container/Container";
import { FloatingButton } from './../../../../components/floating-button/FloatingButton';
import { OrderBySelect } from "../../../../components/orderBySelect/OrderBySelect";

import { StoresCategoriesChart, StoresCategoriesTable } from "../../../Categories";

import { StoresTable } from "./components/StoresTable";
import { StoresChart } from "./components/StoresChart";
import { StoresCards } from "./components/StoresCards";
import { StoresByTierChart } from "./components/StoresByTierChart";
import { StoresByTierTable } from "./components/StoresByTierTable";
import { FloatingContentStyled } from "../../../../components/floating-button/floating-button.styles";
import { LAYOUT_DEFAULT_SORTBY } from "../../../../configs/configs";
import { sortArrayByKey } from "../../../../utils/sort-array-by-key";
import { Tabs } from "../../../../components/tabs/Tabs";
import { addFieldsToStoreObj } from "../../utils/add-fields-to-store-obj";
import { AuthContext } from "../../../Authentication";
import { StoresButtons } from "./components/StoresButtons";
import { addFieldsToCategoryObj, getAllCategoriesFromApi } from '../../../Categories/'
import { NoDataToShow } from "../../../../components/no-data-to-show/NoDataToShow";

/* ========================================================================== */

const AllStores = () => {

  const { userInfo } = useContext(AuthContext)

  const { isLoading, setIsLoading, setTitle } = useContext(LayoutContext)
  const [orderBy, setOrderBy] = useState(LAYOUT_DEFAULT_SORTBY);
  const [stores, setStores] = useState([]);
  const [categories, setCategories] = useState([])

  const sortedStores = stores.length === 0 ? [] : sortArrayByKey(stores, orderBy.value, orderBy.order)
  const tierStores = stores.length === 0 ? [] : sortArrayByKey(groupStoresByTier(stores), "tier", "ascendent")
  const storesByCategories = stores.length === 0 ? [] : sortArrayByKey(groupStoresByCategory(stores), orderBy.value, orderBy.order)

  useEffect(() => {

    setIsLoading(true)
    setTitle('Lojas')

    getAllCategoriesFromApi((data) => { setCategories(data.map(category => addFieldsToCategoryObj(category))) })

    const iterationPopulateFn = (curData, aggregatedData) => { setStores([...aggregatedData].map(store => addFieldsToStoreObj(store))) }
    const endPopulateFn = (curData, aggregatedData) => {
      setIsLoading(false)
    }

    populateAllStoresProgressively(userInfo, iterationPopulateFn, endPopulateFn)
    return () => { setIsLoading(false) }

  }, []) // eslint-disable-line

  const categoriesTabsNames = ["Gráfico de categorias", "Tabela de categorias"]
  const categoriesTabsValues = [
    <StoresCategoriesChart value={{ storesByCategories, orderBy }} />,
    <StoresCategoriesTable value={{ storesByCategories, maxItems: 30 }} />
  ]

  const tierTabsNames = ["Gráfico de tier", "Tabela de tier"]
  const tierTabsValues = [
    <StoresByTierChart value={{ tierStores, orderBy }} />,
    <StoresByTierTable value={{ tierStores }} />
  ]

  const storesTabsNames = ["Gráfico de lojas", "Tabela de lojas"]
  const storesTabsValues = [
    <StoresChart value={{ stores: sortedStores, maxItems: 30, orderBy }} />,
    <StoresTable value={{ stores: sortedStores, setStores, maxItems: 30 }} />
  ]

  return (
    <>

      <Container title="Todas as lojas">
        <StoresCards value={{ stores }} />
      </Container>

      {stores.length > 0 ? (
        <>
          {storesByCategories.length > 0 && (
            <Container>
              <Tabs value={{ tabs: categoriesTabsNames, tabsContent: categoriesTabsValues }} />
            </Container>
          )}

          {tierStores.length > 0 && (
            <Container>
              <Tabs value={{ tabs: tierTabsNames, tabsContent: tierTabsValues }} />
            </Container>
          )}

          <Container>
            <Tabs value={{ tabs: storesTabsNames, tabsContent: storesTabsValues }} />
          </Container>
        </>
      ) : (
        <>
          {isLoading ? (
            <Loader text="Carregando lojas" />
          ) : (
            <NoDataToShow title="Não há lojas para mostrar!" />
          )}
        </>
      )}

      <FloatingButton title="Opções">
        <FloatingContentStyled columns={1}>

          <div className="action__buttons">
            <p>Ações</p>
            <StoresButtons value={{ setStores, categories }} />
          </div>

          <div className="action__filters">
            <p>Filtros</p>
            <OrderBySelect value={{ orderBy, setOrderBy }} />
          </div>
        </FloatingContentStyled>
      </FloatingButton>

    </>
  )


};

export { AllStores }
