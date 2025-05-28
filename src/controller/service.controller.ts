import { Request, Response, NextFunction } from 'express'
import serviceService from '~/services/service.service'
import { TokenPayload } from '~/models/requests/User.requests'
import { ObjectId } from 'mongodb'

export const createServiceController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { admin_id } = req.decoded_authorization as TokenPayload
    const { name, content, price, images } = req.body

    const service = await serviceService.createService({
      name,
      content,
      price,
      images: images || [],
      author_id: new ObjectId(admin_id)
    })

    return res.json(service)
  } catch (error) {
    next(error)
  }
}

export const getAllServicesController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const services = await serviceService.getAllServices()
    return res.json(services)
  } catch (error) {
    next(error)
  }
}

export const getServiceByIdController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { service_id } = req.params
    const service = await serviceService.getServiceById(service_id)
    return res.json(service)
  } catch (error) {
    next(error)
  }
}

export const updateServiceController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { service_id } = req.params
    const updated = await serviceService.updateService(service_id, req.body)
    return res.json(updated)
  } catch (error) {
    next(error)
  }
}

export const deleteServiceController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { service_id } = req.params
    const deleted = await serviceService.deleteService(service_id)
    return res.json(deleted)
  } catch (error) {
    next(error)
  }
}
