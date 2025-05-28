import { Request, Response, NextFunction } from 'express'
import contactService from '~/services/contact.service'

export const createContactController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await contactService.createContact(req.body)
  return res.status(201).json(result)
}

export const getAllContactsController = async (req: Request, res: Response, next: NextFunction) => {
  const result = await contactService.getAllContacts()
  return res.json(result)
}

export const updateContactController = async (req: Request, res: Response, next: NextFunction) => {
  const contact_id = req.params.contact_id
  const result = await contactService.updateContact(contact_id, req.body)
  return res.json(result)
}

export const deleteContactController = async (req: Request, res: Response, next: NextFunction) => {
  const contact_id = req.params.contact_id
  const result = await contactService.deleteContact(contact_id)
  return res.json(result)
}

export const markContactHandledController = async (req: Request, res: Response, next: NextFunction) => {
  const contact_id = req.params.contact_id
  const result = await contactService.markAsHandled(contact_id)
  return res.json(result)
}
