import { Offcanvas } from 'bootstrap'
import { initPhoneMask } from './mask'
import { Group, Contact } from './constructors'
import { render, getData, setData } from './helpers'
import '../scss/app.scss'

// -------------------------VARIABLES---------------------
let contactBookData = getData()

// variables button
const btnAddGroupElement = document.getElementById('btnAddGroup')
const btnCloseGroupCreationElement = document.getElementById('closeGroupCreation')
const btnOpenCreateContactElement = document.getElementById('openCreateContact')

// variables input
const inputAddGroupElement = document.getElementById('inputAddGroup')
const inputFullNameElement = document.getElementById('inputFullName')
export const inputPhoneNumberElement = document.getElementById('inputPhoneNumber')
const inputEditFullNameElement = document.getElementById('editInputFullName')
export const inputEditPhoneNumberElement = document.getElementById('editInputPhoneNumber')
const idContactElement = document.getElementById('idContact')
const idGroupElement = document.getElementById('idGroup')

// selection variable
export const selectGroupElement = document.getElementById('selectGroup')
export const editSelectGroupElement = document.getElementById('editSelectGroup')

// variables container
const containerAddGroupElement = document.getElementById('containerAddGroup')
export const groupContainerOffcanvasElement = document.getElementById('groupContainerOffcanvas')
export const containerMainElement = document.getElementById('main')

// variables form
const formGroupOffcanvasElement = document.getElementById('formGroupOffcanvas')
const formContactOffcanvasElement = document.getElementById('formContactOffcanvas')
const formEditContactOffcanvasElement = document.getElementById('formEditContactOffcanvas')

// info variables
const errorSelectGroupElement = document.getElementById('errorSelectGroup')

// -------------------------EVENT LISTENERS---------------------
btnAddGroupElement.addEventListener('click', handleToggleBtnAddGroup)
btnCloseGroupCreationElement.addEventListener('click', handleToggleBtnAddGroup)
btnOpenCreateContactElement.addEventListener('click', handleOpenCreateContact)
formGroupOffcanvasElement.addEventListener('submit', handleSubmitGroupFormOffcanvas)
formContactOffcanvasElement.addEventListener('submit', handleSubmitContactsFormOffcanvas)
formEditContactOffcanvasElement.addEventListener('submit', handleSubmitEditContactFormOffcanvas)
containerMainElement.addEventListener('click', handleClickEditContact)
containerMainElement.addEventListener('click', handleClickDeleteContact)
groupContainerOffcanvasElement.addEventListener('click', handleDeleteGroupOffcanvas)
window.addEventListener('beforeunload', handleBeforeUnload)

// -------------------------Init------------------------------
render(contactBookData, groupContainerOffcanvasElement)
render(contactBookData, containerMainElement)
render(contactBookData, selectGroupElement)
render(contactBookData, editSelectGroupElement)

// -------------------------EVENT HANDLERS---------------------
function handleToggleBtnAddGroup() {
   containerAddGroupElement.classList.toggle('d-none')
   inputAddGroupElement.focus()
   inputAddGroupElement.value = ''
}

function handleOpenCreateContact() {
   if (inputFullNameElement.value == '') inputFullNameElement.focus()
}

function handleSubmitGroupFormOffcanvas(event) {
   event.preventDefault()

   const groupName = inputAddGroupElement.value.trim()
   const group = new Group(groupName)

   if (groupName == '') {
      containerAddGroupElement.classList.add('d-none')
      offcanvasInstance.hide()
      return
   }

   contactBookData.push(group)
   render(contactBookData, groupContainerOffcanvasElement)
   render(contactBookData, containerMainElement)
   render(contactBookData, selectGroupElement)
   render(contactBookData, editSelectGroupElement)
   containerAddGroupElement.classList.toggle('d-none')
   formGroupOffcanvasElement.reset()
}

function handleSubmitContactsFormOffcanvas(event) {
   event.preventDefault()

   const fullName = inputFullNameElement.value.trim()
   const phoneNumber = inputPhoneNumberElement.value
   const status = selectGroupElement.value
   const contact = new Contact(fullName, phoneNumber, status)
   const offcanvasInstance = Offcanvas.getOrCreateInstance('#offcanvasContact')

   if (status == 'Выберите группу') {
      errorSelectGroupElement.textContent = 'Выберите группу или создайте ее'
      return
   }

   contactBookData.forEach(item => {
      if (item.groupName == contact.status) {
         item.dataContacts.push(contact)
      }
   })

   render(contactBookData, containerMainElement)
   formContactOffcanvasElement.reset()
   errorSelectGroupElement.textContent = ''
   offcanvasInstance.hide()
}

function handleSubmitEditContactFormOffcanvas(event) {
   event.preventDefault()

   const offcanvasInstance = Offcanvas.getOrCreateInstance('#editContactOffcanvas')

   const idGroup = idGroupElement.value
   const idContact = idContactElement.value
   const fullName = inputEditFullNameElement.value
   const phoneNumber = inputEditPhoneNumberElement.value
   const status = editSelectGroupElement.value

   const foundGroup = contactBookData.find(item => item.id == idGroup)
   const foundContact = foundGroup.dataContacts.find(item => item.id == idContact)

   foundContact.fullName = fullName
   foundContact.phoneNumber = phoneNumber

   if (status != foundGroup.groupName) {
      foundContact.status = status
      foundGroup.dataContacts = foundGroup.dataContacts.filter(item => item.id != idContact)

      const newGroup = contactBookData.find(item => item.groupName == status)
      newGroup.dataContacts.push(foundContact)
   }

   render(contactBookData, containerMainElement)
   offcanvasInstance.hide()
}

function handleClickEditContact(event) {
   const { target } = event
   const findGroup = target.closest('.contacts-group')
   const findContact = target.closest('.contact-item')
   const findBtnEdit = target.closest('.btn-edit')

   if (findBtnEdit) {
      const foundGroup = contactBookData.find(item => item.id == findGroup.id)
      const foundContact = foundGroup.dataContacts.find(item => item.id == findContact.id)

      idGroupElement.value = findGroup.id
      idContactElement.value = foundContact.id
      inputEditFullNameElement.value = foundContact.fullName
      inputEditPhoneNumberElement.value = foundContact.phoneNumber
      editSelectGroupElement.value = foundContact.status
   }
}

function handleClickDeleteContact(event) {
   const { target } = event
   const findGroup = target.closest('.contacts-group')
   const findContact = target.closest('.contact-item')
   const findBtnDelete = target.closest('.btn-delete')

   if (findBtnDelete) {
      const foundGroup = contactBookData.find(item => item.id == findGroup.id)

      foundGroup.dataContacts = foundGroup.dataContacts.filter(item => item.id != findContact.id)

      render(contactBookData, containerMainElement)
   }
}

function handleDeleteGroupOffcanvas(event) {
   const { target } = event
   const findGroup = target.closest('.group-item')
   const findBtnDelete = target.closest('.btn-delete')

   if (findBtnDelete) {
      contactBookData = contactBookData.filter(item => item.id !== findGroup.id)
   }

   render(contactBookData, groupContainerOffcanvasElement)
   render(contactBookData, containerMainElement)
   render(contactBookData, selectGroupElement)
   render(contactBookData, editSelectGroupElement)
}

function handleBeforeUnload() {
   setData(contactBookData)
}

// masks for inputs
initPhoneMask()