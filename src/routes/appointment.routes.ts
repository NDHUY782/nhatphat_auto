import { Router } from 'express'
import {
  createAppointmentController,
  deleteAppointmentController,
  getAllAppointmentsController,
  getAppointmentByIdController,
  markAppointmentDoneController,
  updateAppointmentController
} from '~/controller/appointment.controller'

import { wrapAsync } from '~/utils/handlers'

const appointmentRouter = Router()

appointmentRouter.post('/', wrapAsync(createAppointmentController))
appointmentRouter.get('/', wrapAsync(getAllAppointmentsController))
appointmentRouter.get('/:appointment_id', wrapAsync(getAppointmentByIdController))
appointmentRouter.put('/:appointment_id', wrapAsync(updateAppointmentController))
appointmentRouter.delete('/:appointment_id', wrapAsync(deleteAppointmentController))
appointmentRouter.patch('/:appointment_id/done', wrapAsync(markAppointmentDoneController))

export default appointmentRouter
