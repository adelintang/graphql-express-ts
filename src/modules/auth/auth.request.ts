import Joi from 'joi'
import { joiGeneralMessage } from '../../utils'
import { UserRole } from '../../prisma/client'

export const registerSchema = Joi.object({
  name: Joi.string().required().messages(joiGeneralMessage),
  email: Joi.string().email().required().messages(joiGeneralMessage),
  password: Joi.string().min(6).required().messages(joiGeneralMessage),
  role: Joi.string().valid(UserRole.ADMIN, UserRole.USER).required().messages(joiGeneralMessage)
})

export const loginSchema = Joi.object({
  email: Joi.string().email().required().messages(joiGeneralMessage),
  password: Joi.string().min(6).required().messages(joiGeneralMessage),
})