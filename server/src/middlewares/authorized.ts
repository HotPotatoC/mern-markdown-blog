import jwt from 'jsonwebtoken'
import config from '../config'
import { RequestHandler } from 'express'

export const authorized: RequestHandler = (req, res, next) => {
  const { authorization } = req.headers

  if (!authorization) {
    res.status(401).json({
      message: 'Unauthorized user please login to proceed',
    })
    return
  }

  const token = authorization.split(' ')[1]

  try {
    const payload = jwt.verify(token, config.jwt.secret as string)
    res.locals.jwtPayload = payload
    next()
  } catch (error) {
    res.status(401).json({
      message: 'Unauthorized user please login to proceed',
    })
  }
}
