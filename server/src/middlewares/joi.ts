import Joi from 'joi'
import { RequestHandler } from 'express'
import { Segments } from '../utils/segments'

export const joiMiddleware = (
  schema: Joi.ObjectSchema,
  property: Segments
): RequestHandler => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property])
    if (!error) {
      next()
    } else {
      const { details, message } = error

      res.status(422).json({
        details,
        message,
      })
    }
  }
}
