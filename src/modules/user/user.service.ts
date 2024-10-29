import { GRAPHQLCODE, GRAPHQLMESSAGES, NotFoundError } from '../../middlewares/custom-graphql-error'
import * as userRepository from './user.repository'

export const getUsers = async () => {
  return await userRepository.getUsers()
}

export const getUser = async (userId: string) => {
  const user = await userRepository.getUser(userId)
  if (!user) {
    throw new NotFoundError(GRAPHQLMESSAGES.NOT_FOUND.USER, GRAPHQLCODE.NOT_FOUND)
  }
  return user
}