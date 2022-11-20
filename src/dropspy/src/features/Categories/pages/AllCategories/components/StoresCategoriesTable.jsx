import { useState } from "react"
import { isMobile } from 'react-device-detect'
import { Link } from "react-router-dom"

import { Button, ButtonContainer } from "../../../../../components/button/Button"
import { NoDataToShow } from "../../../../../components/no-data-to-show/NoDataToShow"
import { Table } from "../../../../../components/table/Table"

import { convertTableFieldsToMobile, getMobileTableVisibleFields } from '../../../../../utils/mobile-table-utils'

const getOnlyFoundFields = (curTableRowData) => {

  if (!curTableRowData){return}
  let finalFields = []

  const addFieldIfKeyIsFound = (fieldToAdd) => {
    const shouldAdd = Object.keys(curTableRowData).indexOf(fieldToAdd.field) > -1
    if (shouldAdd) { finalFields.push(fieldToAdd) }
  }

  addFieldIfKeyIsFound({
    field: "storeCategory",
    headerName: "Categoria",
    flex: 0.6,
    align: 'center',
    headerAlign: 'center'
  })

  finalFields.push({
    field: "type",
    headerName: "Tipo",
    flex: 0.6,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {

      const categoryType = params.row.storeCategory.toLowerCase() === 'genérica' ? 'generic' : 'specific'
      const categoryTypeBr = params.row.storeCategory.toLowerCase() === 'genérica' ? 'Genérica' : 'Nichada'

      return (
        <div className="cellStatus" category={categoryType}>{categoryTypeBr}</div>
      )
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2)
  })

  addFieldIfKeyIsFound({
    field: "totalStores",
    headerName: "Lojas",
    flex: 0.6,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        Intl.NumberFormat('pt-br').format(params.value)
      )
    },
  })

  addFieldIfKeyIsFound({
    field: "totalProducts",
    headerName: "Produtos",
    flex: 0.6,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        Intl.NumberFormat('pt-br').format(params.value)
      )
    },
  })

  addFieldIfKeyIsFound({
    field: "totalSales",
    headerName: "Pedidos",
    flex: 0.6,
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
    flex: 0.8,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(params.row.totalRevenue)
      )
    },
  })

  finalFields.push({
    field: "details",
    headerName: "Detalhes",
    flex: 0.6,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/categories/view?category=${params.row.storeCategory}`}><div className="viewButton">Ver</div></Link>
        </div>
      );
    },
  })

  return finalFields
}


const StoresCategoriesTable = (props) => {

  const { storesByCategories, maxItems } = props.value

  const TABLE_PROPORTION = 140
  const TABLE_MOBILE_VISIBLE = ['storeCategory', 'type', 'totalRevenue', 'details']
  const TABLE_COMPLETE_FIELDS_ARR = getOnlyFoundFields(storesByCategories[0])
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
      {storesByCategories.length === 0 ? (
        <NoDataToShow title="Não há categorias para mostrar!" />
      ) : (
        <>
          <ButtonContainer>
            <Button value={{ onlyMobile: true, onclick: handleMobileToggleColumns, text: `${mobileToggleColumnsButtonText} colunas` }} />
          </ButtonContainer>
          <Table value={{ columns: visibleColumns, data: storesByCategories, maxItems }} />
        </>
      )}
    </>
  )

}

export { StoresCategoriesTable }
