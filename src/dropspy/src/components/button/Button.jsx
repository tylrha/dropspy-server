import { MobileView } from 'react-device-detect';
import {ButtonContainerStyled, ButtonStyled} from './button.styles'

const Button = (props) => {

  const { text, onclick, onlyMobile } = props.value

  const Button = () => <ButtonStyled onClick={onclick}>{text}</ButtonStyled>

  if (onlyMobile) {
    return (
      <MobileView>
        <Button />
      </MobileView>
    )
  } else {
    return <Button />
  }

}

const ButtonContainer = (props) => {

  const {direction} = props

  return (
    <ButtonContainerStyled direction={direction}>
      {props.children}
    </ButtonContainerStyled>
  )

}

export {
  Button,
  ButtonContainer
}

