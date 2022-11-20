import { Request, Response } from 'express'
import { generateNewUser, getUserInDatabase } from '../../../models/User'

export default async function createNewUser(req: Request, res: Response){

  try{
    const { name, email, password } = req.body
    if (Object.keys(req.body).length !== 3){throw new Error("Body params were not found!")}

    const userObj = await getUserInDatabase({email})
    if (userObj !== null) {throw new Error("User already exists!")}

    const createdUser = await generateNewUser(name, email, password)
    await createdUser.save()

    return res.json({ createdUser })

  }catch(e){
    return res.json({ error: e.message })
  }

}
