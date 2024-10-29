import { GraphQLError, SourceLocation } from 'graphql'

export const GRAPHQLMESSAGES = {
  UNAUTHORIZED: 'User must be authenticated',
  FORBIDDEN: {
    ROLE: 'User dont have permission for this action',
    OWNER: 'User not owner for this access'
  },
  NOT_FOUND: { 
    USER: 'User not found',
    MOVIE: 'Movie not found',
    REVIEW: 'Review not found',
    USER_ID: 'USER_ID not found',
    MOVIE_ID: 'MOVIE_ID not found',
  }
}

export const GRAPHQLCODE = {
  UNAUTHORIZED: 'UNAUTHORIZED',
  FORBIDDEN: 'FORBIDDEN',
  NOT_FOUND: 'NOT_FOUND'
}

class CustomGraphQLError extends GraphQLError {
  status?: number
  message: string
  extensions: {}
  locations: readonly SourceLocation[] | undefined
  path: readonly (string | number)[] | undefined

  constructor(status: number, message: string, code?: string) {
    super(message)
    this.message = message
    this.extensions = { code, status }
  }
}

export class UnauthorizedError extends CustomGraphQLError {
  constructor(message: string, code: string) {
    super(401, message, code)
  }
}

export class ForbiddenError extends CustomGraphQLError {
  constructor(message: string, code: string) {
    super(403, message, code)
  }
}

export class NotFoundError extends CustomGraphQLError {
  constructor(message: string, code: string) {
    super(404, message, code)
  }
}