import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'
import { uploadCloudinary } from '~/constants/cloudinary'
import { BlogRequestBody, UpdateBlogRequestBody } from '~/models/Requests/BlogRequest'
import { TokenPayload } from '~/models/requests/User.requests'
import blogPromotionService from '~/services/blogPromotion.service'

export const createBlogPromotionController = async (req: Request, res: Response, next: NextFunction) => {
  const { admin_id } = req.decoded_authorization as TokenPayload
  const body = req.body as BlogRequestBody

  const imageUrls: string[] = []
  const imageNames: string[] = []

  if (req.files && Array.isArray(req.files)) {
    for (const file of req.files) {
      const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
      const url = await uploadCloudinary(base64, file.originalname)
      imageUrls.push(url)
      imageNames.push(file.originalname)
    }
  }

  const result = await blogPromotionService.createBlogPromotion(
    { ...body, images: imageUrls, images_name: imageNames },
    admin_id
  )
  return res.json(result)
}

export const getAllBlogPromotionsController = async (req: Request, res: Response, next: NextFunction) => {
  const limit = parseInt(req.query.limit as string) || 10
  const page = parseInt(req.query.page as string) || 1
  const result = await blogPromotionService.getAllBlogPromotions({ limit, page })
  return res.json(result)
}

export const getBlogPromotionByIdController = async (req: Request, res: Response, next: NextFunction) => {
  const blog_id = req.params.blog_id
  const blog = await blogPromotionService.getBlogPromotionById(blog_id)
  if (!blog) {
    return res.status(404).json({ message: 'Blog promotion not found' })
  }
  return res.json(blog)
}

export const updateBlogPromotionController = async (req: Request, res: Response, next: NextFunction) => {
  const blog_id = req.params.blog_id
  const result = await blogPromotionService.updateBlogPromotion(blog_id, req.body)
  return res.json(result)
}

export const deleteBlogPromotionController = async (req: Request, res: Response, next: NextFunction) => {
  const blog_id = req.params.blog_id
  const result = await blogPromotionService.deleteBlogPromotion(blog_id)
  if (!result) {
    return res.status(404).json({ message: 'Blog promotion not found' })
  }
  return res.json(result)
}
