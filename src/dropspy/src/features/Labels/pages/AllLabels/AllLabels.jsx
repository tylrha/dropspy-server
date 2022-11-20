import { useState, useEffect, useContext } from "react";

import { LayoutContext } from "../../../Layout";
import { populateAllProductsProgressively } from "../../../Products";
import { getLabelsArrFromProducts } from "../../utils/get-labels-from-products-array";
import { getNoLabeledProductsData } from "../../utils/get-no-labeled-products-data";
import { getAllLabels } from "../../services/get-all-labels";
import { addFieldsToLabelObj } from "../../utils/add-fields-to-label";
import { filterLabelsByType } from "../../utils/filter-labels-by-type";

import { Loader } from "../../../../components/loader/Loader";
import { Container } from "../../../../components/container/Container";
import { OrderBySelect } from "../../../../components/orderBySelect/OrderBySelect";

import { LabelsButtons } from "./components/LabelsButtons";
import { LabelsCards } from "./components/LabelsCards";
import { LabelsChart } from "./components/LabelsChart";
import { LabelsTable } from './components/LabelsTable'
import { FloatingButton } from "../../../../components/floating-button/FloatingButton";
import { FloatingContentStyled } from "../../../../components/floating-button/floating-button.styles";
import { ADD_UNUSED_LABELS, LAYOUT_DEFAULT_SORTBY } from "../../../../configs/configs";
import { sortArrayByKey } from "../../../../utils/sort-array-by-key";
import { Tabs } from "../../../../components/tabs/Tabs";
import { AuthContext } from "../../../Authentication";
import { NoDataToShow } from "../../../../components/no-data-to-show/NoDataToShow";

/* ========================================================================== */

const AllLabels = () => {

  const { userInfo } = useContext(AuthContext)
  const { isLoading, setIsLoading, setTitle } = useContext(LayoutContext)
  const [orderBy, setOrderBy] = useState(LAYOUT_DEFAULT_SORTBY);
  const [products, setProducts] = useState([]);
  const [labels, setLabels] = useState([]);

  const strategyLabels = labels.length === 0 ? [] : sortArrayByKey(filterLabelsByType(labels, 'strategy'), orderBy.value, orderBy.order)
  const specialLabels = labels.length === 0 ? [] : sortArrayByKey(filterLabelsByType(labels, 'special'), orderBy.value, orderBy.order)
  const productLabels = labels.length === 0 ? [] : sortArrayByKey(filterLabelsByType(labels, 'product'), orderBy.value, orderBy.order)

  useEffect(() => {
    setIsLoading(true)
    setTitle('Etiquetas')

    const iterationPopulateFn = (curData, aggregatedData) => {
      if (aggregatedData.length > 0) {
        setProducts(aggregatedData)
        setLabels([...getLabelsArrFromProducts(aggregatedData), getNoLabeledProductsData(aggregatedData)])
      }
    }

    const endPopulateFn = (curData, aggregatedData) => {

      if (ADD_UNUSED_LABELS) {
        getAllLabels((allLabelsData) => {
          setLabels((oldLabels) => [...oldLabels, ...[...allLabelsData].filter((newLabel) => oldLabels.findIndex(item => item.name === newLabel.name) === -1).map(item => addFieldsToLabelObj(item))])
        })
      }

      setIsLoading(false)
      console.log("TERMINOOU!")

    }

    populateAllProductsProgressively(userInfo, iterationPopulateFn, endPopulateFn)

    return () => {
      console.log("UNRENDERED ALLALBELS!")
      setIsLoading(false)
    }
  }, []) // eslint-disable-line


  const strategyTabsNames = ["Gráfico de estratégias", "Tabela de estratégias"]
  const strategyTabsValues = [
    <LabelsChart value={{ labels: strategyLabels, orderBy, maxItems: 15 }} />,
    <LabelsTable value={{ labels: strategyLabels, maxItems: 15 }} />
  ]

  const specialTabsNames = ["Gráfico de especiais", "Tabela de especiais"]
  const specialTabsValues = [
    <LabelsChart value={{ labels: specialLabels, orderBy, maxItems: 15 }} />,
    <LabelsTable value={{ labels: specialLabels, maxItems: 15 }} />
  ]

  const productTabsNames = ["Gráfico de produtos", "Tabela de produtos"]
  const productTabsValues = [
    <LabelsChart value={{ labels: productLabels, orderBy, maxItems: 15 }} />,
    <LabelsTable value={{ labels: productLabels, maxItems: 15 }} />
  ]

  return (
    <>
      <Container title={`Detalhes de etiquetas`}>
        <LabelsCards value={{ labels, products }} />
      </Container>

      {labels.length > 0 ? (
        <>
          <Container>
            <Tabs value={{ tabs: strategyTabsNames, tabsContent: strategyTabsValues }} />
          </Container>

          <Container>
            <Tabs value={{ tabs: specialTabsNames, tabsContent: specialTabsValues }} />
          </Container>

          <Container>
            <Tabs value={{ tabs: productTabsNames, tabsContent: productTabsValues }} />
          </Container>
        </>
      ) : (
        <>
          {isLoading ? (
            <Loader text="Carregando etiquetas" />
          ) : (
            <NoDataToShow title="Não há etiquetas para mostrar!" />
          )}
        </>
      )}

      <FloatingButton title="Opções">
        <FloatingContentStyled columns={2}>
          <div className="action__buttons">
            <p>Ações</p>
            <LabelsButtons value={{ setLabels, setProducts }} />
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

export { AllLabels }
