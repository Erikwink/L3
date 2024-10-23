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
    console.log('Cache DOM')
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
    this.calculationBtn.addEventListener('click', () => this.toggelCalculation())
    this.clearHistoryBtn.addEventListener('click', () => this.clearHistory())
    this.convertBtn.addEventListener('click', () => this.convertUnits())
  }

  /**
   *
   */
  toggleView () {
    if (this.sliderInput.checked) {
      this.sliderHeader.textContent = 'Previous Calculations'
      this.conversionForm.style.display = 'none'
      this.calculationHistory.style.display = 'block'
      this.showHistory()
    } else {
      this.sliderHeader.textContent = 'Convert'
      this.conversionForm.style.display = 'block'
      this.calculationHistory.style.display = 'none'
    }
  }

  /**
   *
   */
  toggelCalculation () {
    console.log('Toggle Calculation')
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
   */
  convertUnits () {
    const value = parseFloat(this.valueInput.value)
    const fromUnit = this.fromUnitInput.value
    const toUnit = this.toUnitInput.value
    const decimals = parseInt(this.decimalsInput.value)

    if (!value || !fromUnit || !toUnit) {
      this.displayError('Please fill in all fields!')
      return
    }

    this.converter.setValue(value)
    this.converter.setDecimals(decimals)

    try {
      const result = this.showCalculation
        ? this.converter.convertToCalc(fromUnit, toUnit)
        : this.converter.convertToString(fromUnit, toUnit)

      this.convertedValueDisplay.textContent = result
      this.saveCalculation(this.converter.convertToCalc(fromUnit, toUnit))
    } catch (error) {
      this.displayError(error.message)
    }
  }

  displayError(error) {
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: error,
      footer: 'Please try again'
    })
  }

  /**
   *
   * @param calculation
   */
  saveCalculation (calculation) {
    const calculations = JSON.parse(localStorage.getItem('calculations')) || []
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
    localStorage.removeItem('calculations')
    this.historyList.innerHTML = ''
  }
}
