import { useState, useEffect, useContext } from "react";

import { LayoutContext } from "../../../Layout";
import { populateAllDatesProgressively } from "../../utils/populate-all-dates-progressively";

import { Container } from '../../../../components/container/Container'
import { Loader } from "../../../../components/loader/Loader";
import { OrderBySelect } from "../../../../components/orderBySelect/OrderBySelect";

import { DatesTable } from "./components/DatesTable";
import { DatesChart } from "./components/DatesChart";
import { DatesCards } from "./components/DatesCards";
import { DatesButttons } from "./components/DatesButtons";
import { FloatingButton } from "../../../../components/floating-button/FloatingButton";
import { FloatingContentStyled } from "../../../../components/floating-button/floating-button.styles";
import { LAYOUT_DEFAULT_SORTBY } from "../../../../configs/configs";
import { Tabs } from "../../../../components/tabs/Tabs";
import { AuthContext } from "../../../Authentication";
import { NoDataToShow } from "../../../../components/no-data-to-show/NoDataToShow";

/* ========================================================================== */

const AllDates = () => {

  const { isLoading, setIsLoading, setTitle } = useContext(LayoutContext)
  const { userId } = useContext(AuthContext)

  const [dates, setDates] = useState([]);
  const [orderBy, setOrderBy] = useState(LAYOUT_DEFAULT_SORTBY);

  useEffect(() => {
    setTitle('Datas')
    setIsLoading(true)

    const iterationPopulateFn = (curData, aggregatedData) => { setDates([...aggregatedData].reverse()) }
    const endPopulateFn = (curData, aggregatedData) => { setIsLoading(false) }
    populateAllDatesProgressively(userId, iterationPopulateFn, endPopulateFn)

    return () => { setIsLoading(false) }
  }, []) // eslint-disable-line

  const tabsNames = ["Gráfico de datas", "Tabela de datas"]
  const tabsValues = [
    <DatesChart value={{ dates, orderBy }} />,
    <DatesTable value={{ dates }} />
  ]

  return (
    <>
      <Container title="Dados gerais das datas">
        <DatesCards value={{ dates }} />
      </Container>

      {dates.length > 0 ? (
        <Container>
          <Tabs value={{ tabs: tabsNames, tabsContent: tabsValues }} />
        </Container>
      ) : (
        <>
          {isLoading ? (
            <Loader text="Carregando datas" />
          ) : (
            <NoDataToShow title="Não há datas para mostrar!" />
          )}
        </>
      )}

      <FloatingButton title="Opções">
        <FloatingContentStyled columns={2}>
          <div className="action__buttons">
            <p>Ações</p>
            <DatesButttons />
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


export { AllDates };
