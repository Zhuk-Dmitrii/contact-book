import inputMask from 'inputmask'
import { inputPhoneNumberElement, inputEditPhoneNumberElement } from './app'

export function initPhoneMask() {
   inputMask({ mask: '+375 (99) 999-99-99' }).mask(inputPhoneNumberElement)
   inputMask({ mask: '+375 (99) 999-99-99' }).mask(inputEditPhoneNumberElement)
}