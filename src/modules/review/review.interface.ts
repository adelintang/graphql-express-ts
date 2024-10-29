import { IContext } from "../../context"
import { IGraphQLObjectConfig } from "../../interface"

export interface IReview {
  id: string
  rating: number
  review_text: string
  review_date: string
}

export interface IAddReview {
  rating: number
  review_text: string
  review_date: string
  user_id: string
  movie_id: string
}

export interface IUpdateReview {
  rating: number
  review_text: string
  review_date: string
}

export interface IArgsUpdateReview {
  id: string
  review: IUpdateReview
}

interface IReviewsConfig extends IGraphQLObjectConfig {
  resolve(parent: null, args: null): Promise<IReview[]>
}

interface IReviewConfig extends IGraphQLObjectConfig {
  args: {
    id: { type: any }
  }
  resolve(parent: null, args: { id: any }): Promise<IReview>
}

interface IAddReviewConfig extends IGraphQLObjectConfig {
  args: {
    review: { type: any }
  },
  resolve(parent: null, args: { review: any }, context: IContext): Promise<IReview>
}

interface IUpdateReviewConfig extends IGraphQLObjectConfig {
  args: {
    id: { type: any }
    review: { type: any }
  },
  resolve(parent: null, args: IArgsUpdateReview, context: IContext): Promise<IReview>
}

interface IDeleteReviewConfig extends IGraphQLObjectConfig {
  args: {
    id: { type: any }
  },
  resolve(parent: null, args: { id: any }, context: IContext): Promise<IReview>
}

export interface IReviewQuery {
  reviews: IReviewsConfig
  review: IReviewConfig
}

export interface IReviewMutation {
  addReview: IAddReviewConfig
  updateReview: IUpdateReviewConfig
  deleteReview: IDeleteReviewConfig
}
