import { ButtonContainer } from '../../../../../components/button/Button'
import { AddStoreButton } from '../buttonAddStore/AddStoreButton';

const StoresButtons = (props) => {

  const { setStores, categories } = props.value

  return (
    <ButtonContainer>
      <AddStoreButton value={{ setStores, categories }} />
    </ButtonContainer>
  )
}

export { StoresButtons }
