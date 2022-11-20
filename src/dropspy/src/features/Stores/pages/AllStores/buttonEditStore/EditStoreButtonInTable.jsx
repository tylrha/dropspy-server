import { useContext } from 'react'
import { toast } from 'react-toastify'
import { ChangeModalContent } from '../../../../../components/modal/Modal'
import { AuthContext } from '../../../../Authentication'
import { getAllCategoriesFromApi } from '../../../../Categories'
import { LayoutContext } from '../../../../Layout'
import { getStoreFromApi } from '../../../services/get-single-store-from-api'
import { EditStoreForm } from './EditStoreForm'


const EditStoreButtonInTable = (props) => {

  const {store, setStores} = props.value
  const {setModalContent, setModalStatus} = useContext(LayoutContext)
  const { userId } = useContext(AuthContext)

  const cbFunction = (oldData) => {
    setStores(old => {
      const newStores = [...old]
      const storeIndex = newStores.findIndex(oldStore => oldStore.storeLink === oldData.storeLink)
      newStores[storeIndex].storeCategory = oldData.storeCategory
      newStores[storeIndex].storeLogoLink = oldData.storeLogoLink
      return newStores
    })
  }

  const showContentInModal = () => {

    getStoreFromApi(userId, store, (storeInfo) => {

      if (Object.keys(storeInfo).length === 0){
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
    <div className="viewButton" onClick={showContentInModal}>Editar</div>
  )
}

export {
  EditStoreButtonInTable
}
