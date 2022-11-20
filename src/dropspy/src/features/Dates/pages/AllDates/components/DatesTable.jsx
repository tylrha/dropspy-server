import { useState } from "react";
import { Link } from "react-router-dom";
import { isMobile } from 'react-device-detect';

import { Table } from "../../../../../components/table/Table";
import { Button, ButtonContainer } from "../../../../../components/button/Button";

import { convertTableFieldsToMobile, getMobileTableVisibleFields } from '../../../../../utils/mobile-table-utils'
import { NoDataToShow } from "../../../../../components/no-data-to-show/NoDataToShow";

const getOnlyFoundFields = (curTableRowData) => {

  if (!curTableRowData){return}
  let finalFields = []

  const addFieldIfKeyIsFound = (fieldToAdd) => {
    const shouldAdd = Object.keys(curTableRowData).indexOf(fieldToAdd.field) > -1
    if (shouldAdd) { finalFields.push(fieldToAdd) }
  }

  addFieldIfKeyIsFound({
    field: "tier",
    headerName: "Tier",
    flex: 0.7,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <div className="cellTier" data-tier={params.value}>{params.value}</div>
      );
    },
    sortComparator: (v1, v2) => {
      const result = v1.localeCompare(v2)
      return result
    }
  })

  addFieldIfKeyIsFound({
    field: "date",
    headerName: "Data",
    flex: 1,
    align: 'center',
    headerAlign: 'center'
  })

  addFieldIfKeyIsFound({
    field: "totalProducts",
    headerName: "Produtos",
    flex: 1,
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        Intl.NumberFormat('pt-br').format(params.value)
      );
    },
  })

  addFieldIfKeyIsFound({
    field: "totalStores",
    headerName: "Lojas",
    flex: 0.7,
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        Intl.NumberFormat('pt-br').format(params.value)
      );
    },
  })

  addFieldIfKeyIsFound({
    field: "totalSales",
    headerName: "Pedidos",
    flex: 0.7,
    type: 'number',
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        Intl.NumberFormat('pt-br').format(params.value)
      );
    },
  })

  addFieldIfKeyIsFound({
    field: "totalRevenue",
    headerName: "Receita",
    flex: 1.1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(params.row.totalRevenue)
      );
    }
  })

  finalFields.push({
    field: "options",
    headerName: "Opções",
    flex: 0.7,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {

      return (
        <div className="cellAction">
          <Link to={`/dates/view?date=${params.row.date}`} style={{ textDecoration: "none" }}><div className="viewButton">Ver</div></Link>
        </div>
      );
    },
  })

  return finalFields
}

const DatesTable = (props) => {

  const { dates } = props.value

  const TABLE_PROPORTION = 100;
  const TABLE_MOBILE_VISIBLE = ['date', 'totalRevenue', 'totalSales', 'options']
  const TABLE_COMPLETE_FIELDS_ARR = getOnlyFoundFields(dates[0])
  const TABLE_MOBILE_FIELDS_ARR = getMobileTableVisibleFields(TABLE_COMPLETE_FIELDS_ARR, TABLE_MOBILE_VISIBLE, TABLE_PROPORTION)

  const [mobileToggleColumnsButtonText, setMobileToggleColumnsButtonText] = useState('Mostrar')
  const [visibleColumns, setVisibleColumns] = useState(isMobile ? TABLE_MOBILE_FIELDS_ARR : TABLE_COMPLETE_FIELDS_ARR)

  const handleMobileToggleColumns = () => {

    if (!isMobile) { return }

    let newButtonText;
    let newVisibleColumns;

    if (mobileToggleColumnsButtonText === 'Mostrar') {
      newButtonText = "Ocultar"
      newVisibleColumns = convertTableFieldsToMobile(TABLE_COMPLETE_FIELDS_ARR, TABLE_PROPORTION)
    } else {
      newButtonText = "Mostrar"
      newVisibleColumns = TABLE_MOBILE_FIELDS_ARR
    }

    setVisibleColumns(newVisibleColumns)
    setMobileToggleColumnsButtonText(newButtonText)
  }


  return (
    <>
      {dates.length === 0 ? (
        <NoDataToShow title="Não há datas para mostrar!" />
      ) : (
        <>
          <ButtonContainer>
            <Button value={{ onlyMobile: true, onclick: handleMobileToggleColumns, text: `${mobileToggleColumnsButtonText} colunas` }} />
          </ButtonContainer>
          <Table value={{ columns: visibleColumns, data: dates }} />
        </>
      )}
    </>
  );

};

export { DatesTable }
