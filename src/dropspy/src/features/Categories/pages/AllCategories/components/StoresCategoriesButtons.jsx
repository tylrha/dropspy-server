import { ButtonContainer } from '../../../../../components/button/Button'
import { AddCategoryButton } from '../buttonAddCategory/AddCategoryButton'

const StoresCategoriesButtons = (props) => {

  const {setStoresByCategories} = props.value
  return (
    <ButtonContainer>
      <AddCategoryButton value={{setStoresByCategories}} />
    </ButtonContainer>
  )
}

export { StoresCategoriesButtons }

