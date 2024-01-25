export function Group (name, id = crypto.randomUUID()) {
   this.id = id
   this.groupName = name
   this.dataContacts = []
}

export function Contact (fullName, phoneNumber, status, id = crypto.randomUUID()) {
   this.id = id
   this.fullName = fullName
   this.phoneNumber = phoneNumber
   this.status = status
}