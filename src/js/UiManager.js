export class UiManager {
  initialize () {
    this.#cacheDOM()
  }

  /**
   *
   */
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

  /**
   *
   * @param unitMap
   */
  /* fillDropdowns (unitMap) {
    for (const type in unitMap) {
      unitMap[type].forEach(unit => {
        const option1 = this.createOptionElement(unit, type)
        const option2 = option1.cloneNode(true)
        this.fromSelect.appendChild(option1)
        this.toSelect.appendChild(option2)
      })
    }
  } */
    fillDropdowns(unitMap) {
      this.#clearSelectOptions(this.fromSelect);
    this.#clearSelectOptions(this.toSelect);
    
      for (const type in unitMap) {
        const optgroup = document.createElement('optgroup')
        optgroup.label = type
        unitMap[type].forEach(unit => {
          const option = this.#createOptionElement(unit)
          optgroup.appendChild(option)
        })
        this.fromSelect.appendChild(optgroup.cloneNode(true))
        this.toSelect.appendChild(optgroup)
      }
    }
    

  #createOptionElement (unit) {
    const option = document.createElement('option')
    option.value = unit
    option.textContent = `${unit}`
    return option
  }

  #clearSelectOptions(selectElement) {
    while (selectElement.firstChild) {
      selectElement.removeChild(selectElement.firstChild);
    }
  }

  /**
   *
   */
  showHistoryPage () {
    this.sliderHeader.textContent = 'Previous Calculations'
    this.conversionForm.style.display = 'none'
    this.calculationHistory.style.display = 'block'
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
   * @param boolean
   */
  updateCalculationBtnText (boolean) {
    this.calculationBtn.textContent = boolean ? 'Hide Calculation' : 'Show Calculation'
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
   * @param calculations
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
}
