import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { isMobile, BrowserView } from 'react-device-detect';

import { Button, ButtonContainer } from "../../../../../components/button/Button";
import { Table } from "../../../../../components/table/Table";

import { convertTableFieldsToMobile, getMobileTableVisibleFields } from '../../../../../utils/mobile-table-utils'
import { EditStoreButtonInTable } from "../buttonEditStore/EditStoreButtonInTable";
import { ButtonIsFavoriteStore } from "../buttonIsFavoriteStore/ButtonIsFavoriteStore";
import { ButtonIsSpyingStore } from "../buttonIsSpyingStore/ButtonIsSpyingStore";
import { AuthContext } from "../../../../Authentication";
import { NoDataToShow } from "../../../../../components/no-data-to-show/NoDataToShow";
import { ButtonStoreCountry } from "../buttonStoreCountry/ButtonStoreCountry";

const getOnlyFoundFields = (curTableRowData, setStores, userRole) => {

  if (!curTableRowData) { return [] }

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
    field: "storeName",
    headerName: "Loja",
    flex: 1.2,
    align: 'left',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <>
          {params.row.storeLogoLink !== "" ? (
            <a className="cellWithImg" href={params.row.storeLink} target="_blank" rel="noreferrer" >
              <img className="cellImg" src={params.row.storeLogoLink} alt="avatar" />
              {params.value}
            </a>
          ) : (
            <a className="cellWithImg" href={params.row.storeLink} target="_blank" rel="noreferrer" >
              <img className="cellImg" src="https://w7.pngwing.com/pngs/250/929/png-transparent-no-symbol-no-smoking-miscellaneous-text-trademark-thumbnail.png" alt="avatar" />
              {params.value}
            </a>
            // <a href={params.row.id} target="_blank" rel="noreferrer" style={{ textDecoration: "none", fontWeight: "500" }}>{params.value}</a>
          )}
        </>
      );
    },
    sortComparator: (v1, v2) => v1.localeCompare(v2)
  })

  addFieldIfKeyIsFound({
    field: "storeCategory",
    headerName: "Categoria",
    flex: 0.6,
    align: 'center',
    headerAlign: 'center',
  })

  addFieldIfKeyIsFound({
    field: "totalDates",
    headerName: "Datas",
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
    field: "totalRevenue",
    headerName: "Receita",
    flex: 0.7,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <>
          {isMobile ? (
            `R$ ${(params.row.totalRevenue/1000).toFixed(0)} k`
          ) : (
            Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(params.row.totalRevenue)
          )}
        </>
      );
    },
  })

  addFieldIfKeyIsFound({
    field: "storeError",
    headerName: "Erro",
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return params.value === 'none' ? '' : params.value
    },
    sortComparator: (v1, v2) => {
      return (v1 === 'none' ? '' : v1).localeCompare((v2 === 'none' ? '' : v2).toString())
    }
  })


  addFieldIfKeyIsFound({
    field: "storeCountry",
    headerName: "País",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <ButtonStoreCountry value={{ storeCountry: params.row.storeCountry }} />
      )
    },
    sortComparator: (v1, v2) => {
      return v1.toString().localeCompare(v2.toString())
    }
  })

  addFieldIfKeyIsFound({
    field: "isSpying",
    headerName: "SPY",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <ButtonIsSpyingStore value={{ storeLink: params.row.storeLink, isSpying: params.row.isSpying}} />
      )
    },
    sortComparator: (v1, v2) => {
      return v1.toString().localeCompare(v2.toString())
    }
  })

  if (userRole === "admin"){
    addFieldIfKeyIsFound({
      field: "isSpyingGlobal",
      headerName: "SPY GB",
      flex: 0.3,
      align: 'center',
      headerAlign: 'center',
      renderCell: (params) => {
        return (
          <ButtonIsSpyingStore value={{ storeLink: params.row.storeLink, isSpying: params.row.isSpyingGlobal, editable: false }} />
        )
      },
      sortComparator: (v1, v2) => {
        return v1.toString().localeCompare(v2.toString())
      }
    })
  }

  finalFields.push({
    field: "isFavorite",
    headerName: "FAV",
    flex: 0.3,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <ButtonIsFavoriteStore value={{ storeLink: params.row.storeLink }} />
      )
    },
    sortComparator: (v1, v2) => {
      return v1.toString().localeCompare(v2.toString())
    }
  })

  finalFields.push({
    field: "options",
    headerName: "Opções",
    flex: 0.5,
    align: 'center',
    headerAlign: 'center',
    renderCell: (params) => {
      return (
        <div className="cellAction">
          <Link to={`/stores/view?storeLink=${params.row.storeLink}`} style={{ textDecoration: "none" }}><div className="viewButton">Ver</div></Link>
          {setStores && (
            <BrowserView>
              <EditStoreButtonInTable value={{ store: params.row.storeLink, setStores }} />
            </BrowserView>
          )}
        </div>
      )
    }
  })

  return finalFields
}

const addFieldsToStoresTable = (stores, userInfo) => {

  const favoriteStores = userInfo.favoriteStores
  const registeredStores = userInfo.registeredStores

  const newStores = [...stores].map(store => {
    let newStore = { ...store }
    const registeredStore = registeredStores.find(item => item.storeLink === store.storeLink)
    newStore.isFavorite = favoriteStores.findIndex(str => str.storeLink === store.storeLink) > -1
    newStore.isSpying = registeredStore ? registeredStore.isSpying : false
    return newStore
  })

  return newStores
}

/* ========================================================================== */

const StoresTable = (props) => {

  const { userInfo } = useContext(AuthContext)
  const { stores, setStores, maxItems } = props.value

  const newStores = addFieldsToStoresTable(stores, userInfo)

  const TABLE_PROPORTION = 130;
  const TABLE_MOBILE_VISIBLE = ['storeName', 'totalRevenue', 'isSpying', 'options']
  const TABLE_COMPLETE_FIELDS_ARR = getOnlyFoundFields(newStores[0], setStores, userInfo.userRole)
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
      {newStores.length === 0 ? (
        <NoDataToShow title="Não há lojas a serem mostradas!"/>
      ) : (
        <>
          <ButtonContainer>
            <Button value={{ onlyMobile: true, onclick: handleMobileToggleColumns, text: `${mobileToggleColumnsButtonText} colunas` }} />
          </ButtonContainer>
          <Table value={{ columns: visibleColumns, data: newStores, maxItems }} />
        </>
      )}
    </>
  );

};

export { StoresTable }

