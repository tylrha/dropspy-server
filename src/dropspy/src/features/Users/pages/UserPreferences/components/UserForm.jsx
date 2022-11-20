import { useContext } from 'react'
import { useForm } from "react-hook-form";

import { FormStyled, FormContainerStyled } from './user-form.style';
import { AuthContext } from '../../../../Authentication';

const UserForm = (props) => {

  const { userInfo } = useContext(AuthContext)
  const { register, handleSubmit } = useForm();

  const spyedStores = userInfo.registeredStores.filter(store => store.isSpying === true).length

  const handleUpdateForm = (oldData) => {
    console.log("update Form")
  }

  return (
    <FormContainerStyled>
      <FormStyled onSubmit={handleSubmit(handleUpdateForm)}>

        <div className="form__column">

          <div className="form__row two">
            <div className="input__title">Usuário</div>
            <input disabled defaultValue={userInfo.name} className="input__item" {...register("name", { required: true })} />
          </div>

          <div className="form__row two">
            <div className="input__title">Email</div>
            <input disabled defaultValue={userInfo.email} className="input__item" {...register("email", { required: true })} />
          </div>

          <div className="form__row two">
            <div className="input__title">Tipo de usuário</div>
            <select disabled defaultValue={userInfo.userRole} className="input__item" {...register("userRole", { required: true })}>
              <option value="user">Usuário</option>
              <option value="admin">Administrador</option>
            </select>
          </div>

          <div className="form__row two">
            <div className="input__title">Criação da conta</div>
            <input disabled defaultValue={userInfo.accountCreatedAt} className="input__item" {...register("createdAccountDate", { required: true })} />
          </div>

          <div className="form__row two">
            <div className="input__title">Data de cobrança</div>
            <input disabled defaultValue={userInfo.lastPaidDate} className="input__item" {...register("createdAccountDate", { required: true })} />
          </div>

        </div>


        <div className="form__column">

          <div className="form__row two">
            <div className="input__title">Bots autorizados</div>
            <input disabled defaultValue={userInfo.allowedStores} className="input__item" {...register("allowedSpies", { required: true })} />
          </div>

          <div className="form__row two">
            <div className="input__title">Lojas espionadas</div>
            <input disabled defaultValue={`${spyedStores}/${userInfo.allowedStores}`} className="input__item" {...register("spyingStores", { required: true })} />
          </div>
          <div className="form__row two">
            <div className="input__title">Lojas cadastradas</div>
            <input disabled defaultValue={userInfo.registeredStores.length} className="input__item" {...register("registeredStores", { required: true })} />
          </div>

          <div className="form__row two">
            <div className="input__title">Lojas favoritas</div>
            <input disabled defaultValue={userInfo.favoriteStores.length} className="input__item" {...register("favoriteStores", { required: true })} />
          </div>

          <div className="form__row two">
            <div className="input__title">Produtos favoritos</div>
            <input disabled defaultValue={userInfo.favoriteProducts.length} className="input__item" {...register("favoriteProducts", { required: true })} />
          </div>
        </div>

      </FormStyled>
    </FormContainerStyled>
  )
}

export { UserForm }
