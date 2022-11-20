import { useContext } from 'react'
import { Button } from '../../../../../components/button/Button'
import { ChangeModalContent } from '../../../../../components/modal/Modal'
import { LayoutContext } from '../../../../Layout'
import { AddLabelForm } from './AddLabelForm'

const AddLabelButton = (props) => {

  const {setLabels} = props.value
  const {setModalContent, setModalStatus} = useContext(LayoutContext)

  const showContentInModal = () => {
    ChangeModalContent({
      title: "Adicionar etiqueta",
      content: <AddLabelForm value={{setLabels}}/>,
      setModalContent,
      setModalStatus
    })
  }

  return (
    <Button value={{ onclick: showContentInModal, text: `Adicionar etiqueta` }} />
  )
}

export {
  AddLabelButton
}
