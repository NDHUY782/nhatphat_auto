import { ObjectId } from 'mongodb'
import { CategoryRequestBody, UpdateCategoryRequestBody } from '~/models/requests/CategoryRequest'
import { ServiceRequestBody, UpdateServiceRequestBody } from '~/models/requests/ServiceRequest'
import Category from '~/models/schemas/Category.Schema'
import Service from '~/models/schemas/Service.Schema'
import databaseService from '~/services/database.service'

class CategoryService {
  async createCategory(body: CategoryRequestBody) {
    const service = new Category({ ...body })
    const result = await databaseService.category.insertOne(service)
    return result
  }

  async getAllCategories() {
    return databaseService.category.find().sort({ created_at: -1 }).toArray()
  }

  async getCategoryById(category_id: string) {
    const result = await databaseService.category.findOne({ _id: new ObjectId(category_id) })
    if (!result) throw new Error('Service not found')
    return result
  }

  async updateCategory(category_id: string, update: UpdateCategoryRequestBody) {
    const result = await databaseService.category.findOneAndUpdate(
      { _id: new ObjectId(category_id) },
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

  async deleteCategory(category_id: string) {
    const result = await databaseService.category.findOneAndDelete({ _id: new ObjectId(category_id) })
    return result
  }
}

const categoryService = new CategoryService()
export default categoryService
