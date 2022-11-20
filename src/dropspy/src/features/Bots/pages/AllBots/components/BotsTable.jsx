import { useState } from "react";
import { isMobile } from 'react-device-detect';

import { Button, ButtonContainer } from "../../../../../components/button/Button";
import { Table } from "../../../../../components/table/Table";
import { convertTableFieldsToMobile, getMobileTableVisibleFields } from '../../../../../utils/mobile-table-utils'

const TABLE_PROPORTION = 190;
const TABLE_MOBILE_VISIBLE = ['status', 'botNumber', 'spyedStores', 'lastCheckDateMinutes']

const getOnlyFoundFields = (curTableRowData) => {

  let finalFields = []

  const addFieldIfKeyIsFound = (fieldToAdd) => {
    const shouldAdd = Object.keys(curTableRowData).indexOf(fieldToAdd.field) > -1
    if (shouldAdd) { finalFields.push(fieldToAdd) }
  }

  addFieldIfKeyIsFound({
    field: "botNumber",
    headerName: "Bot",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
  })

  addFieldIfKeyIsFound({
    field: "status",
    headerName: "Status",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <div className="cellStatus" bot-status={params.value}>{params.value}</div>
      );
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2)
  })

  addFieldIfKeyIsFound({
    field: "spyedStores",
    headerName: "Loja",
    flex: 0.8,
    align: 'left',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        params.row.spyedStores[0]
      );
    }
  })

  addFieldIfKeyIsFound({
    field: "totalStores",
    headerName: "Lojas",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
  })

  addFieldIfKeyIsFound({
    field: "version",
    headerName: "Versão",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
  })

  addFieldIfKeyIsFound({
    field: "loopInterval",
    headerName: "Loop",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
  })

  addFieldIfKeyIsFound({
    field: "alihunterAuth",
    headerName: "Auth",
    flex: 1,
    align: 'left',
    headerAlign: 'center',
  })

  addFieldIfKeyIsFound({
    field: "lastSetupDateMinutes",
    headerName: "Restart",
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
    sortComparator: (v1, v2) => (typeof v1 === 'number' ? v1 : 0) - (typeof v2 === 'number' ? v2 : 0)
  })

  addFieldIfKeyIsFound({
    field: "lastCheckDateMinutes",
    headerName: "Checada",
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
    sortComparator: (v1, v2) => (typeof v1 === 'number' ? v1 : 0) - (typeof v2 === 'number' ? v2 : 0)
  })

  addFieldIfKeyIsFound({
    field: "lastSaleDateMinutes",
    headerName: "Venda",
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
    sortComparator: (v1, v2) => (typeof v1 === 'number' ? v1 : 0) - (typeof v2 === 'number' ? v2 : 0)
  })

  return finalFields
}

const BotsTable = (props) => {

  const { bots } = props.value
  console.log(bots)

  const TABLE_COMPLETE_FIELDS_ARR = getOnlyFoundFields(bots[0])
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
      <Table value={{ columns: visibleColumns, data: bots }} />
    </>
  );

};

export { BotsTable }
