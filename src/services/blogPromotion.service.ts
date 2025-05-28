import { ObjectId } from 'mongodb'
import databaseService from '~/services/database.service'
import { BlogRequestBody, UpdateBlogRequestBody } from '~/models/Requests/BlogRequest'
import BlogPromotion from '~/models/schemas/Blog_Promotion.Schema'

class BlogPromotionService {
  async createBlogPromotion(body: BlogRequestBody, admin_id: string) {
    const blog = new BlogPromotion({
      author_id: new ObjectId(admin_id),
      title: body.title,
      name: body.name,
      content: body.content,
      images: body.images || [],
      images_name: body.images_name || []
    })
    return await databaseService.blogPromotions.insertOne(blog)
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

  async updateBlogPromotion(blog_id: string, body: UpdateBlogRequestBody) {
    return await databaseService.blogPromotions.findOneAndUpdate(
      { _id: new ObjectId(blog_id) },
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

  async deleteBlogPromotion(blog_id: string) {
    return await databaseService.blogPromotions.findOneAndDelete({ _id: new ObjectId(blog_id) })
  }
}

const blogPromotionService = new BlogPromotionService()
export default blogPromotionService
