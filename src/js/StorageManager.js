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

  /** Saves an item to local storage.
   *
   * @param item The item to save to local storage.
   */
  save (item) {
    const items = this.getItems()
    const lastItem = this.getLastSavedItem(items)
    if (this.#isDuplicate(item, lastItem)) {
      items.push(item)
      localStorage.setItem(this.keyForLocalStorage, JSON.stringify(items))
    }
  }

  getLastSavedItem (items) {
    return items[items.length - 1]
  }

  /** Gets all items from local storage.
   *
   */
  getItems () {
    return JSON.parse(localStorage.getItem(this.keyForLocalStorage)) || []
  }

  /** Clears all items from local storage.
   *
   */
  async clear () {
    try {
      if (!this.getItems().length) {
        this.alertManager.NoDataToClear()
        return false
      } else {
        const boolean = await this.alertManager.clearDataOptions()
        console.log(boolean)
        if (boolean) {
          this.#clearLocalStorage()
          return true
        } else {
          return false
        }
      }
    } catch (error) {
      this.alertManager.Error(error)
    }
  }

  #clearLocalStorage () {
    localStorage.removeItem(this.keyForLocalStorage)
  }
}
