import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { ILogin, IRegister } from './auth.interface'
import * as authService from './auth.repository'
import { ERROR_CODE } from '../../interface'
import { MESSAGES } from '../../utils'
import { AppError } from '../../middlewares/error-handler'
import { registerMapper } from './auth.mapper'

export const register = async (payload: IRegister) => {
  const { password } = payload
  const hashedPassword = await bcrypt.hash(password, 10)

  const userPayload = {
    ...payload,
    password: hashedPassword
  }

  const newUser = await authService.register(userPayload)
  if (!newUser) {
    return new AppError(
      ERROR_CODE.INTERNAL_SERVER_ERROR.code,
      MESSAGES.ERROR.INTERNAL_SERVER_ERROR.CREATE_USER
    )
  }

  return registerMapper(newUser)
}

export const login = async (payload: ILogin) => {
  const { email, password } = payload
  const user = await authService.getUserByEmail(email)
  if (!user) {
    return new AppError(
      ERROR_CODE.UNAUTHORIZED.code,
      MESSAGES.ERROR.UNAUTHORIZED.LOGIN
    )
  }
  
  const isValidPassword = await bcrypt.compare(password, user.password)
  if (!isValidPassword) {
    return new AppError(
      ERROR_CODE.UNAUTHORIZED.code,
      MESSAGES.ERROR.UNAUTHORIZED.LOGIN
    )
  }

  const token = jwt.sign({ user_id: user.id, role: user.role }, process.env.ACCESS_TOKEN_SECRET as jwt.Secret)
  return {
    accessToken: token
  }
}