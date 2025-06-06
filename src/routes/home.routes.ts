import { Router } from 'express'
import {
  createAddressController,
  createContentAppointmentController,
  createLogoController,
  createReasonController,
  deleteAddressController,
  getAddressByIdController,
  getAllAddressesController,
  getContentAppointmentController,
  getLogoController,
  updateAddressController,
  updateContentAppointmentController,
  updateLogoController,
  updateReasonController
} from '~/controller/home.controller'
import { accessTokenValidator } from '~/middleware/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const homeRouter = Router()

// ----------- Logo -----------
homeRouter.post('/logo', accessTokenValidator, wrapAsync(createLogoController))
homeRouter.patch('/logo', accessTokenValidator, wrapAsync(updateLogoController))
homeRouter.get('/logo', wrapAsync(getLogoController))

// ----------- Content Appointment (only 1) -----------
homeRouter.post('/content-appointment', accessTokenValidator, wrapAsync(createContentAppointmentController))
homeRouter.patch('/content-appointment/:id', accessTokenValidator, wrapAsync(updateContentAppointmentController))
homeRouter.get('/content-appointment', wrapAsync(getContentAppointmentController))

// ----------- Reason (only 1) -----------
homeRouter.post('/reason', accessTokenValidator, wrapAsync(createReasonController))
homeRouter.patch('/reason/:id', accessTokenValidator, wrapAsync(updateReasonController))

// ----------- Address (full CRUD) -----------
homeRouter.post('/addresses', accessTokenValidator, wrapAsync(createAddressController))
homeRouter.get('/addresses', wrapAsync(getAllAddressesController))
homeRouter.get('/addresses/:id', wrapAsync(getAddressByIdController))
homeRouter.patch('/addresses/:id', accessTokenValidator, wrapAsync(updateAddressController))
homeRouter.delete('/addresses/:id', accessTokenValidator, wrapAsync(deleteAddressController))

export default homeRouter
