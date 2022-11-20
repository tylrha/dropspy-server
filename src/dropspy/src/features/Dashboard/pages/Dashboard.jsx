import { useContext, useEffect, useRef, useState } from 'react';

import { addFieldsToProductObj, getLastNSalesFromApiCallback, getTopProductsFromApi } from '../../Products';
import { addFieldsToStoreObj, getTopStoresFromApi } from '../../Stores';
import { LAYOUT_DEFAULT_SORTBY } from '../../../configs/configs';
import { sortArrayByKey } from '../../../utils/sort-array-by-key';

import { LayoutContext } from '../../Layout'
import { Container } from '../../../components/container/Container';
import { StoresTable } from '../../Stores';
import { ProductsTable } from '../../Products';
import { FloatingButton } from '../../../components/floating-button/FloatingButton';
import { FloatingContentStyled } from '../../../components/floating-button/floating-button.styles';

import { OrderBySelect } from '../../../components/orderBySelect/OrderBySelect';
import { Tabs } from '../../../components/tabs/Tabs';
import { AuthContext } from '../../Authentication';
import { Loader } from '../../../components';

const Dashboard = () => {

  const { setTitle } = useContext(LayoutContext)
  const { userId } = useContext(AuthContext)

  const [orderBy, setOrderBy] = useState(LAYOUT_DEFAULT_SORTBY);
  const [sales, setSales] = useState([])
  const [topStores, setTopStores] = useState([])
  const [topProducts, setTopProducts] = useState([])
  const loadedCount = useRef(0)

  const sortedSales = sales === undefined ? [] : sortArrayByKey(sales.map(item => addFieldsToProductObj(item)), orderBy.value, orderBy.order)
  const sortedTopStores = topStores === undefined ? [] : sortArrayByKey(topStores.map(item => addFieldsToStoreObj(item)), orderBy.value, orderBy.order)
  const sortedTopProducts = topProducts === undefined ? [] : sortArrayByKey(topProducts.map(item => addFieldsToProductObj(item)), orderBy.value, orderBy.order)

  useEffect(() => {

    setTitle('Dashboard')

    getLastNSalesFromApiCallback(userId, 10, (data) => {
      loadedCount.current += 1
      if (data.error){
        console.log(`ERROR: ${data.error}`)
      } else {
        setSales([...data].map(item => addFieldsToProductObj(item)))
      }
    })

    getTopProductsFromApi(userId, 10, (data) => {
      if (data.error){
        console.log(`ERROR: ${data.error}`)
      } else {
        setTopProducts([...data].map(item => addFieldsToProductObj(item)))
      }
    })

    getTopStoresFromApi(userId, 10, (data) => {
      if (data.error){
        console.log(`ERROR: ${data.error}`)
      } else {
        setTopStores([...data].map(item => addFieldsToStoreObj(item)))
      }
    })

  }, []) // eslint-disable-line

  const tabsNames = ["Últimas vendas", "Top 10 produtos", "Top 10 lojas"]
  const tabsValues = [
    <ProductsTable value={{ products: sortedSales }} />,
    <ProductsTable value={{ products: sortedTopProducts }} />,
    <StoresTable value={{ stores: sortedTopStores }} />
  ]


  return (
    <>
      <Container>
        {loadedCount.current === 0 ? (
          <Loader text="Carregando dados" />
        ) : (
          <Tabs value={{ tabs: tabsNames, tabsContent: tabsValues }} />
        )}
      </Container>

      <FloatingButton title="Opções">
        <FloatingContentStyled columns={1}>
          <div className="action__filters">
            <p>Filtros</p>
            <OrderBySelect value={{ orderBy, setOrderBy }} />
          </div>
        </FloatingContentStyled>
      </FloatingButton>
    </>
  )

}

export { Dashboard };
