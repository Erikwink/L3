import { Converter } from 'unit-converter'
import { LocalStorageManager } from './LocalStorageManager.js'
import { UiManager } from './UiManager.js'
import { AlertManager } from './AlertManager.js'
/* eslint-disable */

export class Controller {
  showCalculation = false

  constructor () {
    this.alertManager = new AlertManager()
    this.localStorageManager = new LocalStorageManager('calculations_unit_converter')
    this.uiManager = new UiManager()
    this.converter = new Converter()
  }

  initialize () {
    this.uiManager.initialize()
    this.uiManager.fillDropdowns(this.converter.getUnits())
    this.bindEvents()
  }

  bindEvents () {
    this.uiManager.sliderInput.addEventListener('change', () => this.switchView())
    this.uiManager.calculationBtn.addEventListener('click', () => this.toggleCalculationVisibility())
    this.uiManager.convertBtn.addEventListener('click', () => this.handleConvert())
    this.uiManager.clearHistoryBtn.addEventListener('click', () => this.handleClearHistory())
  }

  switchView () {
    if (this.uiManager.sliderInput.checked) {
      this.showHistoryPage()
    } else {
      this.showCalculationPage()
    }
  }

  showHistoryPage () {
    const items = this.localStorageManager.getItems()
    this.uiManager.appendToHistoryList(items)
    this.uiManager.showHistoryPage()
  }

  showCalculationPage () {
    this.uiManager.showCalculationPage()
  }

  toggleCalculationVisibility () {
    this.showCalculation = !this.showCalculation
    this.uiManager.updateCalculationBtnText(this.showCalculation)
  }

  handleConvert () {
    const { value, fromUnit, toUnit, decimals } = this.uiManager.getConversionInput()

    try {
      const { result, calculation } = this.#performConversion(value, fromUnit, toUnit, decimals)
      this.uiManager.displayResult(result)
      this.localStorageManager.save(calculation)
    } catch (error) {
      this.alertManager.showError(error.message)
    }
  }

  #performConversion (value, fromUnit, toUnit, decimals) {
    this.converter.setDecimals(decimals)
    this.converter.setValue(value)

    const calculation = this.converter.convertToCalc(fromUnit, toUnit)
    const result = this.showCalculation
      ? calculation
      : this.converter.convertToString(fromUnit, toUnit)

      return {result, calculation}
  }

  async handleClearHistory () {
    try {
      if (!this.localStorageManager.hasItems()) {
        this.alertManager.showNoDataToClear()
        return
      }
      if (await this.alertManager.showConfirmClearData()) {
        this.uiManager.clearHistoryList()
        this.localStorageManager.clearLocalStorage()
      }
    } catch (error) {
      this.alertManager.showError(error.message)
    }
  }
}
