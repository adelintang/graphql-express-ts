import { GraphQLNonNull, GraphQLID, GraphQLList } from "graphql";
import { AddReviewInput, ReviewType, UpdateReviewInput } from "./review.type";
import { IReviewMutation, IReviewQuery } from "./review.interface";
import * as reviewService from "./review.service";
import { verifyRole } from "../../utils";
import { UserRole } from "../../prisma/client";

export const ReviewQuery: IReviewQuery = {
  reviews: {
    type: new GraphQLList(ReviewType),
    resolve: async (_parent, _args) => {
      return await reviewService.getReviews();
    },
  },
  review: {
    type: ReviewType,
    args: { id: { type: new GraphQLNonNull(GraphQLID) } },
    resolve: async (_parent, args) => {
      return await reviewService.getReview(args.id);
    },
  },
};

export const ReviewMutation: IReviewMutation = {
  addReview: {
    type: ReviewType,
    args: {
      review: { type: new GraphQLNonNull(AddReviewInput) },
    },
    resolve: async (_parent, args, context) => {
      verifyRole(context.user, UserRole.USER);
      return await reviewService.addReview(args.review);
    },
  },
  updateReview: {
    type: ReviewType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
      review: { type: new GraphQLNonNull(UpdateReviewInput) },
    },
    resolve: async (_parent, args, context) => {
      verifyRole(context.user, UserRole.USER);
      return await reviewService.updateReview(context.user, args);
    },
  },
  deleteReview: {
    type: ReviewType,
    args: {
      id: { type: new GraphQLNonNull(GraphQLID) },
    },
    resolve: async (_parent, args, context) => {
      verifyRole(context.user, UserRole.USER);
      return await reviewService.deleteReview(context.user, args.id);
    },
  },
};

// export const ReviewSchema = new GraphQLSchema({
//   query: ReviewQuery,
// });
