import {
  GraphQLEnumType,
  GraphQLFieldConfigMap,
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLString
} from "graphql";
import { ReviewType } from "../review/review.type";
import { MovieType } from "../movie/movie.type";
import * as movieService from '../movie/movie.service'
import * as reviewService from '../review/review.service'

const RoleType = new GraphQLEnumType({
  name: "Role",
  values: {
    ADMIN: { value: "ADMIN" },
    USER: { value: "USER" },
  },
})

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: (): GraphQLFieldConfigMap<any, any> => ({
    id: { type: new GraphQLNonNull(GraphQLID) },
    name: { type: new GraphQLNonNull(GraphQLString) },
    email: { type: new GraphQLNonNull(GraphQLString) },
    role: { type: new GraphQLNonNull(RoleType) },
    movies: {
      type: new GraphQLList(MovieType),
      resolve: async (parent: { id: string }, _args) => {
        return (await movieService.getMovies()).filter((movie) => movie.user_id === parent.id)
      }
    },
    reviews: {
      type: new GraphQLList(ReviewType),
      resolve: async (parent: { id: string }, _args) => {
        return (await reviewService.getReviews()).filter((review) => review.user_id === parent.id)
      }
    },
  }),
})