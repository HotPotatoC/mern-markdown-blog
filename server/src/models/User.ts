import {
  prop,
  pre,
  modelOptions,
  queryMethod,
  getModelForClass,
} from '@typegoose/typegoose'
import bcrypt from 'bcrypt'
import { QueryMethod, ReturnModelType } from '@typegoose/typegoose/lib/types'
import { PaginatedModel } from './PaginatedModel'

interface QueryHelpers {
  findByEmail: QueryMethod<typeof findByEmail>
  findByUsername: QueryMethod<typeof findByUsername>
}

function findByEmail(
  this: ReturnModelType<typeof User, QueryHelpers>,
  email: string
) {
  return this.findOne({ email: email })
}

function findByUsername(
  this: ReturnModelType<typeof User, QueryHelpers>,
  username: string
) {
  return this.findOne({ username: username })
}

@pre<User>('save', async function (next) {
  if (this.isModified(this.password)) {
    return next()
  }

  try {
    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(this.password, salt)

    this.password = hash
    next()
  } catch (error) {
    next(error)
  }
})
@queryMethod(findByEmail)
@queryMethod(findByUsername)
@modelOptions({ schemaOptions: { timestamps: true } })
export class User extends PaginatedModel {
  @prop({ default: '' })
  displayName?: string

  @prop({ required: true, unique: true })
  username!: string

  @prop({ required: true, unique: true })
  email!: string

  @prop({ required: true })
  password!: string
}

export default getModelForClass<typeof User, QueryHelpers>(User)
