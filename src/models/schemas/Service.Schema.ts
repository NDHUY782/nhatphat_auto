import { ObjectId } from 'mongodb'

interface ServiceType {
  _id?: ObjectId
  name: string
  content: string
  price: string
  images: string[]
  images_name?: string[]
  author_id: ObjectId
  created_at?: Date
  updated_at?: Date
}
export default class Service {
  _id?: ObjectId
  author_id: ObjectId
  name: string
  content: string
  price: string
  images: string[] = []
  images_name: string[] = []
  created_at?: Date
  updated_at?: Date
  constructor({ _id, author_id, name, content, price, images, images_name, created_at, updated_at }: ServiceType) {
    this._id = _id || new ObjectId()
    this.author_id = author_id
    this.name = name
    this.content = content
    this.price = price || '0'
    this.images = images || []
    this.images_name = images_name || []
    this.created_at = created_at || new Date()
    this.updated_at = updated_at || new Date()
  }
}
