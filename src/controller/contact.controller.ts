import { Request, Response, NextFunction } from 'express'
import contactService from '~/services/contact.service'
import { ParamsDictionary } from 'express-serve-static-core'
import { ContactRequestBody } from '~/models/Requests/ContactRequest'
import { Pagination } from '~/models/Requests/BlogRequest'

export const createContactController = async (
  req: Request<ParamsDictionary, any, ContactRequestBody>,
  res: Response,
  next: NextFunction
) => {
  const result = await contactService.createContact(req.body)
  return res.json(result)
}

export const getAllContactsController = async (
  req: Request<ParamsDictionary, any, any, Pagination>,
  res: Response,
  next: NextFunction
) => {
  const limit = parseInt(req.query.limit as string) || 10
  const page = parseInt(req.query.page as string) || 1
  const result = await contactService.getAllContacts({ limit, page })
  return res.json(result)
}

// export const updateContactController = async (req: Request, res: Response, next: NextFunction) => {
//   const contact_id = req.body.contact_id
//   const result = await contactService.updateContact(contact_id)
//   return res.json(result)
// }
export const markContactHandledController = async (req: Request, res: Response, next: NextFunction) => {
  const contact_id = req.body.contact_id
  const result = await contactService.markAsHandled(contact_id)
  return res.json(result)
}

export const deleteContactController = async (req: Request, res: Response, next: NextFunction) => {
  const contact_id = req.body.contact_id
  const result = await contactService.deleteContact(contact_id)
  return res.json(result)
}
