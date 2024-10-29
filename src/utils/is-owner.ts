import { IAuthPayload } from "../middlewares";
import { ForbiddenError, GRAPHQLCODE, GRAPHQLMESSAGES } from "../middlewares/custom-graphql-error";

export const isOwner = (user: IAuthPayload | undefined, userId: string) => {
  const verify = user?.user_id === userId
  if (!verify) {
    throw new ForbiddenError(GRAPHQLMESSAGES.FORBIDDEN.OWNER, GRAPHQLCODE.FORBIDDEN)
  }
}