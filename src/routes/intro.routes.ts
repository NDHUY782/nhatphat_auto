import { Router } from 'express'
import {
  createIntroController,
  deleteIntroController,
  getAllIntrosController,
  getIntroByIdController,
  updateIntroController
} from '~/controller/intro.controller'
import { upload } from '~/middleware/upload.middleware'
import { accessTokenValidator } from '~/middleware/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const introRouter = Router()

// ----------- Intro (CRUD) -----------
introRouter.post('/intros', upload.array('images'), accessTokenValidator, wrapAsync(createIntroController))
introRouter.get('/intros', wrapAsync(getAllIntrosController))
introRouter.get('/intros/:id', wrapAsync(getIntroByIdController))
introRouter.patch('/intros/:id', upload.array('images'), accessTokenValidator, wrapAsync(updateIntroController))
introRouter.delete('/intros/:id', accessTokenValidator, wrapAsync(deleteIntroController))

export default introRouter
