/* eslint-disable jsdoc/require-returns */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable jsdoc/check-param-names */
/* eslint-disable jsdoc/require-param-description */
/* eslint-disable jsdoc/require-param-type */
import Swal from 'sweetalert2'

export class StorageManager {
  constructor (storageKey) {
    this.keyForLocalStorage = storageKey
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
  clear () {
    if (!this.getItems().length) {
      Swal.fire({
        icon: 'info',
        title: 'Oops...',
        text: 'There is no data to clear!'
      })
    } else {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You will not be able to recover the data!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, clear it!',
        cancelButtonText: 'No, keep it'
      }).then((result) => {
        if (result.isConfirmed) {
          this.#clearLocalStorage()
          Swal.fire(
            'Cleared!',
            'Your data has been cleared.',
            'success'
          )
        }
      })
    }
  }

  #clearLocalStorage () {
    localStorage.removeItem(this.keyForLocalStorage)
  }
}
