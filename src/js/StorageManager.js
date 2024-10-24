/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable jsdoc/check-param-names */
/* eslint-disable jsdoc/require-param-description */
/* eslint-disable jsdoc/require-param-type */
// import Swal from 'sweetalert2'
import { AlertManager } from './AlertManager.js'

export class StorageManager {
  constructor (storageKey) {
    this.keyForLocalStorage = storageKey
    this.alertManager = new AlertManager()
  }

  #isDuplicate (newItem, oldItem) {
    if (newItem === oldItem) {
      return false
    } else {
      return true
    }
  }

  hasItems () {
    return this.getItems().length > 0
  }

  /** Saves an item to local storage.
   *
   * @param item The item to save to local storage.
   */
  save (item) {
    const items = this.getItems()
    const lastItem = this.#getLastSavedItem(items)
    if (this.#isDuplicate(item, lastItem)) {
      items.push(item)
      localStorage.setItem(this.keyForLocalStorage, JSON.stringify(items))
    }
  }

  #getLastSavedItem (items) {
    return items[items.length - 1]
  }

  /** Gets all items from local storage.
   *
   */
  getItems () {
    return JSON.parse(localStorage.getItem(this.keyForLocalStorage)) || []
  }

  clearLocalStorage () {
    localStorage.removeItem(this.keyForLocalStorage)
  }
}
