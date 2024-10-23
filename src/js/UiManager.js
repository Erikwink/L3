import { Converter } from 'unit-converter'
import { HistoryManager } from './HistoryManager.js'
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
    this.historyManager = new HistoryManager()
    this.showCalculation = false
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
    this.convertBtn = document.getElementById('convert-btn')
    this.convertedValueDisplay = document.getElementById('converted-value')
    this.valueInput = document.getElementById('value')
    this.fromUnitInput = document.getElementById('from-unit')
    this.toUnitInput = document.getElementById('to-unit')
    this.decimalsInput = document.getElementById('decimals')
  }

  /**
   *
   */
  bindEvents () {
    this.sliderInput.addEventListener('change', () => this.toggleView())
    this.calculationBtn.addEventListener('click', () => this.isCalculationShown())
    this.clearHistoryBtn.addEventListener('click', () => this.historyManager.clearHistory())
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
    this.historyManager.appendToHistoryList()
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
  isCalculationShown () {
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

    try {
      const calculation = this.converter.convertToCalc(fromUnit, toUnit)
      const result = this.showCalculation
        ? calculation
        : this.converter.convertToString(fromUnit, toUnit)

      this.#displayResult(result)
      this.historyManager.saveToLocalstorage(calculation)
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
}
