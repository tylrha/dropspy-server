import { createContext, useEffect, useMemo, useState } from "react"
import { Navigate } from "react-router-dom"
import { API_AUTHENTICATE_URSER_ROUTE, GET_USER_INFORMATION_ROUTE } from "../../../routes/api-routes"

import { useLocalStorage } from "../../../services/use-local-storage"
import { api } from "../../../services/api"
import { checkIfTokenHasExpired } from "../utils/check-if-token-has-expired"
import { decodeJwtToken } from "../utils/decode-token"

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {

  const [userToken, setUserToken] = useLocalStorage('token', null) // eslint-disable-line
  const [userInfo, setUserInfo] = useState({})
  const userId = useMemo(() => userToken !== null ? decodeJwtToken(userToken).id : null, [userToken])

  useEffect(() => {
    (async () => {
      if (userId === null) { return }
      const response = await api.get(`${GET_USER_INFORMATION_ROUTE}?user_id=${userId}`)

      if (response.data.error) {
        console.log(`Erro ao obter informações: ${response.data.error}`)
      } else {
        setUserInfo(response.data)
      }
    })()
  }, [userId])

  if (userToken !== null && api.defaults.headers.common.hasOwnProperty('Authorization') === false) {
    api.defaults.headers.common["Authorization"] = `Bearer ${userToken}`
    // console.log("Setted user token to access api")
  }

  const addStoreToRegisteredStoresList = (storeObj) => {
    setUserInfo(old => ({
      ...old,
      registeredStores: [...old.registeredStores, storeObj]
    }))
  }

  const updateRegisteredStoresList = (storeLink, newMode) => {
    setUserInfo(old => ({
      ...old,
      registeredStores: old.registeredStores.map((store) => store.storeLink === storeLink ? {...store, isSpying: newMode} : store)
    }))
  }

  const updateFavoriteStoresList = (newStoresList) => {
    setUserInfo(old => ({
      ...old,
      favoriteStores: newStoresList,
    }))
  }

  const updateFavoriteProductsList = (newProductsList) => {
    setUserInfo(old => ({
      ...old,
      favoriteProducts: newProductsList
    }))
  }

  const signIn = async ({ email, password }) => {

    try {
      const response = await api.post(API_AUTHENTICATE_URSER_ROUTE, { email, password })
      if (response.data.error) {
        alert(`Erro ao logar: ${response.data.error}`)
      } else {
        setUserToken(response.data.token)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const signOut = () => {
    setUserToken(null)
    setUserInfo({})
    return <Navigate to="/" />
  }

  const isTokenOutdated = useMemo(() => checkIfTokenHasExpired(userToken), [userToken])
  if (userToken !== null && isTokenOutdated === true) {
    console.log("Logging out due to expired token!")
    signOut()
  }

  return (
    <AuthContext.Provider value={{
      signIn,
      signOut,
      userId,
      userInfo,
      addStoreToRegisteredStoresList,
      updateRegisteredStoresList,
      updateFavoriteProductsList,
      updateFavoriteStoresList,
      isUserSigned: !!userId,
      isUserAdmin: Object.keys(userInfo).length > 0 ? userInfo.userRole === "admin" : null
    }}>
      {children}
    </AuthContext.Provider>
  )
}
