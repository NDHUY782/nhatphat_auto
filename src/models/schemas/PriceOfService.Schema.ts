import { ObjectId } from 'mongodb'

export interface PriceServiceType {
  _id?: ObjectId
  title: string
  name_service: string
  vehicle_type: string
  unit: string
  price: string
  created_at?: Date
  updated_at?: Date
}

export default class PriceService {
  _id?: ObjectId
  title: string
  name_service: string
  vehicle_type: string
  unit: string
  price: string
  created_at?: Date
  updated_at?: Date

  constructor({ _id, title, name_service, vehicle_type, unit, price, created_at, updated_at }: PriceServiceType) {
    this._id = _id || new ObjectId()
    this.title = title
    this.name_service = name_service
    this.vehicle_type = vehicle_type
    this.unit = unit
    this.price = price
    this.created_at = created_at || new Date()
    this.updated_at = updated_at || new Date()
  }
}
