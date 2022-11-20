import { Request, Response } from 'express'
import { getUserInDatabase, IFavoriteProduct } from '../../../models/User'

export default async function handleUserFavoriteProducts(req: Request, res: Response) {

  try{

    const { product_link, user_id, mode } = req.query
    if (Object.keys(req.query).length !== 3){throw new Error("query params were not found!")}

    let userObj = await getUserInDatabase({_id: user_id})
    if (userObj === null) {throw new Error("User not found!")}

    if (mode === 'add'){
      const newProductToAdd: IFavoriteProduct = { productLink: product_link.toString() }
      userObj.favoriteProducts = [...userObj.favoriteProducts, newProductToAdd]
    } else if (mode === 'remove'){
      userObj.favoriteProducts = userObj.favoriteProducts.filter(product => product.productLink !== product_link.toString())
    } else {
      throw new Error("mode not found!")
    }

    await userObj.save()

    return res.json(userObj)

  }catch(e){

    return res.json({error: e.message})

  }
}
