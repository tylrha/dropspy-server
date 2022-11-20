import { Request, Response } from 'express'
import { getUserInDatabase, IFavoriteStore } from '../../../models/User'

export default async function handleUserFavoriteStores(req: Request, res: Response) {

  try{

    const { store_link, user_id, mode } = req.query
    if (Object.keys(req.query).length !== 3){throw new Error("query params were not found!")}

    let userObj = await getUserInDatabase({_id: user_id})
    if (userObj === null) {throw new Error("User not found!")}

    if (mode === 'add'){
      const newProductToAdd: IFavoriteStore = { storeLink: store_link.toString() }
      userObj.favoriteStores = [...userObj.favoriteStores, newProductToAdd]
    } else if (mode === 'remove'){
      userObj.favoriteStores = userObj.favoriteStores.filter(store => store.storeLink !== store_link.toString())
    } else {
      throw new Error("mode not found!")
    }

    await userObj.save()

    return res.json(userObj)

  }catch(e){

    return res.json({error: e.message})

  }
}
