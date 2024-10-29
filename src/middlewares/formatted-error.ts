import { GraphQLError } from "graphql";

export const formattedError = (error: GraphQLError) => {
  if (error.originalError) {
    return {
      message: error.message,
      code: error.extensions?.code,
      status: error.extensions?.status,
      locations: error.locations,
      path: error.path,
    }
  }

  return {
    message: "Internal Server Error",
    code: "INTERNAL_SERVER_ERROR",
  };
}