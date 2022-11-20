import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"

import { DROPSPY_BASE_ROUTE } from "../../../configs/configs"
import { Layout } from "../../Layout"
import { AuthContext } from "../context/AuthContext"

const ShowOnlyToLogedInUsers = () => {

  const loginPage = `${DROPSPY_BASE_ROUTE}/login`

  const { isUserSigned, userInfo } = useContext(AuthContext);

  if (isUserSigned === true){

    return (
      <Layout>
        {Object.keys(userInfo).length > 0 && (
          <>
            <Outlet />
          </>
        )}
      </Layout>
    )
  } else {

    return <Navigate to={loginPage} />

  }


}

export { ShowOnlyToLogedInUsers }
