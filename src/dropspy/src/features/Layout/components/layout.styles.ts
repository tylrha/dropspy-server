import styled from 'styled-components'

const PageContentStyled = styled.div`

  padding: var(--default-padding) 0;
  margin-top: calc(var(--header-height));

  &.show__menu {
    margin-top: calc(var(--header-height));
    margin-left: calc(var(--nav-width));
  }

  @media screen and (min-width: 768px){

    margin-top: calc(var(--header-height));
    margin-left: calc(var(--nav-width));

    &.show__menu {
      margin-top: calc(var(--header-height) + var(--header-plus-height));
      margin-left: calc(var(--nav-width) + var(--nav-expanded-plus-width));
    }

  }

`

export {
  PageContentStyled
}
