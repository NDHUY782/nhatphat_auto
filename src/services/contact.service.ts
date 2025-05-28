import { ObjectId } from 'mongodb'
import Contact from '~/models/schemas/Contact.Schema'
import databaseService from '~/services/database.service'

class ContactService {
  async createContact(body: any) {
    const contact = new Contact({ ...body, handled: false })
    return await databaseService.contacts.insertOne(contact)
  }

  async getAllContacts() {
    return await databaseService.contacts.find().sort({ created_at: -1 }).toArray()
  }

  async updateContact(contact_id: string, body: any) {
    return await databaseService.contacts.findOneAndUpdate(
      { _id: new ObjectId(contact_id) },
      { $set: { ...body, updated_at: new Date() } },
      { returnDocument: 'after' }
    )
  }

  async deleteContact(contact_id: string) {
    return await databaseService.contacts.findOneAndDelete({ _id: new ObjectId(contact_id) })
  }

  async markAsHandled(contact_id: string) {
    return await databaseService.contacts.findOneAndUpdate(
      { _id: new ObjectId(contact_id) },
      { $set: { handled: true, updated_at: new Date() } },
      { returnDocument: 'after' }
    )
  }
}

const contactService = new ContactService()
export default contactService
