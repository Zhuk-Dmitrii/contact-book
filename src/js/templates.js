export function buildGroupOffcanvas({ id, groupName }) {
   return `
      <div id="${id}" class="mb-3 d-flex justify-content-between group-item">
         <p class="form-control bg-body-secondary border-0 fw-bold d-flex align-items-center">${groupName}</p>
         <button class="btn-control btn-delete" type="button">
            <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
               <g clip-path="url(#clip0_1_5003)">
               <path opacity="0.3" d="M6.66676 20.3889C6.66676 21.55 7.61676 22.5 8.77787 22.5H17.2223C18.3834 22.5 19.3334 21.55 19.3334 20.3889V7.72222H6.66676V20.3889ZM9.26343 12.8733L10.7518 11.385L13.0001 13.6228L15.2379 11.385L16.7262 12.8733L14.4884 15.1111L16.7262 17.3489L15.2379 18.8372L13.0001 16.5994L10.7623 18.8372L9.27398 17.3489L11.5118 15.1111L9.26343 12.8733ZM16.6945 4.55556L15.639 3.5H10.3612L9.30565 4.55556H5.61121V6.66667H20.389V4.55556H16.6945Z" fill="black" />
               </g>
               <defs>
                  <clipPath id="clip0_1_5003">
                  <rect width="25.3333" height="25.3333" fill="white" transform="translate(0.333374 0.333344)" />
                  </clipPath>
               </defs>
            </svg>
         </button>
      </div>
   `
}

export function buildAccordionGroup({ id, groupName, dataContacts }) {
   const collapsedClass = dataContacts.length == 0 ? 'collapsed' : ''
   const showClass = dataContacts.length == 0 ? '' : 'show'
   let itemsTemplate = ''

   if (dataContacts.length != 0) {
      dataContacts.forEach(item => itemsTemplate += buildAccordionGroupItem(item))
   }

   return `
      <div class="accordion mb-3 contacts-group" id="${id}">
         <div class="accordion-item">
            <h2 class="accordion-header">
               <button class="accordion-button bg-body ${collapsedClass}" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${id}">
                  ${groupName}
               </button>
            </h2>
            <div id="collapse${id}" class="accordion-collapse collapse ${showClass}" data-bs-parent="#${id}">
               ${itemsTemplate}
            </div>
         </div>
      </div>
   `
}

function buildAccordionGroupItem(data) {
   return `
      <div id="${data.id}" class="accordion-body d-flex justify-content-between align-items-center contact-item">
         <span>${data.fullName}</span>
         <div class="d-flex align-items-center">
            <span>${data.phoneNumber}</span>
            <button class="btn-control btn-edit" data-bs-toggle="offcanvas" data-bs-target="#editContactOffcanvas">
               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <g clip-path="url(#clip0_140_17)">
                     <path opacity="0.3" d="M3 17.2501V21.0001H6.75L17.81 9.94006L14.06 6.19006L3 17.2501ZM20.71 7.04006C21.1 6.65006 21.1 6.02006 20.71 5.63006L18.37 3.29006C17.98 2.90006 17.35 2.90006 16.96 3.29006L15.13 5.12006L18.88 8.87006L20.71 7.04006Z" fill="black"/>
                  </g>
                  <defs>
                     <clipPath id="clip0_140_17">
                        <rect width="24" height="24" fill="white"/>
                     </clipPath>
                  </defs>
               </svg>
            </button>
            <button class="btn-control btn-delete" type="button">
               <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 26 26" fill="none">
                  <g clip-path="url(#clip0_1_5003)">
                     <path opacity="0.3" d="M6.66676 20.3889C6.66676 21.55 7.61676 22.5 8.77787 22.5H17.2223C18.3834 22.5 19.3334 21.55 19.3334 20.3889V7.72222H6.66676V20.3889ZM9.26343 12.8733L10.7518 11.385L13.0001 13.6228L15.2379 11.385L16.7262 12.8733L14.4884 15.1111L16.7262 17.3489L15.2379 18.8372L13.0001 16.5994L10.7623 18.8372L9.27398 17.3489L11.5118 15.1111L9.26343 12.8733ZM16.6945 4.55556L15.639 3.5H10.3612L9.30565 4.55556H5.61121V6.66667H20.389V4.55556H16.6945Z" fill="black" />
                  </g>
                  <defs>
                     <clipPath id="clip0_1_5003">
                        <rect width="25.3333" height="25.3333" fill="white" transform="translate(0.333374 0.333344)" />
                     </clipPath>
                  </defs>
               </svg>
            </button>
         </div>
      </div>
   `
}

export function buildSelectGroupOption({ groupName }) {
   return `<option value="${groupName}">${groupName}</option>`
}

export function buildDefaultSelectionOption() {
   return `<option selected hidden>Выберите группу</option>`
}

export function buildElementAboutMainContainer() {
   return `
      <span class="text-body-tertiary position-absolute top-50 start-50 translate-middle">Список контактов пуст</span>
   `
}