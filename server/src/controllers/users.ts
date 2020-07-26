import { RequestHandler } from 'express'
import UserModel from '../models/User'

export const index: RequestHandler = async (req, res) => {
  const { limit, offset, page } = req.query

  const users = await UserModel.paginate(
    {},
    {
      limit: Number(limit) || 10,
      offset: Number(offset) || 0,
      page: Number(page) || 1,
    }
  )

  res.status(200).json({
    totalDocs: users.totalDocs,
    totalPages: users.totalPages,
    page: users.page,
    limit: users.limit,
    docs: users.docs,
  })
}

export const show: RequestHandler = async (req, res) => {
  const { username } = req.params

  const user = await UserModel.find({}).findByUsername(username as string)

  if (!user) {
    res.status(404).json({
      message: 'User not found',
    })
    return
  }

  res.status(200).json(user)
}
