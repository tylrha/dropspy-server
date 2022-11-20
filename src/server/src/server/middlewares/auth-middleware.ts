import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";

type TokenPayload = {
  id: string;
  iat: number;
  exp: number;
};

export default function authenticationMiddlewate(req: Request, res: Response, next: NextFunction){

  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "In order to use this DROPSPY API you need to set a header token!" });
  }

  try {
    // LOGGER(`authorization header = ${authorization}`, {from: "SERVER", pid: true})
    const token = authorization.split(' ')[1]
    const decoded = verify(token, "secret");
    const { id } = decoded as TokenPayload;
    req.userId = id;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Token invalid" });
  }

}
