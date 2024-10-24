import { Converter } from 'unit-converter'
import { StorageManager } from './StorageManager.js'
import { UiManager } from './UiManager.js'
import { AlertManager } from './AlertManager.js'

export class Controller {
  showCalculation = false

  constructor () {
    this.alertManager = new AlertManager()
    this.storageManager = new StorageManager('calculations_unit_converter')
    this.uiManager = new UiManager()
    this.converter = new Converter()
  }

  initialize () {
    this.uiManager.initialize()
    this.uiManager.fillDropdowns(this.converter.getUnits())
    this.bindEvents()
  }

  bindEvents () {
    this.uiManager.sliderInput.addEventListener('change', this.toggleView.bind(this))
    this.uiManager.calculationBtn.addEventListener('click', this.toggleCalculationVisibility.bind(this))
    this.uiManager.convertBtn.addEventListener('click', this.handleConvert.bind(this))
    this.uiManager.clearHistoryBtn.addEventListener('click', this.handleClearHistory.bind(this))
  }

  toggleView () {
    if (this.uiManager.sliderInput.checked) {
      this.showHistoryPage()
    } else {
      this.showCalculationPage()
    }
  }

  showHistoryPage () {
    const items = this.storageManager.getItems()
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

  

  /**
   *
   */
  handleConvert () {
    const { value, fromUnit, toUnit, decimals } = this.uiManager.getConversionInput()

    try {
      this.#performConversion(value, fromUnit, toUnit, decimals)
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

    this.uiManager.displayResult(result)
    this.storageManager.save(calculation)
  }

  async handleClearHistory () {
    try {
      if (!this.storageManager.hasItems()) {
        this.alertManager.showNoDataToClear()
        return
      }
      if (await this.alertManager.confirmClearData()) {
        this.uiManager.clearHistoryList()
        this.storageManager.clearLocalStorage()
      }
    } catch (error) {
      this.alertManager.showError(error.message)
    }
  }
}
