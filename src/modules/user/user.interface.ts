import { IGraphQLObjectConfig } from "../../interface"
import { UserRole } from "../../prisma/client"

export interface IUser {
  id: string
  name: string
  email: string
  role: UserRole
}

interface IUsersConfig extends IGraphQLObjectConfig {
  resolve(parent: null, args: null): Promise<IUser[]>
}

interface IUserConfig extends IGraphQLObjectConfig {
  args: {
    id: { type: any }
  }
  resolve(parent: null, args: { id: string }): Promise<IUser>
}

export interface IUserQuery {
  users: IUsersConfig
  user: IUserConfig
}
