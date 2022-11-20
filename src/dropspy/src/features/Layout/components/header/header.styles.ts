import styled from 'styled-components'

const HeaderStyled = styled.header`
width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content:space-between;
  background-color: var(--first-color-alt);
  z-index: var(--z-fixed);
  transition: .5s;
  color: (--text-color-alt);
  padding: 0 1rem;
  height: var(--header-height);

  &.body-pd {
    padding: 0 1rem 0 calc(var(--nav-width) + 1rem);
  }

  .header__toggle{
    font-size: 1.5rem;
    cursor: pointer;
    color: var(--text-color-alt);
  }

  .header__title {
    font-weight: bold;
    text-transform: uppercase;
    color: var(--text-color-alt);

    .loading {
      color: red;
    }
  }

  .header__options {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  @media screen and (min-width: 768px){

    height: calc(var(--header-height));
    padding: 0 1rem 0 calc(var(--nav-width) + 1rem);

    &.body-pd {
      height: calc(var(--header-height) + var(--header-plus-height));
      padding: 0 1rem 0 calc(var(--nav-width) + var(--nav-expanded-plus-width));
    }

    .header__options {
      .header__img{
        width: 40px;
        height: 40px;

        img{
          width: 45px;
        }
      }
    }

  }


`

export {
  HeaderStyled
}
