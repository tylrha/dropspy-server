import styled from 'styled-components'

const SidebarStyled = styled.div`
// display: none;
  position: fixed;
  top: 0;
  left: -30%;
  width: var(--nav-width);
  height: 100vh;
  background-color: var(--first-color);
  padding: .5rem 1rem 0 0;
  transition: .5s;
  z-index: var(--z-fixed);

  &.show{
    left: 0;
  }

  .nav{
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow: hidden;

    .nav__things {

      .nav__logo{
        color: var(--text-color-alt);
        margin-bottom: 2rem;

        .nav__logo-icon{
          font-size: 1.25rem;
        }

        .nav__logo-name {
          font-weight: 700;
        }
      }

    }

    .nav__logout, .nav__preferences {
      cursor: pointer;
    }

  }

  .nav__link{
    position: relative;
    color: var(--inative-color);
    margin-bottom: 1.5rem;
    transition: .3s;

    &:hover{
      color: var(--active-color);
    }

    &.active{
      color: var(--active-color);

      &::before{
        content: '';
        position: absolute;
        left: 0;
        width: 2px;
        height: 32px;
        background-color: var(--active-color);
      }
    }

    .nav__icon{
      font-size: 1.25rem;
    }

  }

  .nav__item {
    display: grid;
    grid-template-columns: max-content max-content;
    align-items: center;
    column-gap: 1rem;
    padding: .3rem 0 .3rem 1.5rem;
  }



  @media screen and (min-width: 768px){

    left: 0;
    padding: 1rem 1rem 0 0;

    /*Show navbar desktop*/
    &.show{
      width: calc(var(--nav-width) + var(--nav-expanded-plus-width));
    }

  }

`

export {
  SidebarStyled
}
