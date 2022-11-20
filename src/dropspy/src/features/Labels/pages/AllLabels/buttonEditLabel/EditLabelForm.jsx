import { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { FormStyled } from './editLabelForm.style';
import { LayoutContext } from '../../../../Layout';
import { editLabelInApi } from '../../../services/edit-label-in-api';
import { deleteLabelInApi } from '../../../services/delete-label-in-api';

const EditLabelForm = (props) => {

  const { labelInfo } = props.value
  const { setModalStatus } = useContext(LayoutContext)
  const [ synonyms, setSynonyms ] = useState(labelInfo.synonyms.filter(old => old !== labelInfo.name))
  const { register, handleSubmit, setValue, getValues } = useForm();

  const handleAddSynonym = () => {
    const curSynonym = getValues().synonyms
    setSynonyms(old => [...new Set([...old, curSynonym])])
    setValue('synonyms', '', { shouldValidate: true })
  }

  const handleDeleteSynonym = (oldData) => {
    setSynonyms(synonyms.filter(newSynonym => newSynonym !== oldData.target.parentElement.getAttribute('label')))
  }

  const handleEditLabel = (oldData) => {

    const finalObj = {
      name: labelInfo.name,
      synonyms,
      type: oldData.type,
      compare: oldData.compare
    }

    editLabelInApi(finalObj, (response) => {

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
        toast.success(`Etiqueta ${oldData.name} foi editada com sucesso!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }

      setModalStatus(false)
    })

  }

  const handleDeleteLabel = (oldData) => {

    deleteLabelInApi({name: labelInfo.name}, (response) => {

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
        toast.success(`Etiqueta [${labelInfo.name}] foi apagada com sucesso!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }

      setModalStatus(false)

    })

  }

  return (

    <FormStyled onSubmit={handleSubmit(() => {console.log("FOI EIN!")})}>

      <div className="form__row two">
        <div className="input__title">Etiqueta</div>
        <input defaultValue={labelInfo.name} disabled className="input__item" {...register("name")} />
      </div>

      <div className="form__row two">
        <div className="input__title">Sinônimos</div>
        <div className="input__add_item">
          <div className="row">
            <input className="input__item" {...register("synonyms")} />
            <i onClick={handleAddSynonym} className='bx bxs-alarm-add'></i>
          </div>
          {synonyms.length > 0 && (
            <div className="row synonyms">
              {synonyms.map((item) => (
                <div key={item} label={item} className="synonym__row">
                  <p className="synonym__item">{item}</p>
                  <i onClick={handleDeleteSynonym} className="bx bx-trash"></i>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="form__row two">
        <div className="input__title">Tipo</div>
        <select defaultValue={labelInfo.type} className="input__item" {...register("type", { required: true })}>
          <option value="product">Produto</option>
          <option value="strategy">Estratégia</option>
          <option value="special">Especial</option>
        </select>
      </div>

      <div className="form__row two">
        <div className="input__title">Comparação</div>
        <select defaultValue={labelInfo.compare} className="input__item" {...register("compare", { required: true })}>
          <option value="default">Padrão</option>
          <option value="exact">Exata</option>
          <option value="regex">Expressão regular</option>
        </select>
      </div>

      <div className="form__row two button">
        <input value="Apagar" type="submit" onClick={handleSubmit(handleDeleteLabel)}/>
        <input value="Salvar" type="submit" onClick={handleSubmit(handleEditLabel)}/>
      </div>
    </FormStyled>
  )
}

//

export { EditLabelForm }
