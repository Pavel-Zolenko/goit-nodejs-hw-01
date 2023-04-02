const fs = require("fs").promises;
const path = require("path");
const { v4 } = require('uuid');


const contactsPath = path.join(__dirname, 'db/contacts.json');


async function listContacts() {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await listContacts();
  const contact = contacts.find(contact => contact.id === contactId);
  if (!contact) { 
    return null;
  }
  return contact;
}

async function removeContact(contactId) {
  const contacts = await listContacts();
  const updatedList = contacts.filter(el => el.id !== contactId);
  await updateContacts(updatedList);
  const deletedContact = contacts.find(el => el.id === contactId);
  return deletedContact;
}

async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: v4(), name, email, phone };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
}

function updateContacts(contacts) {
  return fs.writeFile(contactsPath, JSON.stringify(contacts));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
}