import { Request, Response } from 'express'
import { compare } from "bcryptjs"
import { sign } from "jsonwebtoken";

import { getUserInDatabase, IUserMongo } from '../../../models/User';

export default async function authenticateUser(req: Request, res: Response) {

  try {
    const { email, password } = req.body
    if (Object.keys(req.body).length !== 2) { throw new Error("Body params were not found!") }

    const userObj: IUserMongo = await getUserInDatabase({ email: email.toString() })
    if (!userObj) { throw new Error('user not found') }

    const isPasswordValid = await compare(password, userObj.password);
    if (!isPasswordValid) { throw new Error("Invalid password!") }

    const token = sign({ id: userObj['_id'] }, "secret", { expiresIn: "7d" }); // '1h'

    return res.json({ id: userObj['_id'], token });

  } catch (e) {
    return res.json({ error: e.message })
  }
}
