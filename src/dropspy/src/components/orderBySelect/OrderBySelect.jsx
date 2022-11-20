import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { OrderBySelectStyle } from './orderBySelect.style'
import { useContext } from 'react';
import { LayoutContext } from '../../features/Layout';

const orderFields = [
  { value: "totalRevenue", name: "Receita", order: "descendent" },
  { value: "totalProducts", name: "Produtos", order: "descendent" },
  { value: "totalSales", name: "Pedidos", order: "descendent" },
]

/* ========================================================================== */

const OrderBySelect = (props) => {

  const { setModalStatus } = useContext(LayoutContext)

  const { orderBy, setOrderBy, addFields } = props.value
  const fields = addFields ? [...orderFields, ...addFields] : orderFields
  const handleChange = (event) => {
    const orderObj = fields.find(item => item.value === event.target.value)
    setOrderBy(orderObj)
    setModalStatus(false)
  };

  return (
    <OrderBySelectStyle>
      <FormControl>
        <InputLabel id="orderByFields">Ordernar</InputLabel>
        <Select labelId="orderByFields" id="orderByFieldsSelect" value={orderBy.value} label="orderBy" onChange={handleChange} >
          {fields && fields.map(item => (
            <MenuItem key={item.value} value={item.value}>{item.name}</MenuItem>
          ))}
        </Select>
      </FormControl>
    </OrderBySelectStyle>
  );
}

export { OrderBySelect }
