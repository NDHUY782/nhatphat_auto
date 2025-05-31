import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.service'
import { UpdateBlogRequestBody } from '~/models/requests/BlogRequest'
import BlogPromotion from '~/models/schemas/Blog_Promotion.Schema'
import { BlogPromotionRequestBody, UpdateBlogPromotionRequestBody } from '~/models/requests/BlogPromotionRequest'

class BlogPromotionService {
  async createBlogPromotion(body: BlogPromotionRequestBody, admin_id: string) {
    const blogPromotion = new BlogPromotion({
      author_id: new ObjectId(admin_id),
      title: body.title,
      name: body.name,
      content: body.content,
      images: body.images || [],
      images_name: body.images_name || []
    })
    const result = await databaseService.blogPromotions.insertOne(blogPromotion)
    return result
  }

  async getAllBlogPromotions({ limit, page }: { limit: number; page: number }) {
    return await databaseService.blogPromotions
      .find()
      .sort({ created_at: -1 })
      .skip(limit * (page - 1))
      .limit(limit)
      .toArray()
  }

  async getBlogPromotionById(blog_id: string) {
    return await databaseService.blogPromotions.findOne({ _id: new ObjectId(blog_id) })
  }

  async updateBlogPromotion(blogPromotion_id: string, body: UpdateBlogPromotionRequestBody) {
    return await databaseService.blogPromotions.findOneAndUpdate(
      { _id: new ObjectId(blogPromotion_id) },
      {
        $set: {
          title: body.title,
          name: body.name,
          content: body.content,
          images: body.images || [],
          images_name: body.images_name || [],
          updated_at: new Date()
        }
      },
      { returnDocument: 'after' }
    )
  }

  async deleteBlogPromotion(blogPromotion_id: string) {
    return await databaseService.blogPromotions.findOneAndDelete({ _id: new ObjectId(blogPromotion_id) })
  }
}

const blogPromotionService = new BlogPromotionService()
export default blogPromotionService
