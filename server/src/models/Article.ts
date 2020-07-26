import {
  prop,
  pre,
  modelOptions,
  queryMethod,
  getModelForClass,
  Ref,
  plugin,
} from '@typegoose/typegoose'
import { QueryMethod, ReturnModelType } from '@typegoose/typegoose/lib/types'
import mongoosePaginate from 'mongoose-paginate-v2'
import slugify from 'slugify'

import { User } from './User'
import randomNumber from '../utils/randomNumber'
import { PaginatedModel } from './PaginatedModel'

interface QueryHelpers {
  findBySlug: QueryMethod<typeof findBySlug>
}

function findBySlug(
  this: ReturnModelType<typeof Article, QueryHelpers>,
  slug: string
) {
  return this.findOne({ slug: slug }).populate({
    path: 'user',
    select: ['_id', 'displayName', 'username', 'email'],
  })
}

@pre<Article>('validate', function (next) {
  if (this.title) {
    this.slug =
      slugify(this.title, {
        replacement: '-',
        lower: true,
        strict: true,
      }) +
      '-' +
      randomNumber(1000, 9999)
  }

  next()
})
@plugin(mongoosePaginate)
@queryMethod(findBySlug)
@modelOptions({ schemaOptions: { timestamps: true } })
export class Article extends PaginatedModel {
  @prop({ ref: 'User' })
  user!: Ref<User>

  @prop({ required: true })
  title!: string

  @prop({ required: true })
  body!: string

  @prop({ required: true, unique: true })
  slug!: string
}

export default getModelForClass<typeof Article, QueryHelpers>(Article)
