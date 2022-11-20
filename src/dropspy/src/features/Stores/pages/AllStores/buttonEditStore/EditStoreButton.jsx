import { useContext } from 'react'
import { toast } from 'react-toastify'
import { Button } from '../../../../../components/button/Button'
import { ChangeModalContent } from '../../../../../components/modal/Modal'
import { AuthContext } from '../../../../Authentication'
import { getAllCategoriesFromApi } from '../../../../Categories'
import { LayoutContext } from '../../../../Layout'
import { getStoreFromApi } from '../../../services/get-single-store-from-api'
import { EditStoreForm } from './EditStoreForm'


const EditStoreButton = (props) => {

  const {store, setStore} = props.value
  const { userId } = useContext(AuthContext)
  const {setModalContent, setModalStatus} = useContext(LayoutContext)

  const cbFunction = (data) => {
    setStore(old => ({
      ...old,
      storeCategory: data.storeCategory,
      storeLogoLink: data.storeLogoLink
    }))
  }

  const showContentInModal = () => {

    getStoreFromApi(userId, store, (storeInfo) => {

      if (Object.keys(storeInfo).length === 0){
        toast.error(`Loja não foi encontrada!`, {
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

      getAllCategoriesFromApi((categories) => {
        const categoriesArr = categories.map(item => item.name)

        ChangeModalContent({
          title: "Editar loja",
          content: <EditStoreForm value={{storeInfo, categoriesArr, cbFunction}}/>,
          setModalContent,
          setModalStatus
        })
      })



    })
  }

  return (
    <Button value={{ onclick: showContentInModal, text: `Editar loja` }} />
  )
}

export {
  EditStoreButton
}
