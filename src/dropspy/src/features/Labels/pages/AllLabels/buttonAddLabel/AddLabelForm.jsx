import { useContext, useState } from 'react'
import { useForm } from "react-hook-form";
import { toast } from 'react-toastify';

import { FormStyled } from './addLabelForm.style';
import { addFieldsToLabelObj } from '../../../utils/add-fields-to-label';
import { LayoutContext } from '../../../../Layout';
import { addLabelInApi } from '../../../services/add-label-in-api';

const AddLabelForm = (props) => {

  const { setModalStatus } = useContext(LayoutContext)
  const { setLabels } = props.value

  const { register, handleSubmit, setValue, getValues } = useForm();
  const [synonyms, setSynonyms] = useState([])

  const handleAddSynonym = () => {

    const curSynonym = getValues().synonyms

    setSynonyms(old => {
      const newArr = [...new Set([...old, curSynonym])]
      return newArr
    })

    setValue('synonyms', '', { shouldValidate: true })
  }

  const handleDeleteSynonym = (oldData) => {
    const getDeletedElement = oldData.target.parentElement.getAttribute('label')
    const newSynonyms = synonyms.filter(old => old !== getDeletedElement)
    setSynonyms(newSynonyms)
  }

  const handleAddLabel = (oldData) => {

    const finalSynonyms = synonyms.length > 0 ? [oldData.name, Array.from(synonyms).join(',')] : oldData.name

    const finalObj = {
      name: oldData.name,
      synonyms: finalSynonyms,
      type: oldData.type,
      compare: oldData.compare
    }

    addLabelInApi(finalObj, (response) => {

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
        toast.success(`Etiqueta ${oldData.name} foi adicionada com sucesso!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

        setLabels(old => [...old, addFieldsToLabelObj(oldData)])
      }

      setModalStatus(false)
    })

  }

  return (

    <FormStyled onSubmit={handleSubmit(handleAddLabel)}>

      <div className="form__row two">
        <div className="input__title">Etiqueta</div>
        <input autoFocus className="input__item" {...register("name", { required: true })} />
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
        <select defaultValue={"product"} className="input__item" {...register("type", { required: true })}>
          <option value="product">Produto</option>
          <option value="strategy">Estratégia</option>
        </select>
      </div>

      <div className="form__row two">
        <div className="input__title">Comparação</div>
        <select defaultValue={"default"} className="input__item" {...register("compare", { required: true })}>
          <option value="default">Padrão</option>
          <option value="exact">Exata</option>
          <option value="regex">Expressão regular</option>
        </select>
      </div>

      <div className="form__row one button">
        <input type="submit" />
      </div>
    </FormStyled>
  )
}

export { AddLabelForm }
