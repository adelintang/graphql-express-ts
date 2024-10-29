import { UserRole } from "../../prisma/client"

export interface IRegister {
  name: string
  email: string
  password: string
  role: UserRole
}

export interface ILogin {
  email: string
  password: string
}