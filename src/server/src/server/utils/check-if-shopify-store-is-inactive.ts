import axios from 'axios'

export default async function checkIfShopifyStoreIsInactive(storeLink: string){

  try{
    await axios.get(storeLink)
    return false
  } catch(e){
    const isInactiveError = e.message === 'Request failed with status code 402'
    return isInactiveError
  }

}
