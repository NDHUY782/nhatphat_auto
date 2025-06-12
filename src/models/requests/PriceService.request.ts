import { ObjectId } from 'mongodb'

export interface CreatePriceServiceRequestBody {
  title: string
  name_service: string
  vehicle_type: string
  unit: string
  price: string
}

export interface UpdatePriceServiceRequestBody {
  title?: string
  name_service?: string
  vehicle_type?: string
  unit?: string
  price?: string
  updated_at?: Date
}
