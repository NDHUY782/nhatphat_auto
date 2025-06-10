import { Router } from 'express'
import {
  createPosterController,
  getPosterController,
  updatePosterController,
  deletePosterController
} from '~/controller/poster.controller'
import { upload } from '~/middleware/upload.middleware'
import { accessTokenValidator } from '~/middleware/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const posterRouter = Router()

// ----------- Poster (CRUD) -----------
posterRouter.post(
  '/',
  upload.fields([{ name: 'images_intro' }, { name: 'images_contract' }, { name: 'images_advise' }]),
  accessTokenValidator,
  wrapAsync(createPosterController)
)

posterRouter.get('/', wrapAsync(getPosterController))

posterRouter.patch(
  '/:id',
  upload.fields([{ name: 'images_intro' }, { name: 'images_contract' }, { name: 'images_advise' }]),
  accessTokenValidator,
  wrapAsync(updatePosterController)
)

posterRouter.delete('/:id', accessTokenValidator, wrapAsync(deletePosterController))

export default posterRouter
