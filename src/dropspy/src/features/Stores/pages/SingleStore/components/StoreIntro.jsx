import { useContext } from 'react';
import { Button, ButtonContainer } from '../../../../../components/button/Button';
import { AuthContext } from '../../../../Authentication';

import { handleUserFavoriteStores } from '../../../../Users';

import styled from 'styled-components'
import { EditStoreButton } from '../../AllStores/buttonEditStore/EditStoreButton';

const StoreStyled = styled.div`
  margin-top: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  text-transform: uppercase;

  img {
    max-width: 200px;
    margin-bottom: 10px;
  }

  .store-row {
    margin-bottom: 4px;

    &.category {
      background-color: var(--background-color-alt);
      margin: 5px 15px;
      cursor: pointer;
      color: rgb(70, 184, 4);
    }
  }

`

const FavoriteStyled = styled.div`
  color: red;
  text-align: center;
  font-size: 2rem;

  div > i {
    cursor: pointer;
  }
`

const StoreIntro = (props) => {

  const { store, setStore } = props.value

  const { userId, userInfo, updateFavoriteStoresList } = useContext(AuthContext)
  const FAVORITE_STORES = userInfo.favoriteStores.map(item => item.storeLink)
  const isFavorite = Array.from(FAVORITE_STORES).indexOf(store.storeLink) > -1

  const handleVisitPage = (e) => {
    e.preventDefault();
    window.open(store.storeLink, "_blank");
  }

  const handleFavoriteStore = (e) => {
    const storeHeartEl = e.target
    const storeLink = storeHeartEl.parentElement.getAttribute('store')
    handleUserFavoriteStores({ mode: 'add', storeLink, userId }, (data) => {
      updateFavoriteStoresList(data.favoriteStores)
    })
  }

  const handleUnfavoriteStore = (e) => {
    const storeHeartEl = e.target
    const storeLink = storeHeartEl.parentElement.getAttribute('store')
    handleUserFavoriteStores({ mode: 'remove', storeLink, userId }, (data) => {
      updateFavoriteStoresList(data.favoriteStores)
    })
  }

  return (
    <>

      <StoreStyled>
        {store.storeLogoLink && (<img src={store.storeLogoLink} alt="store" />)}
        <div className="store-row">{store.storeName}</div>
        <a target="_blank" rel="noreferrer" href={`/dropspy/categories/view?category=${store.storeCategory}`} className="store-row category">{store.storeCategory}</a>
      </StoreStyled>

      <FavoriteStyled>
        {isFavorite ? (
          <div store={store.storeLink}>
            <i onClick={handleUnfavoriteStore} className='isFavorite favorite bx bxs-heart'></i>
          </div>
        ) : (
          <div store={store.storeLink}>
            <i onClick={handleFavoriteStore} className='isFavorite bx bx-heart'></i>
          </div>
        )}
      </FavoriteStyled>
      <ButtonContainer direction="row">
        <Button value={{ onclick: handleVisitPage, text: `Visitar loja` }} />
        <EditStoreButton value={{ store: store.storeLink, setStore }} />
      </ButtonContainer>
    </>
  )
}

export { StoreIntro }
