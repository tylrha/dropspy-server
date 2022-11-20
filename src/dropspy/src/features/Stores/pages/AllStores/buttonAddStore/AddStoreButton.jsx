import { useContext } from 'react'
import { Button } from '../../../../../components/button/Button'
import { ChangeModalContent } from '../../../../../components/modal/Modal'
import { LayoutContext } from '../../../../Layout'
import { AddStoreForm } from './AddStoreForm'


const AddStoreButton = (props) => {

  const {setStores, categories} = props.value
  const {setModalContent, setModalStatus} = useContext(LayoutContext)

  const showContentInModal = () => {
    ChangeModalContent({
      title: "Adicionar loja",
      content: <AddStoreForm value={{setStores, categories}}/>,
      setModalContent,
      setModalStatus
    })
  }

  return (
    <Button value={{ onclick: showContentInModal, text: `Adicionar loja` }} />
  )
}

export {
  AddStoreButton
}
