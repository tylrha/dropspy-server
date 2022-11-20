import { AuthContext } from "../../../../Authentication";
import { useContext } from "react";
import { handleUserFavoriteProducts }  from '../../../../Users'

const ButtonIsFavoriteProduct = ({value}) => {

  const { userId, userInfo, updateFavoriteProductsList } = useContext(AuthContext)
  const FAVORITE_PRODUCTS = userInfo.favoriteProducts.map(item => item.productLink)
  const isFavorite = Array.from(FAVORITE_PRODUCTS).indexOf(value.productLink) > -1

  const handleFavoriteProduct = (e) => {
    const productHeartEl = e.target
    const productLink = productHeartEl.parentElement.getAttribute('product')
    console.log("Favorita aí: " + productLink)
    handleUserFavoriteProducts({mode: 'add', productLink, userId}, (data) => {
      updateFavoriteProductsList(data.favoriteProducts)
    })
  }

  const handleUnfavoriteProduct = (e) => {
    const productHeartEl = e.target
    const productLink = productHeartEl.parentElement.getAttribute('product')
    console.log("Desfavorita aí: " + productLink)
    handleUserFavoriteProducts({mode: 'remove', productLink, userId}, (data) => {
      updateFavoriteProductsList(data.favoriteProducts)
    })
  }

  return (
    <>
      {isFavorite ? (
        <div className="cellAction" product={value.productLink} onClick={handleUnfavoriteProduct}>
          <i className='isFavorite favorite bx bxs-heart'></i>
        </div>
      ) : (
        <div className="cellAction" product={value.productLink} onClick={handleFavoriteProduct}>
          <i className='isFavorite bx bx-heart'></i>
        </div>
      )}
    </>
  )
}

export { ButtonIsFavoriteProduct }
