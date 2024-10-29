import { type NextFunction, type Request, type Response } from "express"
import * as authService from './auth.service'
import { AppError } from "../../middlewares/error-handler"
import { MESSAGES, ResponseHandler } from "../../utils"

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req
  const user = await authService.register(body)
  if (user instanceof AppError) {
    next(user)
    return
  }
  ResponseHandler.created(res, user, MESSAGES.SUCCESS.CREATED.USER)
}

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req
  const user = await authService.login(body)
  if (user instanceof AppError) {
    next(user)
    return
  }
  ResponseHandler.ok(res, user)
}