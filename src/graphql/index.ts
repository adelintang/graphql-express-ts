// import { mergeSchemas } from '@graphql-tools/schema'
// import { UserSchema } from '../modules/user/user.graphql'
// import { MovieSchema } from '../modules/movie/movie.graphql'
// import { ReviewSchema } from '../modules/review/review.graphql'

import { GraphQLObjectType, GraphQLSchema } from 'graphql'
import { UserQuery } from '../modules/user/user.graphql'
import { MovieQuery, MovieMutation } from '../modules/movie/movie.graphql'
import { ReviewQuery, ReviewMutation } from '../modules/review/review.graphql'

const RootQuery = new GraphQLObjectType({
  name: 'Query',
  fields: {
    ...UserQuery,
    ...MovieQuery,
    ...ReviewQuery,
  }
})

const RootMutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...MovieMutation,
    ...ReviewMutation
  }
})

export const schemas = new GraphQLSchema({
  query: RootQuery,
  mutation: RootMutation
})

// export const schemas = mergeSchemas({
//   schemas: [UserSchema, MovieSchema, ReviewSchema]
// })