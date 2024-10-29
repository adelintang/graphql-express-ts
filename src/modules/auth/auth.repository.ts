import { db } from "../../config"
import { IRegister } from "./auth.interface"

export const register = async (user: IRegister) => {
  return db.users.create({
    data: {
      name: user.name,
      email: user.email,
      password: user.password,
      role: user.role,
    }
  })
}

export const getUserByEmail = async (email: string) => {
  return db.users.findUnique({
    where: {
      email
    }
  })
}