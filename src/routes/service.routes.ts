import { Router } from 'express'
import {
  createServiceController,
  deleteServiceController,
  getAllServicesController,
  getServiceByIdController,
  updateServiceController
} from '~/controller/service.controller'

import { accessTokenValidator } from '~/middleware/users.middlewares'
import { wrapAsync } from '~/utils/handlers'

const serviceRouter = Router()

serviceRouter.post('/', accessTokenValidator, wrapAsync(createServiceController))
serviceRouter.get('/', wrapAsync(getAllServicesController))
serviceRouter.get('/:service_id', wrapAsync(getServiceByIdController))
serviceRouter.put('/:service_id', accessTokenValidator, wrapAsync(updateServiceController))
serviceRouter.delete('/:service_id', accessTokenValidator, wrapAsync(deleteServiceController))

export default serviceRouter
