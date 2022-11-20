import { Button, ButtonContainer } from '../../../../../components/button/Button'
import styled from 'styled-components'

import {LabelsContainerStyles, ProductDetailsStyles} from '../SingleProduct.styles'
import { useContext } from 'react'
import { AuthContext } from '../../../../Authentication'
import { handleUserFavoriteProducts }  from '../../../../Users'

const FavoriteStyled = styled.div`
  color: red;
  text-align: center;
  font-size: 2rem;

  div > i {
    cursor: pointer;
  }
`

const getProductCardsObj = (curProduct) => {

  return {
    totalRevenue: Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(curProduct.totalRevenue),
    totalSales: curProduct.totalSales,
    totalDates: curProduct.totalDates,
    totalLabels: curProduct.totalLabels,
    storeLink: curProduct.storeLink,
    storeName: curProduct.storeName,
    productName: curProduct.productName,
    productImage: curProduct.productImage,
    productLink: curProduct.productLink,
  }

}

const ProductIntroStyled = styled.div`
  /* display: grid;
  grid-template-columns: repeat(2, 1fr); */
`

const ProductIntro = (props) => {

  const { product } = props.value
  const { labels } = product

  const { userId, userInfo, updateFavoriteProductsList } = useContext(AuthContext)
  const FAVORITE_PRODUCTS = userInfo.favoriteProducts.map(item => item.productLink)
  const isFavorite = Array.from(FAVORITE_PRODUCTS).indexOf(props.value.product.productLink) > -1

  const {
    storeLink,
    storeName,
    productName,
    productImage,
    productLink
  } = getProductCardsObj(props.value.product)


  const handleVisitProduct = (e) => {
    e.preventDefault();
    window.open(productLink, "_blank");
  }

  const handleVisitStore = (e) => {
    e.preventDefault();
    window.open(`/dropspy/stores/view?storeLink=${storeLink}`, "_blank");
  }

  const handleFavoriteProduct = (e) => {
    const storeHeartEl = e.target
    const productLink = storeHeartEl.parentElement.getAttribute('product')
    handleUserFavoriteProducts({ mode: 'add', productLink, userId }, (data) => {
      updateFavoriteProductsList(data.favoriteProducts)
    })
  }

  const handleUnfavoriteProduct = (e) => {
    const storeHeartEl = e.target
    const productLink = storeHeartEl.parentElement.getAttribute('product')
    handleUserFavoriteProducts({ mode: 'remove', productLink, userId }, (data) => {
      updateFavoriteProductsList(data.favoriteProducts)
    })
  }


  return (

    <ProductIntroStyled>
      <ProductDetailsStyles>
        <img src={productImage} alt="product" />
        <p className="productName">{productName}</p>
        <p>{storeName.toString().toUpperCase()}</p>
        {(labels.length > 0) && (
          <LabelsContainerStyles>
            {labels.map((item) => {
              return (
                <a target="_blank" rel="noreferrer" href={`/dropspy/labels/view?label=${item.name}`} key={item.name} className={`label ${item.type}`}>{item.name}</a>
              )
            })}
          </LabelsContainerStyles>
        )}
      </ProductDetailsStyles>
      <FavoriteStyled>
        {isFavorite ? (
          <div product={product.productLink}>
            <i onClick={handleUnfavoriteProduct} className='isFavorite favorite bx bxs-heart'></i>
          </div>
        ) : (
          <div product={product.productLink}>
            <i onClick={handleFavoriteProduct} className='isFavorite bx bx-heart'></i>
          </div>
        )}
      </FavoriteStyled>
      <ButtonContainer direction="row">
        <Button value={{ onclick: handleVisitProduct, text: `Visitar produto` }} />
        <Button value={{ onclick: handleVisitStore, text: `Detalhes da loja` }} />
      </ButtonContainer>

    </ProductIntroStyled>
  )
}

export {ProductIntro}
