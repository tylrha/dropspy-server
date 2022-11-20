import { useContext } from 'react'
import { Button } from '../../../../../components/button/Button'
import { ChangeModalContent } from '../../../../../components/modal/Modal'
import { LayoutContext } from '../../../../Layout'
import { AddCategoryForm } from './AddCategoryForm'

const AddCategoryButton = (props) => {

  const {setStoresByCategories} = props.value
  const {setModalContent, setModalStatus} = useContext(LayoutContext)

  const showContentInModal = () => {
    ChangeModalContent({
      title: "Adicionar categoria",
      content: <AddCategoryForm value={{setStoresByCategories}}/>,
      setModalContent,
      setModalStatus
    })
  }

  return (
    <Button value={{ onclick: showContentInModal, text: `Adicionar categoria` }} />
  )
}

export {
  AddCategoryButton
}
