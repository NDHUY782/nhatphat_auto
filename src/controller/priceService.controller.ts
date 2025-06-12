import { Request, Response, NextFunction } from 'express'
import { ObjectId } from 'mongodb'
import { CreatePriceServiceRequestBody } from '~/models/requests/PriceService.request'
import priceServiceService from '~/services/priceService.service'

export const createPriceServiceController = async (req: Request, res: Response, next: NextFunction) => {
  const data = req.body as CreatePriceServiceRequestBody
  const result = await priceServiceService.create(data)
  return res.status(201).json({ message: 'Created successfully', data: result })
}

export const getAllPriceServicesController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await priceServiceService.getAll()
  return res.json({ data: result })
}

export const getPriceServiceByIdController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const result = await priceServiceService.getById(id)
  return res.json({ data: result })
}

export const updatePriceServiceController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  const updated = await priceServiceService.update(id, req.body)
  return res.json({ message: 'Updated successfully', data: updated })
}

export const deletePriceServiceController = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params
  await priceServiceService.delete(id)
  return res.json({ message: 'Deleted successfully' })
}
