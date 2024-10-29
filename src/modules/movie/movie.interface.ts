import { IContext } from "../../context"
import { IGraphQLObjectConfig } from "../../interface"

export interface IMovie {
  id: string
  title: string
  release_year: number
  genre: string
}

export interface IAddMovie {
  title: string
  release_year: number
  genre: string
  user_id: string
}

export interface IUpdateMovie {
  title: string
  release_year: number
  genre: string
}

export interface IArgsUpdateMovie {
  id: string
  movie: IUpdateMovie
}

interface IMoviesConfig extends IGraphQLObjectConfig {
  resolve(parent: null, args: null, context: IContext): Promise<IMovie[]>
}

interface IMovieConfig extends IGraphQLObjectConfig {
  args: { id: { type: any } }
  resolve(parent: null, args: { id: any }, context: IContext): Promise<IMovie>
}

interface IAddMovieConfig extends IGraphQLObjectConfig {
  args: {
    movie: { type: any }
  },
  resolve(parent: null, args: { movie: any }, context: IContext): Promise<IMovie>
}

interface IUpdateMovieConfig extends IGraphQLObjectConfig {
  args: {
    id: { type: any }
    movie: { type: any }
  },
  resolve(parent: null, args: IArgsUpdateMovie, context: IContext): Promise<IMovie>
}

interface IDeleteMovieConfig extends IGraphQLObjectConfig {
  args: {
    id: { type: any }
  },
  resolve(parent: null, args: { id: any }, context: IContext): Promise<IMovie>
}

export interface IMovieQuery {
  movies: IMoviesConfig
  movie: IMovieConfig
}

export interface IMovieMutation {
  addMovie: IAddMovieConfig
  updateMovie: IUpdateMovieConfig
  deleteMovie: IDeleteMovieConfig
}
