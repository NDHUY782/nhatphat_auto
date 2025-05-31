import { ObjectId } from 'mongodb'
import { ContactRequestBody } from '~/models/requests/ContactRequest'
import Contact from '~/models/schemas/Contact.Schema'
import databaseService from '~/services/database.service'

class ContactService {
  async createContact(body: ContactRequestBody) {
    const contact = new Contact({ ...body, handled: false })
    return await databaseService.contacts.insertOne(contact)
  }

  async getAllContacts({ limit, page }: { limit: number; page: number }) {
    return await databaseService.contacts
      .find()
      .sort({ created_at: -1 })
      .skip(limit * (page - 1))
      .limit(limit)
      .toArray()
  }

  // async updateContact(contact_id: string) {
  //   return await databaseService.contacts.findOneAndUpdate(
  //     { _id: new ObjectId(contact_id) },
  //     {
  //       $set: {
  //         handled: true,
  //         updated_at: new Date()
  //       }
  //     },
  //     { returnDocument: 'after' }
  //   )
  // }

  async markAsHandled(contact_id: string) {
    return await databaseService.contacts.findOneAndUpdate(
      { _id: new ObjectId(contact_id) },
      { $set: { handled: true, updated_at: new Date() } },
      { returnDocument: 'after' }
    )
  }
  async deleteContact(contact_id: string) {
    return await databaseService.contacts.findOneAndDelete({ _id: new ObjectId(contact_id) })
  }
}

const contactService = new ContactService()
export default contactService
