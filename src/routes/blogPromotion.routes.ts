import { Router } from 'express'
import {
  createBlogPromotionController,
  deleteBlogPromotionController,
  getAllBlogPromotionsController,
  getBlogPromotionByIdController,
  updateBlogPromotionController
} from '~/controller/blogPromotion.controller'
import { upload } from '~/middleware/upload.middleware'

import { accessTokenValidator, paginationValidator } from '~/middleware/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const blogPromotionRouter = Router()

blogPromotionRouter.post('/', upload.array('images'), accessTokenValidator, wrapAsync(createBlogPromotionController))

blogPromotionRouter.get('/', paginationValidator, accessTokenValidator, wrapAsync(getAllBlogPromotionsController))

blogPromotionRouter.get('/:blog_id', accessTokenValidator, wrapAsync(getBlogPromotionByIdController))

blogPromotionRouter.put(
  '/:blog_id',
  upload.array('images'),
  accessTokenValidator,
  wrapAsync(updateBlogPromotionController)
)

blogPromotionRouter.delete('/:blog_id', accessTokenValidator, wrapAsync(deleteBlogPromotionController))

export default blogPromotionRouter
