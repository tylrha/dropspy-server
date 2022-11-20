import { useState, useEffect, useContext } from "react"

import { getAllCategoriesFromApi } from "../../services/get-all-categories-from-api"
import { addFieldsToCategoryObj } from "../../utils/add-fields-to-category-object"

import { LayoutContext } from '../../../../features/Layout'
import { Loader } from "../../../../components/loader/Loader"
import { Container } from "../../../../components/container/Container"

import { groupStoresByCategory, populateAllStoresProgressively } from '../../../Stores'

import { StoresCategoriesCards } from "./components/StoresCategoriesCards"
import { StoresCategoriesTable } from './components/StoresCategoriesTable'
import { StoresCategoriesChart } from "./components/StoresCategoriesChart"
import { OrderBySelect } from "../../../../components/orderBySelect/OrderBySelect"
import { FloatingButton } from "../../../../components/floating-button/FloatingButton"
import { FloatingContentStyled } from "../../../../components/floating-button/floating-button.styles"
import { StoresCategoriesButtons } from "./components/StoresCategoriesButtons"
import { ADD_UNUSED_CATEGORIES, LAYOUT_DEFAULT_SORTBY } from "../../../../configs/configs"
import { sortArrayByKey } from "../../../../utils/sort-array-by-key"
import { Tabs } from "../../../../components/tabs/Tabs"
import { AuthContext } from "../../../Authentication"
import { NoDataToShow } from "../../../../components/no-data-to-show/NoDataToShow"

/* ========================================================================== */

const AllCategories = () => {


  const { userInfo } = useContext(AuthContext)
  const { setIsLoading, isLoading, setTitle } = useContext(LayoutContext)
  const [orderBy, setOrderBy] = useState(LAYOUT_DEFAULT_SORTBY)

  const [stores, setStores] = useState([]) // eslint-disable-line
  const [storesByCategories, setStoresByCategories] = useState([])

  const sortedStoresByCategories = storesByCategories.length === 0 ? [] : sortArrayByKey(storesByCategories, orderBy.value, orderBy.order)

  useEffect(() => {
    setIsLoading(true)
    setTitle('Categorias')

    const iterationPopulateFn = (curData, aggregatedData) => {
      setStores([...aggregatedData])
      setStoresByCategories([...groupStoresByCategory(aggregatedData)])
    }

    const endPopulateFn = (curData, aggregatedData) => {

      if (ADD_UNUSED_CATEGORIES) {
        getAllCategoriesFromApi((allCategoriesData) => {
          setStoresByCategories((oldCategories) => [...oldCategories, ...[...allCategoriesData].filter((newLabel) => oldCategories.findIndex(item => item.storeCategory.toLowerCase() === newLabel.name.toLowerCase()) === -1).map(item => addFieldsToCategoryObj(item))])
        })
      }

      setIsLoading(false)
    }

    populateAllStoresProgressively(userInfo, iterationPopulateFn, endPopulateFn)

    return () => {
      console.log("UNRENDERED ALLALBELS!")
      setIsLoading(false)
    }
  }, []) // eslint-disable-line

  const categoriesTabsNames = ["Gráfico de categorias", "Tabela de categorias"]
  const categoriesTabsValues = [
    <StoresCategoriesChart value={{ storesByCategories: sortedStoresByCategories, orderBy }} />,
    <StoresCategoriesTable value={{ storesByCategories: sortedStoresByCategories, maxItems: 15 }} />
  ]

  return (
    <>
        <Container>
          <StoresCategoriesCards value={{ storesByCategories }} />
        </Container>

        {stores.length > 0 ? (
          <>
            <Container>
              <Tabs value={{ tabs: categoriesTabsNames, tabsContent: categoriesTabsValues }} />
            </Container>
          </>
        ) : (
          <>
            {isLoading ? (
              <Loader text="Carregando categorias" />
            ) : (
              <NoDataToShow title="Não há categorias para mostrar!" />
            )}
          </>
        )}

        <FloatingButton title="Opções">
          <FloatingContentStyled columns={2}>
            <div className="action__buttons">
              <p>Ações</p>
              <StoresCategoriesButtons value={{ setStoresByCategories }} />
            </div>

            <div className="action__filters">
              <p>Filtros</p>
              <OrderBySelect value={{ orderBy, setOrderBy }} />
            </div>
          </FloatingContentStyled>
        </FloatingButton>

    </>
  )

}

export { AllCategories }
