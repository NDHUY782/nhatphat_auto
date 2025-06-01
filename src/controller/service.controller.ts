import { Request, Response, NextFunction } from 'express'
import serviceService from '~/services/service.service'
import { TokenPayload } from '~/models/requests/User.requests'
import { ObjectId } from 'mongodb'
import { uploadCloudinary } from '~/constants/cloudinary'
import { ParamsDictionary } from 'express-serve-static-core'
import { ServiceParams, ServiceRequestBody } from '~/models/requests/ServiceRequest'

export const createServiceController = async (
  req: Request<ParamsDictionary, any>,
  res: Response,
  next: NextFunction
) => {
  const { admin_id } = req.decoded_authorization as TokenPayload
  const { name, content, price } = req.body as ServiceRequestBody

  const images_name = JSON.parse(req.body.images_name || '[]')
  const files = (req.files as Express.Multer.File[]) || []

  const uploadedUrls: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = images_name[i] || `blog-image-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedUrls.push(uploadedUrl)
  }

  const service = await serviceService.createService({
    name,
    content,
    price,
    images: uploadedUrls,
    images_name,
    author_id: new ObjectId(admin_id)
  })

  return res.json(service)
}

export const getAllServicesController = async (req: Request, res: Response, next: NextFunction) => {
  const services = await serviceService.getAllServices()
  return res.json(services)
}

export const getServiceByIdController = async (
  req: Request<ParamsDictionary, any, ServiceParams>,
  res: Response,
  next: NextFunction
) => {
  const { service_id } = req.params
  const service = await serviceService.getServiceById(service_id)
  return res.json(service)
}

export const updateServiceController = async (req: Request, res: Response, next: NextFunction) => {
  const { service_id } = req.params
  const images_name = JSON.parse(req.body.images_name || '[]')
  const files = req.files as Express.Multer.File[]

  const uploadedUrls: string[] = []

  for (let i = 0; i < files.length; i++) {
    const file = files[i]
    const imageBase64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`
    const fileName = images_name[i] || `blog-image-${Date.now()}-${i}`
    const uploadedUrl = await uploadCloudinary(imageBase64, fileName)
    uploadedUrls.push(uploadedUrl)
  }
  if (uploadedUrls.length > 0) {
    req.body.images = uploadedUrls
  }
  const updated = await serviceService.updateService(service_id, req.body)
  return res.json(updated)
}

export const deleteServiceController = async (
  req: Request<ParamsDictionary, any, ServiceParams>,
  res: Response,
  next: NextFunction
) => {
  const { service_id } = req.params
  const deleted = await serviceService.deleteService(service_id)
  return res.json({
    message: 'Service deleted successfully'
  })
}
