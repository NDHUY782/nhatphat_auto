import { Router } from 'express'
import {
  createServiceController,
  deleteServiceController,
  getAllServicesController,
  getServiceByIdController,
  updateServiceController
} from '~/controller/service.controller'
import { upload } from '~/middleware/upload.middleware'

import { accessTokenValidator, paginationValidator } from '~/middleware/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const serviceRouter = Router()

serviceRouter.post('/', upload.array('images'), accessTokenValidator, wrapAsync(createServiceController))

serviceRouter.get('/', paginationValidator, wrapAsync(getAllServicesController))

serviceRouter.get('/:service_id', wrapAsync(getServiceByIdController))

serviceRouter.put('/:service_id', upload.array('images'), accessTokenValidator, wrapAsync(updateServiceController))

serviceRouter.delete('/:service_id', accessTokenValidator, wrapAsync(deleteServiceController))

export default serviceRouter
