import { Request, Response } from 'express'

import { getUserInDatabase } from '../../../models/User';

export default async function getUserInformation(req: Request, res: Response){

  try{
    const {user_id} = req.query
    if (!user_id){throw new Error('user id must be provided')}

    const userObj = await getUserInDatabase({_id: user_id.toString()})
    if (!userObj){throw new Error('user not found')}

    return res.json(userObj);
  }catch(e){
    return res.json({error: e.message});
  }

}
