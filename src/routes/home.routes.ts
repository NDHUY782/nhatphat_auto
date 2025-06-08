import { Router } from 'express'
import {
  createAddressController,
  createBannerController,
  createContentAppointmentController,
  createLogoController,
  createReasonController,
  createRepairCenterController,
  deleteAddressController,
  deleteBannerController,
  deleteRepairCenterController,
  getAddressByIdController,
  getAllAddressesController,
  getAllBannersController,
  getAllRepairCentersController,
  getContentAppointmentController,
  getLogoController,
  getReasonController,
  updateAddressController,
  updateBannerController,
  updateContentAppointmentController,
  updateLogoController,
  updateReasonController,
  updateRepairCenterController
} from '~/controller/home.controller'
import { upload } from '~/middleware/upload.middleware'
import { accessTokenValidator } from '~/middleware/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const homeRouter = Router()

// ----------- Logo -----------
homeRouter.post('/logo',upload.array('images'),  accessTokenValidator, wrapAsync(createLogoController))
homeRouter.patch('/logo',upload.array('images'),  accessTokenValidator, wrapAsync(updateLogoController))
homeRouter.get('/logo', wrapAsync(getLogoController))

// ----------- Content Appointment (only 1) -----------
homeRouter.post('/content-appointment',upload.array('images'),  accessTokenValidator, wrapAsync(createContentAppointmentController))
homeRouter.patch('/content-appointment/:id',upload.array('images'),  accessTokenValidator, wrapAsync(updateContentAppointmentController))
homeRouter.get('/content-appointment', wrapAsync(getContentAppointmentController))

// ----------- Reason (only 1) -----------
homeRouter.post('/reason',upload.array('images'),  accessTokenValidator, wrapAsync(createReasonController))
homeRouter.get('/reason', wrapAsync(getReasonController))
homeRouter.patch('/reason/:id',upload.array('images'),  accessTokenValidator, wrapAsync(updateReasonController))

// ----------- Address (full CRUD) -----------
homeRouter.post('/addresses', accessTokenValidator, wrapAsync(createAddressController))
homeRouter.get('/addresses', wrapAsync(getAllAddressesController))
homeRouter.get('/addresses/:id', wrapAsync(getAddressByIdController))
homeRouter.patch('/addresses/:id', accessTokenValidator, wrapAsync(updateAddressController))
homeRouter.delete('/addresses/:id', accessTokenValidator, wrapAsync(deleteAddressController))

// ----------- Banner (CRUD) -----------
homeRouter.post('/banners',upload.array('images'),  accessTokenValidator, wrapAsync(createBannerController))
homeRouter.get('/banners', wrapAsync(getAllBannersController))
homeRouter.patch('/banners/:id',upload.array('images'),  accessTokenValidator, wrapAsync(updateBannerController))
homeRouter.delete('/banners/:id', accessTokenValidator, wrapAsync(deleteBannerController))

// ----------- Repair Centers (CRUD - name only) -----------
homeRouter.post('/repair-centers', accessTokenValidator, wrapAsync(createRepairCenterController))
homeRouter.get('/repair-centers', wrapAsync(getAllRepairCentersController))
homeRouter.patch('/repair-centers/:id', accessTokenValidator, wrapAsync(updateRepairCenterController))
homeRouter.delete('/repair-centers/:id', accessTokenValidator, wrapAsync(deleteRepairCenterController))

export default homeRouter
