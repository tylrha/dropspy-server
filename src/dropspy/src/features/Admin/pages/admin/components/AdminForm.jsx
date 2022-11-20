import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { API_EDIT_ADMIN_INFO_ROUTE } from "../../../../../routes/api-routes";
import { api } from "../../../../../services/api";
import { FormStyled, FormContainerStyled } from './admin-form.style';

const AdminForm = (props) => {

  const { register, handleSubmit } = useForm();
  const { adminInfo } = props.value

  const handleAdminEdit = async (data) => {

    const { botStatus, serverStatus, currentServer } = data
    const response = await api.post(API_EDIT_ADMIN_INFO_ROUTE, { botStatus, serverStatus, currentServer })

    if (response.data.error) {
      toast.error(response.data.error, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success(`Informações atualizadas com sucesso!`, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    }

  }

  return (
    <>
      {Object.keys(adminInfo).length > 0 && (
        <FormContainerStyled>
          <FormStyled onSubmit={handleSubmit(() => console.log("update Form"))}>

            <div className="form__column">
              <div className="form__row two">
                <div className="input__title">Status de bots</div>
                <select defaultValue={adminInfo?.botStatus} className="input__item" {...register("botStatus", { required: true })}>
                  <option value="active">Ativo</option>
                  <option value="stand-by">Em espera</option>
                  <option value="inactive">Inativo</option>
                </select>
              </div>

              <div className="form__row two">
                <div className="input__title">Status do servidor</div>
                <select defaultValue={adminInfo?.serverStatus} className="input__item" {...register("serverStatus", { required: true })}>
                  <option value="active">Ativo</option>
                  <option value="maintance">Em manutenção</option>
                </select>
              </div>

              <div className="form__row two">
                <div className="input__title">Servidor atual</div>
                <select defaultValue={adminInfo?.currentServer} className="input__item" {...register("currentServer", { required: true })}>
                  <option value="https://instigare-midia.herokuapp.com/">instigare-midia</option>
                  <option value="https://instigare-backup.herokuapp.com/">instigare-backup</option>
                </select>
              </div>

              <div className="form__row one button">
                <div onClick={handleSubmit(handleAdminEdit)}>SALVAR</div>
              </div>

            </div>

            <div className="form__column">

              <div className="form__row two">
                <div className="input__title">Usuários</div>
                <input disabled defaultValue={adminInfo.usersCount} className="input__item" {...register("usersCount")} />
              </div>

              <div className="form__row two">
                <div className="input__title">Bots</div>
                <input disabled defaultValue={adminInfo.botsCount} className="input__item" {...register("botsCount")} />
              </div>

              <div className="form__row two">
                <div className="input__title">Lojas</div>
                <input disabled defaultValue={adminInfo.storesCount} className="input__item" {...register("storesCount")} />
              </div>

              <div className="form__row two">
                <div className="input__title">Datas</div>
                <input disabled defaultValue={adminInfo.datesCount} className="input__item" {...register("datesCount")} />
              </div>

              <div className="form__row two">
                <div className="input__title">Produtos</div>
                <input disabled defaultValue={adminInfo.productsCount} className="input__item" {...register("productsCount")} />
              </div>

              <div className="form__row two">
                <div className="input__title">Etiquetas</div>
                <input disabled defaultValue={adminInfo.labelsCount} className="input__item" {...register("labelsCount")} />
              </div>

              <div className="form__row two">
                <div className="input__title">Categorias</div>
                <input disabled defaultValue={adminInfo.categoriesCount} className="input__item" {...register("categoriesCount")} />
              </div>

            </div>

          </FormStyled>
        </FormContainerStyled>
      )}
    </>
  )
}

export { AdminForm }
