import { Id } from '../value-object/id.value-object'

export class BaseEntity {
  private readonly _id: Id
  private readonly _createdAt: Date
  private _updatedAt: Date

  constructor (id?: Id) {
    this._id = id
    this._createdAt = new Date()
    this._updatedAt = new Date()
  }

  get id (): Id {
    return this._id
  }

  get createdAt (): Date {
    return this._createdAt
  }

  get updatedAt (): Date {
    return this._updatedAt
  }

  set updatedAt (value: Date) {
    this._updatedAt = value
  }
}
