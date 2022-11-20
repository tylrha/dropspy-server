import { useContext } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { FormStyled } from './editStoreForm.style';
import { LayoutContext } from '../../../../Layout';
import { editStoreInApi } from '../../../services/edit-store-in-api';

const EditStoreForm = (props) => {

  const { storeInfo, categoriesArr, cbFunction } = props.value
  const { setModalStatus } = useContext(LayoutContext)
  const { register, handleSubmit } = useForm();

  const handleEditStore = (oldData) => {

    let finalStoreObj = {
      ...oldData,
      storeLink: storeInfo.storeLink
    }

    editStoreInApi(finalStoreObj, (response) => {

      if (response.error) {
        toast.error(response.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success(`Loja ${storeInfo.storeName} foi editada com sucesso!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        cbFunction(response)

      }

      setModalStatus(false)
    })

  }

  return (

    <FormStyled onSubmit={handleSubmit(() => {console.log("FOI EIN!")})}>

      <div className="form__row two">
        <div className="input__title">Loja</div>
        <input defaultValue={storeInfo.storeName} disabled className="input__item" {...register("storeName")} />
      </div>

      <div className="form__row two">
        <div className="input__title">Link da loja</div>
        <input defaultValue={storeInfo.storeLink} disabled className="input__item" {...register("storeLink")} />
      </div>

      <div className="form__row two">
        <div className="input__title">Logo da loja</div>
        <input defaultValue={storeInfo.storeLogoLink} className="input__item" {...register("storeLogoLink")} />
      </div>

      <div className="form__row two">
        <div className="input__title">Categoria</div>
        <select defaultValue={storeInfo.storeCategory} className="input__item" {...register("storeCategory", { required: true })}>
          {categoriesArr.length > 0 && (
            categoriesArr.map(item => (
              <option key={item} value={item}>{item}</option>
            ))
          )}
        </select>
      </div>

      <div className="form__row two">
        <div className="input__title">País</div>
        <select defaultValue={storeInfo.storeCountry} className="input__item" {...register("storeCountry", { required: true })}>
          <option value="brasil">Brasil</option>
          <option value="foreign">Gringa</option>
        </select>
      </div>

      <div className="form__row two">
        <div className="input__title">Erro</div>
        <select defaultValue={storeInfo.storeError} className="input__item" {...register("storeError", { required: true })}>
          <option value="none">Nenhum</option>
          <option value="aliblocker">Loja com aliblocker</option>
          <option value="offline">Loja desativada</option>
          <option value="no-sales">Loja sem vendas</option>
          <option value="few-sales">Loja com poucas vendas</option>
          <option value="many-sales">Loja com muitas vendas</option>
        </select>
      </div>

      <div className="form__row one button">
        <input value="Salvar" type="submit" onClick={handleSubmit(handleEditStore)}/>
      </div>
    </FormStyled>
  )
}

export { EditStoreForm }
