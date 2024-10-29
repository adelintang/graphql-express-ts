import { db } from "../../config"
import { IAddReview, IUpdateReview } from "./review.interface"

export const getReviews = async () => {
  return db.reviews.findMany()
}
export const getReview = async (reviewId: string) => {
  return db.reviews.findUnique({
    where: {
      id: reviewId
    }
  })
}

export const addReview = async (review: IAddReview) => {
  return db.reviews.create({
    data: {
      rating: review.rating,
      review_text: review.review_text,
      review_date: review.review_date,
      user_id: review.user_id,
      movie_id: review.movie_id
    }
  })
}

export const updateReview = async (reviewId: string, review: IUpdateReview) => {
  return db.reviews.update({
    where: {
      id: reviewId
    },
    data: {
      ...review
    }
  })
}

export const deleteReview = async (reviewId: string) => {
  return db.reviews.delete({
    where: {
      id: reviewId
    }
  })
}