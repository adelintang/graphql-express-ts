import {
  GraphQLID,
  GraphQLNonNull,
  GraphQLList,
} from "graphql";
import { AddMovieInput, MovieType, UpdateMovieInput } from "./movie.type";
import { IMovieMutation, IMovieQuery } from "./movie.interface";
import * as movieService from './movie.service'
import { verifyRole } from "../../utils"
import { UserRole } from "../../prisma/client";

// ALERT
/*
  question to chatgpt :
  berarti tidak ada yang bisa saya lakukan kecuali menempatkan verify role di level resolver ?
*/ 

export const MovieQuery: IMovieQuery = {
  movies: {
    type: new GraphQLList(MovieType),
    resolve: async (_parent, _args) => {
      return await movieService.getMovies()
    }
  },
  movie: {
    type: MovieType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (_parent, args) => {
      return await movieService.getMovie(args.id)
    }
  },
};

export const MovieMutation: IMovieMutation = {
  addMovie: {
    type: MovieType,
    args: {
      movie: { type: new GraphQLNonNull(AddMovieInput) },
    },
    resolve: async (_parent, args, context) => {
      verifyRole(context.user, UserRole.ADMIN)
      return await movieService.addMovie(args.movie)
    }
  },
  deleteMovie: {
    type: MovieType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (_parent, args, context) => {
      verifyRole(context.user, UserRole.ADMIN)
      return await movieService.deleteMovie(context.user, args.id)
    }
  },
  updateMovie: {
    type: MovieType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      movie: { type: new GraphQLNonNull(UpdateMovieInput) },
    },
    resolve: async (_parent, args, context) => {
      verifyRole(context.user, UserRole.ADMIN)
      return await movieService.updateMovie(context.user, args)
    }
  },
};

// export const MovieSchema = new GraphQLSchema({
//   query: MovieQuery,
// });
