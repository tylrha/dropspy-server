import { useState } from "react";
import { isMobile } from 'react-device-detect';

import { Button, ButtonContainer } from "../../../../../components/button/Button";
import { Table } from "../../../../../components/table/Table";
import { convertTableFieldsToMobile, getMobileTableVisibleFields } from '../../../../../utils/mobile-table-utils'

const getOnlyFoundFields = (curTableRowData) => {

  let finalFields = []

  const addFieldIfKeyIsFound = (fieldToAdd) => {
    const shouldAdd = Object.keys(curTableRowData).indexOf(fieldToAdd.field) > -1
    if (shouldAdd) { finalFields.push(fieldToAdd) }
  }

  addFieldIfKeyIsFound({
    field: "tier",
    headerName: "Tier",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <div className="cellTier" data-tier={params.value}>{params.value}</div>
      );
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2)
  })

  addFieldIfKeyIsFound({
    field: "totalStores",
    headerName: "Lojas",
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        Intl.NumberFormat('pt-br').format(params.value)
      );
    },
  })

  addFieldIfKeyIsFound({
    field: "totalProducts",
    headerName: "Produtos",
    flex: 0.7,
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
    flex: 0.9,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(params.row.totalRevenue)
      );
    },
  })

  return finalFields
}

const ProductsByTierTable = (props) => {

  const { tierProducts } = props.value

  const TABLE_PROPORTION = 130;
  const TABLE_MOBILE_VISIBLE = ['tier', 'totalStores', 'totalProducts', 'totalRevenue']
  const TABLE_COMPLETE_FIELDS_ARR = getOnlyFoundFields(tierProducts[0])
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
      <ButtonContainer>
        <Button value={{ onlyMobile: true, onclick: handleMobileToggleColumns, text: `${mobileToggleColumnsButtonText} colunas` }} />
      </ButtonContainer>
      <Table value={{ columns: visibleColumns, data: tierProducts }} />
    </>
  );

};

export { ProductsByTierTable }
