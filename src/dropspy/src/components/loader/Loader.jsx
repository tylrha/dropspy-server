import {
  LoaderContainerStyled,
  LoaderTextStyled,
  LoaderInnerContainerStyled,
  LoaderStyled,
  SpanLoaderStyled
} from './loader.styles'

const Loader = (props) => {
  return (
    <LoaderContainerStyled>
      <LoaderTextStyled>{props.text}</LoaderTextStyled>
      <LoaderInnerContainerStyled>
        <LoaderStyled />
      </LoaderInnerContainerStyled>
    </LoaderContainerStyled>
  )
}

const SpanLoader = () => {
  return (
    <SpanLoaderStyled />
  )
}

export {Loader}
export {SpanLoader}
