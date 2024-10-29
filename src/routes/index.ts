import { type NextFunction, Router, type Request, type Response } from 'express'
import authRouter from '../modules/auth/auth.route'
import { ResponseHandler } from '../utils'
import { AppError } from '../middlewares'
import { ERROR_CODE } from '../interface'

const route = Router()

route.use('/auth', authRouter)

route.get('/', (req: Request, res: Response) => {
  ResponseHandler.ok(res, null, 'Welcome to Rest Api')
})

route.use('*', (req: Request, res: Response, next: NextFunction) => {
  const error = new AppError(ERROR_CODE.NOT_FOUND.code)
  next(error)
})

export default route