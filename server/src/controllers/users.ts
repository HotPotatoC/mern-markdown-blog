import { RequestHandler } from 'express'
import UserModel, { User } from '../models/User'
import ArticleModel from '../models/Article'

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

export const indexArticle: RequestHandler = async (req, res) => {
  const { username } = req.params
  const { limit, offset, page } = req.query

  const user = await UserModel.findOne({}, { password: 0 }).findByUsername(
    username
  )

  if (!user) {
    res.status(404).json({
      message: 'User not found',
    })
    return
  }

  const articles = await ArticleModel.paginate(
    { user: user?._id },
    {
      limit: Number(limit) || 10,
      offset: Number(offset) || 0,
      page: Number(page) || 1,
      sort: {
        createdAt: 'desc',
      },
    }
  )

  res.status(200).json({
    totalDocs: articles.totalDocs,
    totalPages: articles.totalPages,
    page: articles.page,
    limit: articles.limit,
    user,
    docs: articles.docs,
  })
}

export const show: RequestHandler = async (req, res) => {
  const { username } = req.params

  const user = await UserModel.findOne({}).findByUsername(username as string)

  if (!user) {
    res.status(404).json({
      message: 'User not found',
    })
    return
  }

  res.status(200).json(user)
}

export const showArticle: RequestHandler = async (req, res) => {
  const { username } = req.params

  const user = await UserModel.findOne({}).findByUsername(username as string)

  if (!user) {
    res.status(404).json({
      message: 'User not found',
    })
    return
  }

  const article = await ArticleModel.findOne({ user: user._id }).findBySlug(
    req.params.slug
  )

  if (!article) {
    res.status(404).json({
      message: 'Article not found',
    })
    return
  }

  res.status(200).json(article)
}
