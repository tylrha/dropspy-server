import { ButtonContainer } from '../../../../../components/button/Button'
import { UpdateAllProductsLabelsButton } from '../buttonUpdateAllLabels/UpdateAllProductsLabelsButton';
import { AddLabelButton } from '../buttonAddLabel/AddLabelButton';

const LabelsButtons = (props) => {

  const { setLabels, setProducts } = props.value

  return (
    <ButtonContainer>
      <AddLabelButton value={{ setLabels }} />
      <UpdateAllProductsLabelsButton value={{ setLabels, setProducts }} />
    </ButtonContainer>
  )
}

export { LabelsButtons }
