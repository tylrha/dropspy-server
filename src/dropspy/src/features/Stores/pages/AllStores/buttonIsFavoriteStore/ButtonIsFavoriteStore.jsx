import { AuthContext } from "../../../../Authentication";
import { useContext } from "react";
import { handleUserFavoriteStores } from '../../../../Users';
import { toast } from "react-toastify";



const ButtonIsFavoriteStore = ({value}) => {

  const { userId, userInfo, updateFavoriteStoresList } = useContext(AuthContext)
  const FAVORITE_STORES = userInfo.favoriteStores.map(item => item.storeLink)
  const isFavorite = Array.from(FAVORITE_STORES).indexOf(value.storeLink) > -1

  const handleFavoriteStore = (e) => {
    const storeHeartEl = e.target
    const storeLink = storeHeartEl.parentElement.getAttribute('store')
    handleUserFavoriteStores({mode: 'add', storeLink, userId}, (data) => {

      if (data.error){
        toast.error(data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success(`Loja ${storeLink} foi favoritada com sucesso!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        updateFavoriteStoresList(data.favoriteStores)
      }
    })
  }

  const handleUnfavoriteStore = (e) => {
    const storeHeartEl = e.target
    const storeLink = storeHeartEl.parentElement.getAttribute('store')
    handleUserFavoriteStores({mode: 'remove', storeLink, userId}, (data) => {

      if (data.error){
        toast.error(data.error, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      } else {
        toast.success(`Loja ${storeLink} foi desfavoritada com sucesso!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        updateFavoriteStoresList(data.favoriteStores)
      }
    })
  }

  return (
    <>
      {isFavorite ? (
        <div className="cellAction" store={value.storeLink} onClick={handleUnfavoriteStore}>
          <i className='isFavorite favorite bx bxs-heart'></i>
        </div>
      ) : (
        <div className="cellAction" store={value.storeLink} onClick={handleFavoriteStore}>
          <i className='isFavorite bx bx-heart'></i>
        </div>
      )}
    </>
  )
}

export { ButtonIsFavoriteStore }
