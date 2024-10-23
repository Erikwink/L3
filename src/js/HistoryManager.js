import Swal from 'sweetalert2'
/**
 *
 */
export class HistoryManager {
  /**
   *
   */
  constructor () {
    this.keyForLocalStorage = 'calculations_unit_converter'
    this.historyList = document.getElementById('history-list')
  }

  /**
   *
   * @param calculation
   */
  saveToLocalstorage (calculation) {
    const calculations = JSON.parse(localStorage.getItem(this.keyForLocalStorage)) || []
    const lastCalulation = calculations[calculations.length - 1]
    if (calculation === lastCalulation) {
      return
    }
    calculations.push(calculation)
    localStorage.setItem(this.keyForLocalStorage, JSON.stringify(calculations))
  }

  /**
   *
   */
  getCalculations () {
    return JSON.parse(localStorage.getItem(this.keyForLocalStorage)) || []
  }

  /**
   *
   */
  appendToHistoryList () {
    const calculations = this.getCalculations()
    this.historyList.innerHTML = ''
    calculations.forEach(calc => {
      const li = document.createElement('li')
      li.textContent = calc
      li.innerHTML = calc.replace(/\n/g, '<br>')
      this.historyList.appendChild(li)
    })
  }

  /**
   *
   */
  clearHistory () {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this history!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, clear it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.clearLocalStorage()
        this.historyList.textContent = ''
        Swal.fire(
          'Cleared!',
          'Your history has been cleared.',
          'success'
        )
      }
    })
  }

  /**
   *
   */
  clearLocalStorage () {
    localStorage.removeItem(this.keyForLocalStorage)
  }
}
