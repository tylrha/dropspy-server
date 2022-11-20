import styled from 'styled-components'

const ContainerStyled = styled.div`
  // border: 1px solid var(--text-color-alt);
  padding: var(--default-padding);
  color: var(--text-color);
  margin-bottom: 15px;
`

const ContainerTitleStyled = styled.div`
  margin-bottom: 10px;
  color: var(--first-color);
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
`

export {
  ContainerStyled,
  ContainerTitleStyled
}
