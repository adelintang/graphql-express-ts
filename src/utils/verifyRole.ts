import { UserRole } from '../prisma/client'
import { IAuthPayload } from '../middlewares'
import { ForbiddenError, GRAPHQLCODE, GRAPHQLMESSAGES } from '../middlewares/custom-graphql-error'

export const verifyRole = (user: IAuthPayload | undefined, role: UserRole) => {
  const verify = user?.role === role
  if (!verify) {
    throw new ForbiddenError(GRAPHQLMESSAGES.FORBIDDEN.ROLE, GRAPHQLCODE.FORBIDDEN)
  }
}