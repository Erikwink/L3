/* eslint-disable */
export class UiManager {
  initialize () {
    this.#cacheDOM()
  }

  #cacheDOM () {
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

  fillDropdowns (unitMap) {
    for (const type in unitMap) {
      const optgroup = this.#createOptgroupElement(type)
      unitMap[type].forEach(unit => {
        const option = this.#createOptionElement(unit)
        optgroup.appendChild(option)
      })
      this.fromSelect.appendChild(optgroup.cloneNode(true))
      this.toSelect.appendChild(optgroup)
    }
  }

  #createOptgroupElement (type) {
    const optgroup = document.createElement('optgroup')
    optgroup.label = type
    return optgroup
  }

  #createOptionElement (unit) {
    const option = document.createElement('option')
    option.value = unit
    option.textContent = `${unit}`
    return option
  }

  showHistoryPage () {
    this.sliderHeader.textContent = 'Previous Calculations'
    this.conversionForm.style.display = 'none'
    this.calculationHistory.style.display = 'block'
  }

  showCalculationPage () {
    this.sliderHeader.textContent = 'Convert'
    this.conversionForm.style.display = 'block'
    this.calculationHistory.style.display = 'none'
  }

  updateCalculationBtnText (boolean) {
    this.calculationBtn.textContent = boolean ? 'Hide Calculation' : 'Show Calculation'
  }

  getConversionInput () {
    return {
      value: parseFloat(this.valueInput.value),
      fromUnit: this.fromUnitInput.value,
      toUnit: this.toUnitInput.value,
      decimals: parseInt(this.decimalsInput.value)
    }
  }

  appendToHistoryList (calculations) {
    this.historyList.innerHTML = ''
    calculations.forEach(calc => {
      const li = document.createElement('li')
      li.textContent = calc
      li.innerHTML = calc.replace(/\n/g, '<br>')
      this.historyList.appendChild(li)
    })
  }

  clearHistoryList () {
    this.historyList.textContent = ''
  }

  displayResult (result) {
    this.convertedValueDisplay.textContent = result
  }
}
