import { ObjectId } from 'mongodb'
import { AppointmentRequestBody, UpdateAppointmentRequestBody } from '~/models/Requests/AppointmentRequest'
import Appointment from '~/models/schemas/Appointment,Schema'
import databaseService from '~/services/database.service'

class AppointmentService {
  async createAppointment(body: AppointmentRequestBody) {
    const now = new Date()
    const expectedDateTime = new Date(`${body.expected_date}T${body.expected_time}`)

    if (expectedDateTime < now) {
      throw new Error('Expected appointment time must be in the future')
    }

    const exists = await databaseService.appointments.findOne({
      license_plate: body.license_plate,
      expected_date: new Date(body.expected_date),
      expected_time: body.expected_time
    })

    if (exists) {
      throw new Error('This time slot is already booked for this license plate')
    }

    const appointment = new Appointment({
      ...body,
      services: body.services.map((id) => new ObjectId(id)),
      center: body.center,
      status: body.status ?? 'pending'
    })

    return await databaseService.appointments.insertOne(appointment)
  }

  async getAllAppointments({ limit, page }: { limit: number; page: number }) {
    return await databaseService.appointments
      .find()
      .sort({ expected_date: 1, expected_time: 1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray()
  }

  async getAppointmentById(appointment_id: string) {
    return await databaseService.appointments.findOne({ _id: new ObjectId(appointment_id) })
  }

  async updateAppointment(appointment_id: string, body: UpdateAppointmentRequestBody) {
    return await databaseService.appointments.findOneAndUpdate(
      { _id: new ObjectId(appointment_id) },
      {
        $set: {
          ...body,
          services: body.services?.map((id) => new ObjectId(id)),
          center: body.center,
          updated_at: new Date()
        }
      },
      { returnDocument: 'after' }
    )
  }

  async deleteAppointment(appointment_id: string) {
    return await databaseService.appointments.findOneAndDelete({ _id: new ObjectId(appointment_id) })
  }

  async markAsDone(appointment_id: string) {
    return await databaseService.appointments.findOneAndUpdate(
      { _id: new ObjectId(appointment_id) },
      { $set: { status: 'done', updated_at: new Date() } },
      { returnDocument: 'after' }
    )
  }
}

const appointmentService = new AppointmentService()
export default appointmentService
