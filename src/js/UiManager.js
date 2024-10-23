import { Converter } from 'unit-converter'
import Swal from 'sweetalert2'

/**
 *
 */
export class UiManager {
  /**
   *
   * @param converter
   */
  constructor () {
    this.converter = new Converter()
    this.showCalculation = false
    this.initialize()
  }

  /**
   *
   */
  initialize () {
    this.cacheDOM()
    this.bindEvents()
    this.populateUnits()
  }

  /**
   *
   */
  cacheDOM () {
    this.fromSelect = document.getElementById('from-unit')
    this.toSelect = document.getElementById('to-unit')
    this.sliderInput = document.querySelector('.switch input')
    this.sliderHeader = document.querySelector('#slider-header')
    this.conversionForm = document.getElementById('conversion-form')
    this.calculationHistory = document.getElementById('calculation-history')
    this.calculationBtn = document.getElementById('toggle-calculation')
    this.clearHistoryBtn = document.getElementById('clear-history')
    this.historyList = document.getElementById('history-list')
    this.convertBtn = document.getElementById('convert-btn')
    this.convertedValueDisplay = document.getElementById('converted-value')
    this.valueInput = document.getElementById('value')
    this.fromUnitInput = document.getElementById('from-unit')
    this.toUnitInput = document.getElementById('to-unit')
    this.decimalsInput = document.getElementById('decimals')
    this.errorPage = document.getElementById('error-page')
    this.errorHeader = document.getElementById('error-header')
    this.errorText = document.getElementById('error-text')
  }

  /**
   *
   */
  bindEvents () {
    this.sliderInput.addEventListener('change', () => this.toggleView())
    this.calculationBtn.addEventListener('click', () => this.toggleCalculation())
    this.clearHistoryBtn.addEventListener('click', () => this.clearHistory())
    this.convertBtn.addEventListener('click', () => this.convertUnits())
  }

  /**
   *
   */
  toggleView () {
    if (this.sliderInput.checked) {
      this.#showHistoryPage()
    } else {
      this.#showCalculationPage()
    }
  }

  /**
   *
   */
  #showHistoryPage () {
    this.sliderHeader.textContent = 'Previous Calculations'
    this.conversionForm.style.display = 'none'
    this.calculationHistory.style.display = 'block'
    this.showHistory()
  }

  /**
   *
   */
  #showCalculationPage () {
    this.sliderHeader.textContent = 'Convert'
    this.conversionForm.style.display = 'block'
    this.calculationHistory.style.display = 'none'
  }

  /**
   *
   */
  toggleCalculation () {
    this.showCalculation = !this.showCalculation
    this.calculationBtn.textContent = this.showCalculation ? 'Hide Calculation' : 'Show Calculation'
  }

  /**
   *
   */
  populateUnits () {
    const unitMap = this.converter.getUnits()
    for (const type in unitMap) {
      unitMap[type].forEach(unit => {
        const option1 = document.createElement('option')
        option1.value = unit
        option1.textContent = `${unit} (${type})`
        const option2 = option1.cloneNode(true)
        this.fromSelect.appendChild(option1)
        this.toSelect.appendChild(option2)
      })
    }
  }

  /**
   *
   * @param value
   * @param fromUnit
   * @param toUnit
   */
  #validateInput (value, fromUnit, toUnit) {
    if (!value || !fromUnit || !toUnit) {
      this.displayError('Please fill in all fields!')
      return false
    } else {
      return true
    }
  }

  /**
   *
   */
  #getConversionInput () {
    return {
      value: parseFloat(this.valueInput.value),
      fromUnit: this.fromUnitInput.value,
      toUnit: this.toUnitInput.value,
      decimals: parseInt(this.decimalsInput.value)
    }
  }

  /**
   *
   */
  convertUnits () {
    const { value, fromUnit, toUnit, decimals } = this.#getConversionInput()

    if (!this.#validateInput(value, fromUnit, toUnit)) {
      return
    }

    this.converter.setValue(value)
    this.converter.setDecimals(decimals)
    const calculation = this.converter.convertToCalc(fromUnit, toUnit)

    try {
      const result = this.showCalculation
        ? calculation
        : this.converter.convertToString(fromUnit, toUnit)

      this.#displayResult(result)
      this.saveCalculation(calculation)
    } catch (error) {
      this.displayError(error.message)
    }
  }

  /**
   *
   * @param result
   */
  #displayResult (result) {
    this.convertedValueDisplay.textContent = result
  }

  /**
   *
   * @param errorMessage
   */
  displayError (errorMessage) {
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: errorMessage,
      footer: 'Please try again'
    })
  }

  /**
   *
   * @param calculation
   */
  saveCalculation (calculation) {
    const calculations = JSON.parse(localStorage.getItem('calculations')) || []
    const lastCalulation = calculations[calculations.length - 1]
    if (calculation === lastCalulation) {
      return
    }
    calculations.push(calculation)
    localStorage.setItem('calculations', JSON.stringify(calculations))
  }

  /**
   *
   */
  showHistory () {
    const calculations = JSON.parse(localStorage.getItem('calculations')) || []
    this.historyList.innerHTML = ''
    calculations.forEach(calc => {
      const li = document.createElement('li')
      li.textContent = calc
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
        localStorage.removeItem('calculations')
        this.historyList.innerHTML = ''
        Swal.fire(
          'Cleared!',
          'Your history has been cleared.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your history is safe :)',
          'error'
        )
      }
    })
  }
}
