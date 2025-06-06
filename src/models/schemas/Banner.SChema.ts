import { ObjectId } from 'mongodb'

export interface BannerType {
  _id?: ObjectId
  images: string[]
  created_at?: Date
  updated_at?: Date
}

export default class Banner {
  _id?: ObjectId
  images: string[]
  created_at?: Date
  updated_at?: Date

  constructor({ _id, images, created_at, updated_at }: BannerType) {
    this._id = _id || new ObjectId()
    this.images = images || []
    this.created_at = created_at || new Date()
    this.updated_at = updated_at || new Date()
  }
}
