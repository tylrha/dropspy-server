import { Navigate } from "react-router-dom"
import { useState, useContext } from "react"

import { api } from "../../../../services/api"
import { LoginStyled } from './login.styles'
import { API_CREATE_URSER_ROUTE } from "../../../../routes/api-routes"

import { AuthContext } from "../../../Authentication"

const Login = () => {

  const { signIn, isUserSigned } = useContext(AuthContext)

  const [subname, setSubname] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [subemail, setSubemail] = useState("")
  const [subpassword, setSubpassword] = useState("")

  const handleSignUp = async (e: any) => {

    e.preventDefault()

    const data = {
      name: subname,
      email: subemail,
      password: subpassword,
    }

    const createResult = await api.post(API_CREATE_URSER_ROUTE, data)

    if (Object.keys(createResult.data).indexOf("error") > -1) {
      alert(createResult.data.error)
    } else {
      alert("Usuário criado com sucesso!")
    }

  }

  const handleLogin = async (e: any) => {
    e.preventDefault()
    const data = { email, password }
    await signIn(data)
  }

  if (isUserSigned) { return <Navigate to="/" /> }

  document.body.setAttribute('style', 'min-height: 100vh; overflow-y: hidden; background: linear-gradient(to bottom, #0f0c29, #302b63, #24243e); padding: 0; margin: 0;')

  return (
    <LoginStyled>
      <input type="checkbox" id="chk" aria-hidden="true" />

      <div className="login">
        <form onSubmit={handleLogin} >
          <label htmlFor="chk" aria-hidden="true">Entrar</label>
          <input type="email" name="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <input type="password" name="pswd" placeholder="Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
          <button className="button">Entrar</button>
        </form>
      </div>

      <div className="signup">
        <form autoComplete="off" onSubmit={handleSignUp}>
          <label htmlFor="chk" aria-hidden="true">Criar conta</label>
          <input type="text" name="txt" placeholder="Nome" autoComplete="off" value={subname} onChange={(e) => setSubname(e.target.value)} />
          <input type="email" name="email2" placeholder="Email" autoComplete="off" value={subemail} onChange={(e) => setSubemail(e.target.value)} />
          <input type="password" name="pswd2" placeholder="Senha" autoComplete="off" value={subpassword} onChange={(e) => setSubpassword(e.target.value)} />
          <button className="button">Criar conta</button>
        </form>
      </div>

    </LoginStyled>
  )

}

export { Login }
