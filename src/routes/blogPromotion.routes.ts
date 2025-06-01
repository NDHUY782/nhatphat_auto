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

blogPromotionRouter.get('/:blogPromotion_id', accessTokenValidator, wrapAsync(getBlogPromotionByIdController))

blogPromotionRouter.put(
  '/:blogPromotion_id',
  upload.array('images'),
  accessTokenValidator,
  wrapAsync(updateBlogPromotionController)
)

blogPromotionRouter.delete('/:blogPromotion_id', accessTokenValidator, wrapAsync(deleteBlogPromotionController))

export default blogPromotionRouter
