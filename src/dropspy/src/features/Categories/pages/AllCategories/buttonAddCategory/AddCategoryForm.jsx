import { useContext } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { FormStyled } from './addCategoryForm.style';
import { LayoutContext } from '../../../../Layout';
import { addCategoryInApi } from '../../../services/add-category-in-api';
import { addFieldsToCategoryObj } from '../../../utils/add-fields-to-category-object';

const AddCategoryForm = (props) => {

  const { setModalStatus } = useContext(LayoutContext)
  const { setStoresByCategories } = props.value

  const { register, handleSubmit } = useForm();

  const handleAddCategory = (oldData) => {

    const finalObj = {
      name: oldData.name,
    }

    addCategoryInApi(finalObj, (response) => {

      if (response.data.error) {
        toast.error(response.data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success(`Categoria ${oldData.name} foi adicionada com sucesso!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setStoresByCategories(old => [...old, addFieldsToCategoryObj(oldData)])
      }

      setModalStatus(false)
    })

  }

  return (

    <FormStyled onSubmit={handleSubmit(() => {console.log("FOI EIN!")})}>

      <div className="form__row two">
        <div className="input__title">Categoria</div>
        <input autoFocus className="input__item" {...register("name", { required: true })} />
      </div>

      <div className="form__row one button">
        <input value="Adicionar" onClick={handleSubmit(handleAddCategory)} type="submit" />
      </div>
    </FormStyled>
  )
}

export { AddCategoryForm }
