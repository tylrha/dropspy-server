import { AuthContext } from "../../../../Authentication";
import { useContext } from "react";
import { handleUserRegisteredStores } from "../../../../Users/services/handle-user-registered-stores";
import { toast } from "react-toastify";

const ButtonIsSpyingStore = ({ value }) => {

  const { storeLink, isSpying, editable } = value // isSpying,
  const { userId, updateRegisteredStoresList } = useContext(AuthContext)
  // const isSpying = userInfo.registeredStores.find(item => item.storeLink === storeLink).isSpying

  const handleActiveSpyInStore = (e) => {
    const storeHeartEl = e.target
    const storeLink = storeHeartEl.parentElement.getAttribute('store')

    if (editable === false){return}

    handleUserRegisteredStores({ storeLink, userId, mode: true }, (data) => {

      if (data.error) {
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
        updateRegisteredStoresList(storeLink, true)

        toast.success(`Loja ${storeLink} foi ativada com sucesso!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      }

    })
  }

  const handleInactivateSpyInStore = (e) => {
    const storeHeartEl = e.target
    const storeLink = storeHeartEl.parentElement.getAttribute('store')

    if (editable === false){return}

    handleUserRegisteredStores({ storeLink, userId, mode: false }, (data) => {

      if (data.error) {
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
        updateRegisteredStoresList(storeLink, false)
        toast.success(`Loja ${storeLink} foi desativada com sucesso!`, {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }

    })
  }

  return (
    <>
      {isSpying ? (
        <div className="cellAction" store={storeLink} onClick={handleInactivateSpyInStore}>
          <i className='isSpying active bx bxs-bot'></i>
        </div>
      ) : (
        <div className="cellAction" store={storeLink} onClick={handleActiveSpyInStore}>
          <i className='isSpying inactive bx bxs-bot'></i>
        </div>
      )}
    </>
  )
}

export { ButtonIsSpyingStore }
