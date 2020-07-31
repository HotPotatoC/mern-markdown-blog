import ArticleModel from '../models/Article'
import { RequestHandler } from 'express'
import Joi from 'joi'

export const index: RequestHandler = async (req, res) => {
  const { limit, offset, page } = req.query

  const articles = await ArticleModel.paginate(
    {},
    {
      limit: Number(limit) || 10,
      offset: Number(offset) || 0,
      page: Number(page) || 1,
      populate: {
        path: 'user',
        select: ['_id', 'displayName', 'username', 'email'],
      },
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
    docs: articles.docs,
  })
}

export const show: RequestHandler = async (req, res) => {
  const article = await ArticleModel.findOne({}).findBySlug(req.params.slug)

  if (!article) {
    res.status(404).json({
      message: 'Article not found',
    })
    return
  }

  res.status(200).json(article)
}

export const store: RequestHandler = async (req, res) => {
  const { title, body } = req.body
  const payload = res.locals.jwtPayload

  const article = new ArticleModel({
    user: payload.user.id,
    title: title,
    body: body,
  })

  try {
    await article.save()

    res.status(200).json({
      message: 'Created new article',
      article: article,
    })
  } catch (error) {
    console.log(error)
    res.status(500).json({
      message: 'There was a problem on our side',
    })
  }
}

export const update: RequestHandler = async (req, res) => {}

export const destroy: RequestHandler = async (req, res) => {}

export const validations = {
  store: Joi.object({
    title: Joi.string().required(),
    body: Joi.string().required(),
  }),
}
