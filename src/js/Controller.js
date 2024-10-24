import { Converter } from 'unit-converter'
import { StorageManager } from './StorageManager.js'
import { UiManager } from './UiManager.js'
import { AlertManager } from './AlertManager.js'

/**
 *
 */
export class Controller {
  /**
   *
   */
  constructor () {
    this.alertManager = new AlertManager()
    this.storageManager = new StorageManager('calculations_unit_converter')
    this.uiManager = new UiManager()
    this.converter = new Converter()
    this.showCalculation = false
  }

  /**
   *
   */
  initialize () {
    this.uiManager.initialize()
    this.uiManager.populateUnits(this.converter.getUnits())
    this.bindEvents()
  }

  /**
   *
   */
  bindEvents () {
    this.uiManager.convertBtn.addEventListener('click', () => this.handleConvert())
    this.uiManager.clearHistoryBtn.addEventListener('click', () => this.handleClearHistory())
    this.uiManager.sliderInput.addEventListener('change', () => this.toggleView())
    this.uiManager.calculationBtn.addEventListener('click', () => this.toggleCalculationState())
  }

  /**
   *
   */
  toggleCalculationState () {
    this.showCalculation = !this.showCalculation
    this.displaySliderText(this.showCalculation)
  }

  /**
   *
   * @param boolean
   */
  displaySliderText (boolean) {
    this.uiManager.showCalculationStateText(boolean)
  }

  /**
   *
   */
  toggleView () {
    if (this.uiManager.sliderInput.checked) {
      this.showHistoryPage()
    } else {
      this.showCalculationPage()
    }
  }

  /**
   *
   */
  showHistoryPage () {
    const calculations = this.storageManager.getItems()
    this.uiManager.appendToHistoryList(calculations)
    this.uiManager.showHistoryPage()
  }

  /**
   *
   */
  showCalculationPage () {
    this.uiManager.showCalculationPage()
  }

  /**
   *
   */
  handleConvert () {
    const { value, fromUnit, toUnit, decimals } = this.uiManager.getConversionInput()

    try {
      this.converter.setDecimals(decimals)
      this.converter.setValue(value)

      const calculation = this.converter.convertToCalc(fromUnit, toUnit)
      const result = this.showCalculation
        ? calculation
        : this.converter.convertToString(fromUnit, toUnit)

      this.uiManager.displayResult(result)
      this.storageManager.save(calculation)
    } catch (error) {
      this.alertManager.Error(error.message)
    }
  }

  /**
   *
   */
  async handleClearHistory () {
    try {
      const boolean = await this.storageManager.clear()
      if (boolean) {
        this.uiManager.clearHistoryList()
      }
    } catch (error) {
      this.alertManager.Error(error.message)
    }
  }
}
