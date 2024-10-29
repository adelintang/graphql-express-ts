import { db } from "../../config"
import { IAddMovie, IUpdateMovie } from "./movie.interface"

export const getMovies = async () => {
  return db.movies.findMany()
}

export const getMovie = async (movieId: string) => {
  return db.movies.findUnique({
    where: {
      id: movieId
    }
  })
}

export const addMovie = async (movie: IAddMovie) => {
  return db.movies.create({
    data: {
      title: movie.title,
      genre: movie.genre,
      release_year: movie.release_year,
      user_id: movie.user_id
    }
  })
}

export const deleteMovie = async (movieId: string) => {
  return db.movies.delete({
    where: {
      id: movieId
    }
  })
}

export const updateMovie = async (movieId: string, movie: IUpdateMovie) => {
  return db.movies.update({
    where: {
      id: movieId
    },
    data: {
      ...movie
    }
  })
}