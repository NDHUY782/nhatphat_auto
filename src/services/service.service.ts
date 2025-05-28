import { ObjectId } from 'mongodb'
import Service from '~/models/schemas/Service.Schema'
import databaseService from '~/services/database.service'

class ServiceService {
  async createService(data: Omit<Service, '_id' | 'created_at' | 'updated_at'>) {
    const service = new Service(data)
    const result = await databaseService.services.insertOne(service)
    return result
  }

  async getAllServices() {
    return databaseService.services.find().sort({ created_at: -1 }).toArray()
  }

  async getServiceById(service_id: string) {
    const result = await databaseService.services.findOne({ _id: new ObjectId(service_id) })
    if (!result) throw new Error('Service not found')
    return result
  }

  async updateService(service_id: string, update: Partial<Service>) {
    const result = await databaseService.services.findOneAndUpdate(
      { _id: new ObjectId(service_id) },
      {
        $set: {
          ...update,
          updated_at: new Date()
        }
      },
      { returnDocument: 'after' }
    )
    return result
  }

  async deleteService(service_id: string) {
    const result = await databaseService.services.findOneAndDelete({ _id: new ObjectId(service_id) })
    return result
  }
}

const serviceService = new ServiceService()
export default serviceService
