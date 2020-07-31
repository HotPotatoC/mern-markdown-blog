import dotenv from 'dotenv'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { RequestHandler } from 'express'
import UserModel from '../models/User'
import config from '../config'
import Joi from 'joi'

dotenv.config()

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body

  const user = await UserModel.find({}).findByEmail(email)

  if (!user) {
    res.status(400).json({
      message: 'Invalid Credentials provided',
    })
    return
  }

  const matched = await bcrypt.compare(password, user.password)

  if (!matched) {
    res.status(400).json({
      message: 'Invalid Credentials provided',
    })
    return
  }

  const token = jwt.sign(
    {
      user: {
        id: user._id,
        displayName: user.displayName,
        username: user.username,
        email: user.email,
      },
    },
    config.jwt.secret as string,
    {
      expiresIn: config.jwt.expiresIn,
    }
  )

  res.status(200).json({
    message: 'You are now authorized',
    user: {
      id: user._id,
      displayName: user.displayName,
      username: user.username,
      email: user.email,
    },
    token: token,
  })
}

export const register: RequestHandler = async (req, res) => {
  const { displayName, username, email, password } = req.body

  const user = new UserModel({ displayName, username, email, password })

  try {
    await user.save()

    res.status(200).json({
      message: 'Created new user',
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'There was a problem on our side',
    })
  }
}

export const me: RequestHandler = async (req, res) => {
  const payload = res.locals.jwtPayload

  res.status(200).json(payload.user)
}

export const validations = {
  login: Joi.object({
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
  register: Joi.object({
    displayName: Joi.string(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    password: Joi.string().required(),
  }),
}
