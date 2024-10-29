import { db } from "../../config"

export const getUsers = async () => {
  return db.users.findMany()
}

export const getUser = async (userId: string) => {
  return db.users.findUnique({
    where: {
      id: userId
    }
  })
}