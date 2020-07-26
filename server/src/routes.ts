import { Router } from 'express'
import * as auth from './controllers/auth'
import * as users from './controllers/users'
import * as articles from './controllers/articles'
import { authorized } from './middlewares/authorized'

const router = Router()

router.post('/auth/login', auth.login)
router.post('/auth/register', auth.register)
router.get('/auth/me', authorized, auth.me)

router.get('/articles', articles.index)
router.get('/articles/:slug', articles.show)
router.post('/articles', authorized, articles.store)
router.put('/articles/:slug', authorized, articles.update)
router.delete('/articles/:slug', authorized, articles.destroy)

router.get('/users', users.index)
router.get('/users/:username', users.show)

export default router
