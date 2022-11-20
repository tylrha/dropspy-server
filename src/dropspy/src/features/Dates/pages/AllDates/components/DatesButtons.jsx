import { toast } from 'react-toastify';
import { Button, ButtonContainer } from '../../../../../components/button/Button'

const DatesButttons = () => {

  const handleUpdateDates = () => {
    toast(`Processo de atualização de datas iniciado!`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  return (
    <ButtonContainer>
      <Button value={{ onclick: handleUpdateDates , text: `Atualizar datas` }} />
    </ButtonContainer>
  )
}

export { DatesButttons }
