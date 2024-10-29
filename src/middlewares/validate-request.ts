import type { Request, Response, NextFunction } from 'express'
import Joi from 'joi'
import { cleanJoiErrorMessage, ResponseHandler } from "../utils"

export const validateRequest =
	(schema: Joi.ObjectSchema, type: 'params' | 'body' | 'query' = 'body') =>
	(request: Request, response: Response, next: NextFunction) => {
		let error
		if (type === 'params') {
			error = schema.validate(request.params).error
		} else if (type === 'body') {
			error = schema.validate(request.body).error
		} else if (type === 'query') {
			error = schema.validate(request.query).error
		}

		if (error) {
			ResponseHandler.badRequest(next, cleanJoiErrorMessage(error))
			return
		}
		next()
	}