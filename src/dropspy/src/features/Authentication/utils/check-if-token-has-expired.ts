import { decodeJwtToken } from "./decode-token";

// const getDateFromToken = (decodedJwt: any) => {
//   const d = new Date(0);
//   d.setUTCSeconds(decodedJwt.exp);
//   return d
// }

function checkIfTokenHasExpired(token: string){

  if (token === null){return true}

  const decodedJwt = decodeJwtToken(token);

  if (decodedJwt.exp * 1000 < Date.now()) {
    return true
  } else {
    // const diffMin = (decodedJwt.exp * 1000) - Number(Date.now())
    // const remainingMinutes = (diffMin/60/1000).toFixed(2)
    // const expiringDate = getDateFromToken(decodedJwt)
    // const expireDateTime = `${expiringDate.toLocaleDateString('pt-br')} ${expiringDate.toLocaleTimeString('pt-br')}`
    // console.log(`Token is valid for until ${expireDateTime}`)
    return false
  }

}

export {checkIfTokenHasExpired}
