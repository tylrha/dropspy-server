import {ContainerStyled, ContainerTitleStyled} from './container.styles'

const Container = (props) => {

  return (
    <ContainerStyled>
      {props.title && (<ContainerTitleStyled>{props.title}</ContainerTitleStyled>)}
      {props.children}
    </ContainerStyled>
  );
}

export {Container}
