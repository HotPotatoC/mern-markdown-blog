import { Router } from 'express'
import * as auth from './controllers/auth'
import * as users from './controllers/users'
import * as articles from './controllers/articles'
import { authorized } from './middlewares/authorized'
import { joiMiddleware } from './middlewares/joi'
import Segments from './utils/segments'

const router = Router()

router.post(
  '/auth/login',
  joiMiddleware(auth.validations.login, Segments.BODY),
  auth.login
)
router.post(
  '/auth/register',
  joiMiddleware(auth.validations.register, Segments.BODY),
  auth.register
)
router.get('/auth/me', authorized, auth.me)

router.get('/articles', articles.index)
router.get('/articles/:slug', articles.show)
router.post(
  '/articles',
  joiMiddleware(articles.validations.store, Segments.BODY),
  authorized,
  articles.store
)
router.put('/articles/:slug', authorized, articles.update)
router.delete('/articles/:slug', authorized, articles.destroy)

router.get('/users', users.index)
router.get('/users/:username', users.show)
router.get('/users/:username/articles', users.indexArticle)
router.get('/users/:username/articles/:slug', users.showArticle)

export default router
