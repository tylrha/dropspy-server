import { useContext } from "react"
import { Navigate, Outlet } from "react-router-dom"
import { Layout } from "../../Layout";
import { AuthContext } from "../context/AuthContext"

const ShowOnlyToAdminUsers = () => {

  const { isUserAdmin, userInfo } = useContext(AuthContext);

  if (isUserAdmin === true || Object.keys(userInfo).length === 0){

    return (
      <Layout>
        {isUserAdmin === true && (
          <>
            <Outlet />
          </>
        )}
      </Layout>
    )
  } else {

    return <Navigate to="/" />

  }

}

export { ShowOnlyToAdminUsers }
