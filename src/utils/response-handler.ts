import type { NextFunction, Response } from 'express'
import { ERROR_CODE } from '../interface'
import { AppError } from '../middlewares'

export const ResponseHandler = {
	ok<T, M = null>(res: Response, data: T, message = 'Success', meta?: M) {
		return res.status(200).json({ status: 'success', message, data, meta })
	},

	created<T>(res: Response, data: T, message = 'Created') {
		return res.status(201).json({ status: 'success', message, data })
	},

	badRequest(next: NextFunction, message = ERROR_CODE.BAD_REQUEST.message) {
		next(new AppError(ERROR_CODE.BAD_REQUEST.code, message))
	},

	unauthorized(next: NextFunction, message = ERROR_CODE.UNAUTHORIZED.message) {
		next(new AppError(ERROR_CODE.UNAUTHORIZED.code, message))
	},
}