import {
  CloseModalStyled,
  ModalContainerStyled,
  ModalContentStyled,
  ModalOverlayStyled,
  ModalStyled,
  ModalTitleStyled
} from './modal.styles'

const ChangeModalContent = (props) => {

  const { title, content } = props
  const { setModalContent, setModalStatus } = props

  setModalStatus(true)
  setModalContent({ title, content })
}

const ModalContainer = (props) => {

  const { modalStatus, setModalStatus, modalContent, setModalContent } = props.value
  const handleCloseModal = () => {
    setModalStatus(old => !old)
    setModalContent(null)
  };

  return (
    <ModalContainerStyled className="modalContainer">
      {modalStatus && (
        <ModalStyled>
          <ModalOverlayStyled onClick={handleCloseModal}></ModalOverlayStyled>
          <ModalContentStyled>
            <ModalTitleStyled>{modalContent.title}</ModalTitleStyled>
            {modalContent.content}
            <CloseModalStyled onClick={handleCloseModal} className='bx bx-x'></CloseModalStyled>
          </ModalContentStyled>
        </ModalStyled>
      )}
    </ModalContainerStyled>
  )
}

export {
  ModalContainer,
  ChangeModalContent
}
