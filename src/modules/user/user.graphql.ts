import { GraphQLID, GraphQLList, GraphQLNonNull } from "graphql"
import { UserType } from "./user.type"
import { IUserQuery } from "./user.interface"
import * as userService from "./user.service"

export const UserQuery: IUserQuery = {
  users: {
    type: new GraphQLList(UserType),
    resolve: async (_parent, _args) => {
      return await userService.getUsers();
    },
  },
  user: {
    type: UserType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (_parent, args) => {
      return await userService.getUser(args.id);
    },
  },
}

// export const UserSchema = new GraphQLSchema({
//   query: UserQuery,
// });
