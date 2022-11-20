import styled from 'styled-components'

const ButtonStyled = styled.button`

  background-color: var(--first-color-alt);
  color: var(--text-color-alt);
  display: inline-block;
  cursor: pointer;
  border-radius: 100px;
  padding: 7px 20px;
  text-align: center;
  text-decoration: none;
  transition: all 250ms;
  border: 0;
  font-size: 16px;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:hover {
    transform: scale(1.05) rotate(-1deg);
  }
`

const ButtonContainerStyled = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: ${(props: any) => props.direction ? props.direction : "column"};
  align-items: center;
  justify-content: center;
  gap: 15px;
`

export {
  ButtonStyled,
  ButtonContainerStyled
}
