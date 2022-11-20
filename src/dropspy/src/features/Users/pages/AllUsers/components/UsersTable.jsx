import { useState } from "react";
import { isMobile } from 'react-device-detect';

import { Button, ButtonContainer } from "../../../../../components/button/Button";
import { Table } from "../../../../../components/table/Table";

import { convertTableFieldsToMobile, getMobileTableVisibleFields } from '../../../../../utils/mobile-table-utils'

const TABLE_PROPORTION = 190;
const TABLE_MOBILE_VISIBLE = ['userRole', 'email', 'registeredStores']

const getOnlyFoundFields = (curTableRowData) => {

  let finalFields = []

  const addFieldIfKeyIsFound = (fieldToAdd) => {
    const shouldAdd = Object.keys(curTableRowData).indexOf(fieldToAdd.field) > -1
    if (shouldAdd) { finalFields.push(fieldToAdd) }
  }

  addFieldIfKeyIsFound({
    field: "userRole",
    headerName: "Tipo",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <div className="cellStatus" user-role={params.value}>{params.value}</div>
      );
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2)
  })

  addFieldIfKeyIsFound({
    field: "email",
    headerName: "Email",
    flex: 1,
    align: 'left',
    headerAlign: 'center',
  })

  addFieldIfKeyIsFound({
    field: "favoriteProducts",
    headerName: "Produtos fav",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    renderCell: (params) => {
      return (
        params.row.favoriteProducts.length
      );
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2)
  })

  addFieldIfKeyIsFound({
    field: "favoriteStores",
    headerName: "Lojas fav",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    renderCell: (params) => {
      return (
        params.row.favoriteStores.length
      );
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2)
  })

  addFieldIfKeyIsFound({
    field: "registeredStores",
    headerName: "Lojas",
    flex: 0.8,
    align: 'center',
    headerAlign: 'center',
    sortable: false,
    renderCell: (params) => {
      return (
        `${params.row.registeredStores.filter(store => store.isSpying === true).length} / ${params.row.registeredStores.length}`
      );
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2)
  })

  addFieldIfKeyIsFound({
    field: "allowedStores",
    headerName: "Lojas permitidas",
    flex: 0.5,
    align: 'center',
    headerAlign: 'center'
  })


  addFieldIfKeyIsFound({
    field: "lastActiveTime",
    headerName: "Último login",
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
  })

  return finalFields
}

const UsersTable = (props) => {

  const { users } = props.value

  const TABLE_COMPLETE_FIELDS_ARR = getOnlyFoundFields(users[0])
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
      <Table value={{ columns: visibleColumns, data: users }} />
    </>
  );

};

export { UsersTable }
