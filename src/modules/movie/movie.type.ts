import {
  GraphQLFieldConfigMap,
  GraphQLID,
  GraphQLInputObjectType,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql";
import { UserType } from "../user/user.type";
import * as userService from '../user/user.service'
import * as reviewService from '../review/review.service'
import { ReviewType } from "../review/review.type";

export const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: (): GraphQLFieldConfigMap<any, any> => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    title: { type: new GraphQLNonNull(GraphQLString) },
    release_year: { type: new GraphQLNonNull(GraphQLInt) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    user: {
      type: UserType,
      resolve: async (parent: { user_id: string }, _args) => {
        return await userService.getUser(parent.user_id)
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve: async (parent: { id: string }, _args) => {
        return (await reviewService.getReviews()).filter((review) => review.movie_id === parent.id)
      }
    },
  }),
});

export const AddMovieInput = new GraphQLInputObjectType({
  name: "AddMovieInput",
  fields: {
    title: { type: new GraphQLNonNull(GraphQLString) },
    release_year: { type: new GraphQLNonNull(GraphQLInt) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    user_id: { type: new GraphQLNonNull(GraphQLID) },
  },
});

export const UpdateMovieInput = new GraphQLInputObjectType({
  name: "UpdateMovieInput",
  fields: {
    title: { type: GraphQLString },
    release_year: { type: GraphQLInt },
    genre: { type: GraphQLString },
  },
});