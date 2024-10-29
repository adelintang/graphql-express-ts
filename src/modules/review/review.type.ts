import {
  GraphQLFieldConfigMap,
  GraphQLID,
  GraphQLInt,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLInputObjectType,
  GraphQLString
} from "graphql";
import { MovieType } from "../movie/movie.type";
import { UserType } from "../user/user.type";
import * as movieService from '../movie/movie.service'
import * as userService from '../user/user.service'

export const ReviewType = new GraphQLObjectType({
  name: "Review",
  fields: (): GraphQLFieldConfigMap<any, any> => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    rating: { type: new GraphQLNonNull(GraphQLInt) },
    review_text: { type: new GraphQLNonNull(GraphQLString) },
    review_date: { type: new GraphQLNonNull(GraphQLString) },
    movie: {
      type: MovieType,
      resolve: async (parent: { movie_id: string }, _args) => {
        return await movieService.getMovie(parent.movie_id)
      }
    },
    user: {
      type: UserType,
      resolve: async (parent: { user_id: string }, _args) => {
        return await userService.getUser(parent.user_id)
      }
    },
  }),
})

export const AddReviewInput = new GraphQLInputObjectType({
  name: 'AddReviewInput',
  fields: {
    rating: { type: new GraphQLNonNull(GraphQLInt) },
    review_text: { type: new GraphQLNonNull(GraphQLString) },
    review_date: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLID) },
    movie_id: { type: new GraphQLNonNull(GraphQLID) }
  }
})

export const UpdateReviewInput = new GraphQLInputObjectType({
  name: 'UpdateReviewInput',
  fields: {
    rating: { type: GraphQLInt },
    review_text: { type: GraphQLString },
    review_date: { type: GraphQLString }
  }
})