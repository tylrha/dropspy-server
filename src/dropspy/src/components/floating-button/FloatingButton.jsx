import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { FabStyled } from './floating-button.styles';
import { ChangeModalContent } from '../modal/Modal';

import { useContext } from 'react';
import { LayoutContext } from '../../features/Layout';

const FloatingButton = (props) => {

  const { setModalContent, setModalStatus } = useContext(LayoutContext)

  const showContentInModal = () => {
    ChangeModalContent({
      title: props.title,
      content: props.children,
      setModalContent,
      setModalStatus
    })
  }

  return (
    <FabStyled>
      <Fab onClick={showContentInModal} size="small" color="secondary" aria-label="add">
        <AddIcon />
      </Fab>
    </FabStyled>
  )
}

export { FloatingButton }
