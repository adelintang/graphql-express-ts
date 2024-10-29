import { IAuthPayload } from '../../middlewares'
import { isOwner } from '../../utils'
import { IAddReview, IArgsUpdateReview } from './review.interface'
import * as reviewRepository from './review.repository'
import * as userRepository from '../user/user.repository'
import * as movieRepository from '../movie/movie.repository'
import { GRAPHQLCODE, GRAPHQLMESSAGES, NotFoundError } from '../../middlewares'

export const getReviews = async () => {
  return await reviewRepository.getReviews()
}

export const getReview = async (reviewId: string) => {
  const review = await reviewRepository.getReview(reviewId)
  if (!review) {
    throw new NotFoundError(GRAPHQLMESSAGES.NOT_FOUND.REVIEW, GRAPHQLCODE.NOT_FOUND)
  }
  return review
}

export const addReview = async (data: IAddReview) => {
  const user = await userRepository.getUser(data.user_id)
  if (!user) {
    throw new NotFoundError(GRAPHQLMESSAGES.NOT_FOUND.USER_ID, GRAPHQLCODE.NOT_FOUND)
  }
  const movie = await movieRepository.getMovie(data.movie_id)
  if (!movie) {
    throw new NotFoundError(GRAPHQLMESSAGES.NOT_FOUND.MOVIE_ID, GRAPHQLCODE.NOT_FOUND)
  }
  const review = await reviewRepository.addReview(data)
  if (!review) {
    throw new Error('review cannot create')
  }
  return review
}

export const updateReview = async (user: IAuthPayload | undefined, args: IArgsUpdateReview) => {
  const review = await reviewRepository.getReview(args.id)
  if (!review) {
    throw new NotFoundError(GRAPHQLMESSAGES.NOT_FOUND.REVIEW, GRAPHQLCODE.NOT_FOUND)
  }
  isOwner(user, review.user_id)
  const reviewUpdated = await reviewRepository.updateReview(args.id, args.review)
  if (!reviewUpdated) {
    throw new Error('review cannot update')
  }
  return reviewUpdated
}

export const deleteReview = async (user: IAuthPayload | undefined, reviewId: string) => {
  const review = await reviewRepository.getReview(reviewId)
  if (!review) {
    throw new NotFoundError(GRAPHQLMESSAGES.NOT_FOUND.REVIEW, GRAPHQLCODE.NOT_FOUND)
  }
  isOwner(user, review.user_id)
  const reviewDeleted = await reviewRepository.deleteReview(reviewId)
  return reviewDeleted
}