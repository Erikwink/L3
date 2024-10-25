/* eslint-disable */

export class LocalStorageManager {
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

  hasItems () {
    return this.getItems().length > 0
  }

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

  getItems () {
    return JSON.parse(localStorage.getItem(this.keyForLocalStorage)) || []
  }

  clearLocalStorage () {
    localStorage.removeItem(this.keyForLocalStorage)
  }
}
