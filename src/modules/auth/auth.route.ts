import { Router } from "express"
import { register, login } from './auth.controller'
import { validateRequest } from "../../middlewares"
import { registerSchema, loginSchema } from './auth.request'

const route = Router()

route.post('/register', validateRequest(registerSchema), register)
route.post('/login', validateRequest(loginSchema), login)

export default route