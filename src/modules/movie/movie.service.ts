import { IAddMovie, IArgsUpdateMovie } from './movie.interface'
import * as movieRepository from './movie.repository'
import * as userRepository from '../user/user.repository'
import { GRAPHQLCODE, GRAPHQLMESSAGES, NotFoundError } from '../../middlewares'
import { IAuthPayload } from '../../middlewares'
import { isOwner } from '../../utils'

export const getMovies = async () => {
  return await movieRepository.getMovies()
}

export const getMovie = async (movieId: string) => {
  const movie = await movieRepository.getMovie(movieId)
  if (!movie) {
    throw new NotFoundError(GRAPHQLMESSAGES.NOT_FOUND.MOVIE, GRAPHQLCODE.NOT_FOUND)
  }
  return movie
}

export const addMovie = async (data: IAddMovie) => {
  const user = await userRepository.getUser(data.user_id)
  if (!user) {
    throw new NotFoundError(GRAPHQLMESSAGES.NOT_FOUND.USER_ID, GRAPHQLCODE.NOT_FOUND)
  }
  const movie = await movieRepository.addMovie(data)
  if (!movie) {
    throw new Error('Movie cannot create')
  }
  return movie
}

export const deleteMovie = async (user: IAuthPayload | undefined, movieId: string) => {
  const movie = await movieRepository.getMovie(movieId)
  if (!movie) {
    throw new NotFoundError(GRAPHQLMESSAGES.NOT_FOUND.MOVIE, GRAPHQLCODE.NOT_FOUND)
  }
  isOwner(user, movie.user_id)
  const movieDeleted = await movieRepository.deleteMovie(movieId)
  if (!movieDeleted) {
    throw new Error('Deleting movie fail')
  }
  return movie
}

export const updateMovie = async (user: IAuthPayload | undefined, args: IArgsUpdateMovie) => {
  const movie = await movieRepository.getMovie(args.id)
  if (!movie) {
    throw new NotFoundError(GRAPHQLMESSAGES.NOT_FOUND.MOVIE, GRAPHQLCODE.NOT_FOUND)
  }
  isOwner(user, movie.user_id)
  const movieUpdated = await movieRepository.updateMovie(args.id, args.movie)
  if (!movieUpdated) {
    throw new Error('Updating movie fail')
  }
  return movieUpdated
}