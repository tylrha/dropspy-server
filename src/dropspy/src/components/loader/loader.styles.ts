import styled from 'styled-components'

const LoaderContainerStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`

const LoaderTextStyled = styled.div`
  margin-bottom: 15px;
`

const LoaderInnerContainerStyled = styled.div`

`

const LoaderStyled = styled.div`
  width: 100px;
  height: 100px;
  border: 10px solid #f3f3f3;
  border-top: 10px solid #383636;
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`

const SpanLoaderStyled = styled.span`
  margin-left: 10px;
  animation: spin 1s infinite ease-in-out;
  border-radius: 50%;
  border-top: 2px solid #fff;
  display: inline-block;
  height: 1.5rem;
  width: 1.5rem;
  position: absolute;

  @keyframes spin {
    100% {
      -webkit-transform: rotate(360deg);
      -moz-transform: rotate(360deg);
      -o-transform: rotate(360deg);
      transform: rotate(360deg);
    }
  }

`

export {
  LoaderContainerStyled,
  LoaderTextStyled,
  LoaderInnerContainerStyled,
  LoaderStyled,
  SpanLoaderStyled
}
