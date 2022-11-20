import styled from 'styled-components'

const ModalStyled = styled.div`
  z-index: 1;
  /* margin-left: var(--nav-width); */
  width: 100%; // calc(100vw - var(--nav-width));
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
`

const ModalOverlayStyled = styled.div`
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: fixed;
  background: var(--overlay--color);
`

const ModalContentStyled = styled.div`
  position: absolute;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  line-height: 1.4;
  background: var(--background-color-alt);
  color: var(--text-color);
  padding: 14px 28px;
  border-radius: 3px;
  max-width: 600px;
  min-width: 300px;
  cursor: initial;
`

const ModalTitleStyled = styled.h2`
  margin: 0 auto;
  text-align: center;
  margin-bottom: 15px;
`

const CloseModalStyled = styled.i`
  position: absolute;
  top: 5px;
  right: 5px;
  padding: 3px;
  cursor: pointer;
  background: rgba(49,49,49,0.8);
`

/* -------------------------------------------------------------------------- */

const ModalContainerStyled = styled.div`
  &.active-modal{
    overflow-y: hidden;
  }
`

/* -------------------------------------------------------------------------- */

export {
  ModalStyled,
  ModalOverlayStyled,
  ModalContentStyled,
  ModalTitleStyled,
  CloseModalStyled,

  ModalContainerStyled
}
