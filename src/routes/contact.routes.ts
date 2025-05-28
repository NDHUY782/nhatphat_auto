import { Router } from 'express'
import {
  createContactController,
  deleteContactController,
  getAllContactsController,
  markContactHandledController,
  updateContactController
} from '~/controller/contact.controller'

import { wrapAsync } from '~/utils/handlers'

const contactRouter = Router()

contactRouter.post('/', wrapAsync(createContactController))
contactRouter.get('/', wrapAsync(getAllContactsController))
contactRouter.put('/:contact_id', wrapAsync(updateContactController))
contactRouter.delete('/:contact_id', wrapAsync(deleteContactController))
contactRouter.patch('/:contact_id/handled', wrapAsync(markContactHandledController))

export default contactRouter
