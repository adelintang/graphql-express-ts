import type { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { UserRole } from '../prisma/client'
import { GRAPHQLCODE, GRAPHQLMESSAGES, UnauthorizedError } from './custom-graphql-error'
import { ResponseHandler } from '../utils/response-handler'

export interface IRequest extends Request {
  user?: IAuthPayload
}

export interface IAuthPayload {
  user_id?: string
  role?: UserRole
}

export const authentication = (req: IRequest, res: Response, next: NextFunction) => {
  const token = req?.headers?.authorization?.split(' ')[1]
  if (!token) {
    return res.status(401).json({ message: 'No token provided' })
    // throw new UnauthorizedError(GRAPHQLMESSAGES.UNAUTHORIZED, GRAPHQLCODE.UNAUTHORIZED)
  }
  try {
    const user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as jwt.Secret) as IAuthPayload
    req.user = user    
    next()
  } catch (error) {
    // throw new UnauthorizedError(GRAPHQLMESSAGES.UNAUTHORIZED, GRAPHQLCODE.UNAUTHORIZED)
    return res.status(401).json({ message: 'Invalid token' })
  }
}