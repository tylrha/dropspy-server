import { useState } from "react"
import { isMobile, BrowserView } from 'react-device-detect'
import { Link } from "react-router-dom"

import { Button, ButtonContainer } from "../../../../../components/button/Button"
import { NoDataToShow } from "../../../../../components/no-data-to-show/NoDataToShow"
import { Table } from "../../../../../components/table/Table"

import { convertTableFieldsToMobile, getMobileTableVisibleFields } from '../../../../../utils/mobile-table-utils'
import { EditLabelButton } from "../buttonEditLabel/EditLabelButton"

const getOnlyFoundFields = (curTableRowData) => {
  if (!curTableRowData){return}

  let finalFields = []

  const addFieldIfKeyIsFound = (fieldToAdd) => {
    const shouldAdd = Object.keys(curTableRowData).indexOf(fieldToAdd.field) > -1
    if (shouldAdd) { finalFields.push(fieldToAdd) }
  }

  addFieldIfKeyIsFound({
    field: "name",
    headerName: "Etiqueta",
    flex: 0.8,
    align: 'center',
    headerAlign: 'center'
  })

  addFieldIfKeyIsFound({
    field: "type",
    headerName: "Tipo",
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <div className="cellStatus" label={params.value}>{params.value}</div>
      )
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2)
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
      )
    },
  })

  addFieldIfKeyIsFound({
    field: "totalRevenue",
    headerName: "Receita",
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(params.row.totalRevenue)
      )
    },
  })

  addFieldIfKeyIsFound({
    field: "totalSales",
    headerName: "Pedidos",
    flex: 1,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        Intl.NumberFormat('pt-br').format(params.value)
      )
    },
  })

  finalFields.push({
    field: "options",
    headerName: "Opções",
    flex: 0.6,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/labels/view?label=${params.row.name}`}><div className="viewButton">Ver</div></Link>
          <BrowserView>
            <EditLabelButton value={{ label: params.row.name }}/>
          </BrowserView>
        </div>
      )
    },
  })

  return finalFields
}

const LabelsTable = (props) => {

  const { labels, maxItems } = props.value

  const TABLE_PROPORTION = 120
  const TABLE_MOBILE_VISIBLE = ['name', 'totalProducts', 'totalRevenue', 'options']
  const TABLE_COMPLETE_FIELDS_ARR = getOnlyFoundFields(labels[0])
  const TABLE_MOBILE_FIELDS_ARR = getMobileTableVisibleFields(TABLE_COMPLETE_FIELDS_ARR, TABLE_MOBILE_VISIBLE, TABLE_PROPORTION)

  const [mobileToggleColumnsButtonText, setMobileToggleColumnsButtonText] = useState('Mostrar')
  const [visibleColumns, setVisibleColumns] = useState(isMobile ? TABLE_MOBILE_FIELDS_ARR : TABLE_COMPLETE_FIELDS_ARR)

  const handleMobileToggleColumns = () => {

    if (!isMobile) { return }

    let newButtonText
    let newVisibleColumns

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
      {labels.length === 0 ? (
        <NoDataToShow title="Não há etiquetas para mostrar!" />
      ) : (
        <>
          <ButtonContainer>
            <Button value={{ onlyMobile: true, onclick: handleMobileToggleColumns, text: `${mobileToggleColumnsButtonText} colunas` }} />
          </ButtonContainer>
          <Table value={{ columns: visibleColumns, data: labels, maxItems }} />
        </>
      )}
    </>
  )

}

export { LabelsTable }
