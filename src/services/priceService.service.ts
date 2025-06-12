import databaseService from '~/services/database.service'
import { ObjectId } from 'mongodb'
import { CreatePriceServiceRequestBody, UpdatePriceServiceRequestBody } from '~/models/requests/PriceService.request'
import PriceService from '~/models/schemas/PriceOfService.Schema'

class PriceServiceService {
  async create(data: CreatePriceServiceRequestBody) {
    const priceService = new PriceService({ ...data, created_at: new Date() })
    await databaseService.price_services.insertOne(priceService)
    return priceService
  }

  async getAll() {
    return await databaseService.price_services.find().sort({ created_at: -1 }).toArray()
  }

  async getById(id: string) {
    return await databaseService.price_services.findOne({ _id: new ObjectId(id) })
  }

  async update(id: string, updateData: UpdatePriceServiceRequestBody) {
    const result = await databaseService.price_services.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: { ...updateData, updated_at: new Date() } },
      { returnDocument: 'after' }
    )
    return result
  }

  async delete(id: string) {
    await databaseService.price_services.deleteOne({ _id: new ObjectId(id) })
  }
}

const priceServiceService = new PriceServiceService()
export default priceServiceService
