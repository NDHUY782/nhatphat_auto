import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'
import appointmentService from '~/services/appointment.service'

export const createAppointmentController = async (req: Request, res: Response, next: NextFunction) => {
  const body = req.body
  const result = await appointmentService.createAppointment(body)
  return res.status(201).json(result)
}

export const getAllAppointmentsController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await appointmentService.getAllAppointments()
  return res.json(result)
}

export const getAppointmentByIdController = async (req: Request, res: Response, next: NextFunction) => {
  const appointment_id = req.params.appointment_id
  const appointment = await appointmentService.getAppointmentById(appointment_id)
  if (!appointment) {
    return res.status(404).json({ message: 'Appointment not found' })
  }
  return res.json(appointment)
}

export const updateAppointmentController = async (req: Request, res: Response, next: NextFunction) => {
  const appointment_id = req.params.appointment_id
  const result = await appointmentService.updateAppointment(appointment_id, req.body)
  return res.json(result)
}

export const deleteAppointmentController = async (req: Request, res: Response, next: NextFunction) => {
  const appointment_id = req.params.appointment_id
  const result = await appointmentService.deleteAppointment(appointment_id)
  return res.json(result)
}

export const markAppointmentDoneController = async (req: Request, res: Response, next: NextFunction) => {
  const appointment_id = req.params.appointment_id
  const result = await appointmentService.markAsDone(appointment_id)
  return res.json(result)
}
