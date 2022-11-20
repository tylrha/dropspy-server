import { useState } from "react";
import { Link } from "react-router-dom";
import { isMobile } from 'react-device-detect';

import { Button, ButtonContainer } from "../../../../../components/button/Button";
import { Table } from "../../../../../components/table/Table";

import { convertTableFieldsToMobile, getMobileTableVisibleFields } from '../../../../../utils/mobile-table-utils'
import { ButtonIsFavoriteProduct } from "../buttonIsFavoriteProduct/ButtonIsFavoriteProduct";
import { NoDataToShow } from "../../../../../components/no-data-to-show/NoDataToShow";


const getOnlyFoundFields = (curTableRowData) => {

  if (!curTableRowData){return []}

  let finalFields = []

  const addFieldIfKeyIsFound = (fieldToAdd) => {
    const shouldAdd = Object.keys(curTableRowData).indexOf(fieldToAdd.field) > -1
    if (shouldAdd) { finalFields.push(fieldToAdd) }
  }

  addFieldIfKeyIsFound({
    field: "tier",
    headerName: "Tier",
    flex: 0.2,
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
    field: "productName",
    headerName: "Produto",
    flex: 1.2,
    headerAlign: 'center',
    renderCell: (params) => {

      return (
        <a className="cellWithImg" href={params.row.productLink} target="_blank" rel="noreferrer" >
          <img className="cellImg" src={params.row.productImage} alt="avatar" />
          {params.value}
        </a>
      );
    },
  })

  addFieldIfKeyIsFound({
    field: "storeName",
    headerName: "Loja",
    flex: 0.4,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <a href={params.row.storeLink} target="_blank" rel="noreferrer">{params.value}</a>
      );
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2)
  })

  addFieldIfKeyIsFound({
    field: "productPrice",
    headerName: "Preço",
    flex: 0.6,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(params.value)
      );
    },
  })

  addFieldIfKeyIsFound({
    field: "totalLabels",
    headerName: "Etiquetas",
    flex: 0.6,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        Intl.NumberFormat('pt-br').format(params.value)
      );
    }
  })

  addFieldIfKeyIsFound({
    field: "totalSales",
    headerName: "Pedidos",
    flex: 0.4,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        Intl.NumberFormat('pt-br').format(params.value)
      );
    }
  })

  addFieldIfKeyIsFound({
    field: "totalRevenue",
    headerName: "Receita",
    flex: 0.7,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(params.value)
      );
    },
  })

  addFieldIfKeyIsFound({
    field: "lastSale",
    headerName: "Última venda",
    flex: 0.7,
    align: 'center',
    headerAlign: 'center',
  })

  finalFields.push({
    field: "isFavorite",
    headerName: "FAV",
    flex: 0.2,
    align: 'center',
    headerAlign: 'center',

    renderCell: (params) => {
      return (
        <ButtonIsFavoriteProduct value={{productLink: params.row.productLink}}/>
      )
    }
  })


  finalFields.push({
    field: "options",
    headerName: "Opções",
    flex: 0.4,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {

      return (
        <div className="cellAction">
          <Link to={`/products/view?productLink=${params.row.productLink}`} style={{ textDecoration: "none" }}><div className="viewButton">Ver</div></Link>
        </div>
      );
    },
  })

  return finalFields
}

const ProductsTable = (props) => {

  const TABLE_PROPORTION = 160;
  const TABLE_MOBILE_VISIBLE = ['productName', 'totalRevenue', 'options']

  const { products, maxItems } = props.value
  const TABLE_COMPLETE_FIELDS_ARR = getOnlyFoundFields(products[0])
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
      {products.length === 0 ? (
        <NoDataToShow title="Não há produtos a serem mostrados!"/>
      ) : (
        <>
          <ButtonContainer>
            <Button value={{ onlyMobile: true, onclick: handleMobileToggleColumns, text: `${mobileToggleColumnsButtonText} colunas` }} />
          </ButtonContainer>
          <Table value={{ columns: visibleColumns, data: products, maxItems }} />
        </>
      )}
    </>
  );


};

export { ProductsTable }
