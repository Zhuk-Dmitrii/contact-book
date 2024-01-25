import { groupContainerOffcanvasElement, containerMainElement, selectGroupElement, editSelectGroupElement } from './app'
import { buildGroupOffcanvas, buildAccordionGroup, buildSelectGroupOption, buildDefaultSelectionOption, buildElementAboutMainContainer } from './templates'

// -------------------------RENDER---------------------
export function render(data, container) {
   let itemsTemplate = ''

   if (container == groupContainerOffcanvasElement) {
      data.forEach(item => {
         const groupTemplate = buildGroupOffcanvas(item)
         itemsTemplate += groupTemplate
      })

      container.innerHTML = itemsTemplate
   }

   if (container == containerMainElement) {
      data.forEach(item => {
         const groupTemplate = buildAccordionGroup(item)
         itemsTemplate += groupTemplate
      })

      itemsTemplate ? container.innerHTML = itemsTemplate
         : container.innerHTML = buildElementAboutMainContainer()
   }

   if (container == selectGroupElement) {
      const defaultOption = buildDefaultSelectionOption()

      data.forEach(item => {
         const optionTemplate = buildSelectGroupOption(item)
         itemsTemplate += optionTemplate
      })

      container.innerHTML = defaultOption + itemsTemplate
   }

   if (container == editSelectGroupElement) {
      data.forEach(item => {
         const optionTemplate = buildSelectGroupOption(item)
         itemsTemplate += optionTemplate
      })

      container.innerHTML = itemsTemplate
   }
}

// -------------------------LOCAL STORAGE---------------------
// get data from Local Storage
export function getData() {
   return JSON.parse(localStorage.getItem('contactBookData')) || []
}

// set data in Local Storage
export function setData(item) {
   return localStorage.setItem('contactBookData', JSON.stringify(item))
}