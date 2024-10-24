import { Converter } from 'unit-converter'
import { StorageManager } from './StorageManager.js'
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
    this.showCalculation = false
  }

  /**
   *
   */
  initialize () {
    this.cacheDOM()
    this.bindEvents()
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
    this.historyList = document.getElementById('history-list')
  }

  /**
   *
   */
  bindEvents () {
    /* this.sliderInput.addEventListener('change', () => this.toggleView()) */
   /*  this.calculationBtn.addEventListener('click', () => this.showCalculationStateText()) */
    /* this.clearHistoryBtn.addEventListener('click', () => {
      this.storageManager.clear()
      this.clearHistoryList()
    }) */
    // this.convertBtn.addEventListener('click', () => this.convertUnits())
  }

  /**
   *
   */
  populateUnits (unitMap) {
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
  toggleView () {
    console.log('toggleView from UiManager')
    /* if (this.sliderInput.checked) {
      this.showHistoryPage()
    } else {
      this.showCalculationPage()
    } */
  }

  
  /**
   *
   */
  showHistoryPage () {
    this.sliderHeader.textContent = 'Previous Calculations'
    this.conversionForm.style.display = 'none'
    this.calculationHistory.style.display = 'block'
    /* this.appendToHistoryList() do from controller */
  }

  /**
   *
   */
  showCalculationPage () {
    this.sliderHeader.textContent = 'Convert'
    this.conversionForm.style.display = 'block'
    this.calculationHistory.style.display = 'none'
  }

  /**
   *
   */
  showCalculationStateText (boolean) {
    this.calculationBtn.textContent = boolean ? 'Hide Calculation' : 'Show Calculation'
  }

  /**
   *
   */
  get callculationState () {
    return this.showCalculation
  }

  /**
   *
   */
  getConversionInput () {
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
  /* convertUnits () {
    const { value, fromUnit, toUnit, decimals } = this.getConversionInput()

    this.converter.setValue(value)
    this.converter.setDecimals(decimals)

    try {
      const calculation = this.converter.convertToCalc(fromUnit, toUnit)
      const result = this.showCalculation
        ? calculation
        : this.converter.convertToString(fromUnit, toUnit)

      this.displayResult(result)
      this.storageManager.save(calculation)
    } catch (error) {
      this.displayError(error.message)
    }
  } */

  /**
   *
   */
  appendToHistoryList (calculations) {
    /* const calculations = this.storageManager.getItems() */
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
  clearHistoryList () {
    this.historyList.textContent = ''
  }

  /**
   *
   * @param result
   */
  displayResult (result) {
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
