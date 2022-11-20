import { useContext } from 'react'
import { toast } from 'react-toastify'
import { ChangeModalContent } from '../../../../../components/modal/Modal'
import { LayoutContext } from '../../../../Layout'
import { getLabelFromApi } from '../../../services/get-label-from-api'
import { EditLabelForm } from './EditLabelForm'

const EditLabelButton = (props) => {

  const {label} = props.value
  const {setModalContent, setModalStatus} = useContext(LayoutContext)

  const showContentInModal = () => {

    getLabelFromApi(label, (data) => {

      if (data.error){
        toast.error(`Etiqueta não foi encontrada!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return;
      }

      const labelInfo = data

      ChangeModalContent({
        title: "Editar etiqueta",
        content: <EditLabelForm value={{labelInfo}}/>,
        setModalContent,
        setModalStatus
      })

    })
  }

  return (
    <div className="viewButton" onClick={showContentInModal}>Editar</div>
  )
}

export {
  EditLabelButton
}
