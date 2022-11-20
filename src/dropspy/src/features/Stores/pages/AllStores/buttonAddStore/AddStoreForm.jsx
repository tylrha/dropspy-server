import { useContext } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';
import { FormStyled } from './addStoreForm.style';
import { LayoutContext } from '../../../../Layout';
import { addStoreInApi } from '../../../services/add-store-in-api';
import { addFieldsToStoreObj } from '../../../utils/add-fields-to-store-obj';
import { AuthContext } from '../../../../Authentication'

const AddStoreForm = (props) => {

  const { userId, addStoreToRegisteredStoresList } = useContext(AuthContext)
  const { setModalStatus } = useContext(LayoutContext)
  const { setStores, categories } = props.value

  const { register, handleSubmit } = useForm();

  const handleAddStore = (oldData) => {

    let finalApiObj = {
      userId,
      ...oldData
    }

    addStoreInApi(finalApiObj, (data) => {

      console.log(data)

      if (data.error) {
        toast.error(data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success(`Loja ${data.storeName} foi adicionada com sucesso!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        addStoreToRegisteredStoresList({
          storeLink: data.storeLink,
          isSpying: false,
          totalDates: 0,
          spyDates: []
        })

        setStores(old => [...old, addFieldsToStoreObj(data)])
      }

      setModalStatus(false)

    })

  }

  return (

    <FormStyled onSubmit={handleSubmit(() => { console.log("FOI EIN!") })}>

      <div className="form__row two">
        <div className="input__title">Nome da Loja</div>
        <input className="input__item" {...register("storeName", { required: true })} />
      </div>

      <div className="form__row two">
        <div className="input__title">Link da Loja</div>
        <input className="input__item" {...register("storeLink", { required: true })} />
      </div>

      <div className="form__row two">
        <div className="input__title">Categoria</div>
        <select className="input__item" defaultValue={"genérica"} {...register("storeCategory", { required: true })}>
          {categories.length > 0 && (
            categories.map(item => (
              <option key={item.id} value={item.storeCategory}>{item.storeCategory}</option>
            ))
          )}
        </select>
      </div>

      <div className="form__row two">
        <div className="input__title">País</div>
        <select defaultValue={"brasil"} className="input__item" {...register("storeCountry", { required: true })}>
          <option value="brasil">Brasil</option>
          <option value="foreign">Gringa</option>
        </select>
      </div>

      <div className="form__row two">
        <div className="input__title">Erro</div>
        <select defaultValue={"none"} className="input__item" {...register("storeError", { required: true })}>
          <option value="none">Nenhum</option>
          <option value="aliblocker">Loja com aliblocker</option>
          <option value="offline">Loja desativada</option>
          <option value="no-sales">Loja sem vendas</option>
          <option value="few-sales">Loja com poucas vendas</option>
          <option value="many-sales">Loja com muitas vendas</option>
        </select>
      </div>

      <div className="form__row one button">
        <input value="Adicionar" type="submit" onClick={handleSubmit(handleAddStore)} />
      </div>
    </FormStyled>
  )
}

export { AddStoreForm }

/*

        let finalStoreObj = {
          ...oldData,
          storeLogoLink: "",
          isSpying: false,
          initialDate: "",
          lastSale: "",
          lastSaleIso: "",
          totalSales: 0,
          totalRevenue: 0,
          totalDates: 0,
          totalProducts: 0
        }

*/
