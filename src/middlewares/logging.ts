import type { Request, Response, NextFunction } from 'express'

export const customLogger = (req: Request, res: Response, next: NextFunction) => {
  console.log(`${req.method} ${req.originalUrl} \n${req.headers['user-agent']}`)
  next()
}