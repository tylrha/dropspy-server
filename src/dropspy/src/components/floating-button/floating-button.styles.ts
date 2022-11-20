import styled from 'styled-components'

const FabStyled = styled.div`
  position:fixed;
  bottom: 20px;
  right: 50px;
  text-align:center;

  button {
    background-color: var(--first-color);
    /* margin-top: 22px; */
  }
`

const FloatingContentStyled = styled.div`

  display: grid;
  grid-template-columns: repeat(${(props: any) => props.columns ? props.columns : 1}, 1fr);
  gap: 15px;

  p {
    text-align: center;
  }

  div {
    /* background-color: red; */
  }

  .action__buttons {

  }

  .action__filters {

  }

`

export {
  FabStyled,
  FloatingContentStyled
}
