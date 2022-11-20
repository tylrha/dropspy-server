import { toast } from 'react-toastify';
import { useContext } from 'react'
import { LayoutContext } from '../../../../Layout/context/LayoutContext';

import { updateLabelsInAllProducts } from '../../../services/update-labels-in-all-products';
import { getLabelsArrFromProducts } from '../../../utils/get-labels-from-products-array';
import { getNoLabeledProductsData } from '../../../utils/get-no-labeled-products-data';
import { Button } from '../../../../../components/button/Button';

const updateLabelsInAllProductsStart = (setLabels, setProducts, cbFunction) => {

  let loadedProductsArr = []

  const handleUpdateLabelsResponse = (updatedProductsData) => {

    console.log(updatedProductsData)

    const { allProducts: curProducts } = updatedProductsData

    console.log(`Analisados: ${curProducts.length}`)

    if (curProducts.length === 0) {
      cbFunction({ totalProducts: loadedProductsArr.length })
      return;
    }

    loadedProductsArr.push(...curProducts)
    setProducts(loadedProductsArr)

    setLabels([...getLabelsArrFromProducts(loadedProductsArr), getNoLabeledProductsData(loadedProductsArr)])

    updateLabelsInAllProducts(loadedProductsArr.length, handleUpdateLabelsResponse)
  }

  setLabels([])
  setProducts([])
  updateLabelsInAllProducts(loadedProductsArr.length, handleUpdateLabelsResponse)

}

const UpdateAllProductsLabelsButton = (props) => {

  const { setLabels, setProducts } = props.value
  const { setIsLoading } = useContext(LayoutContext)

  const handleUpdateProductsLabels = () => {

    setIsLoading(true)

    toast(`Processo de adição de etiquetas iniciado!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    updateLabelsInAllProductsStart(setLabels, setProducts, (data) => {

      const { totalProducts } = data
      setIsLoading(false)

      toast.success(`As etiquetas foram atualizadas em[${totalProducts}] produtos!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })

    })
  }

  return (
    <Button value={{ onclick: handleUpdateProductsLabels, text: `Atualizar etiquetas` }} />
  )

}

export { UpdateAllProductsLabelsButton }
