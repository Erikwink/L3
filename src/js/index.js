import { Converter } from 'unit-converter'
const converter = new Converter()

// Populate the "from" and "to" dropdowns with available units
const unitMap = converter.getUnits()
const fromSelect = document.getElementById('from-unit')
const toSelect = document.getElementById('to-unit')

// Flags to keep track of toggle states
let showCalculation = false
document.addEventListener('DOMContentLoaded', function () {
  const sliderInput = document.querySelector('.switch input')
  const sliderHeader = document.querySelector('#slider-header')
  const conversionForm = document.getElementById('conversion-form')
  const calculationHistory = document.getElementById('calculation-history')

  // Listen for the change event of the slider
  sliderInput.addEventListener('change', function () {
    if (sliderInput.checked) {
      console.log('Show previous calculations')
      sliderHeader.textContent = 'Previous Calculations'
      conversionForm.setAttribute('hidden', '') // Properly hide the form
      calculationHistory.removeAttribute('hidden') // Show the calculation history
      showHistory() // Show previous calculations
    } else {
      sliderHeader.textContent = 'Convert'
      conversionForm.removeAttribute('hidden') // Show the form
      calculationHistory.setAttribute('hidden', '') // Properly hide the history
    }
  })
})

// Populate options for units
function populateUnits () {
  for (const type in unitMap) {
    unitMap[type].forEach(unit => {
      const option1 = document.createElement('option')
      option1.value = unit
      option1.textContent = `${unit} (${type})`
      const option2 = option1.cloneNode(true)

      fromSelect.appendChild(option1)
      toSelect.appendChild(option2)
    })
  }
}

// Run function to populate units dropdowns
populateUnits()

// Add event listener to the "Convert" button
document.getElementById('convert-btn').addEventListener('click', () => {
  const value = document.getElementById('value').value
  const fromUnit = document.getElementById('from-unit').value
  const toUnit = document.getElementById('to-unit').value
  const decimals = document.getElementById('decimals').value

  if (!value || !fromUnit || !toUnit) {
    alert('Please fill in all fields!')
    return
  }

  try {
    // Set the value and decimals
    converter.setValue(parseFloat(value))
    converter.setDecimals(parseInt(decimals))

    let result = ''
    if (showCalculation) {
      result = converter.convertToCalc(fromUnit, toUnit)
    } else {
      result = converter.convertToString(fromUnit, toUnit)
    }

    document.getElementById('converted-value').textContent = result
    saveCalculation(`${value} ${fromUnit} = ${result} ${toUnit}`)
  } catch (error) {
    alert(error.message)
  }
})

/**
 * Save the calculation to local storage.
 */
function saveCalculation (calculation) {
  const calculations = JSON.parse(localStorage.getItem('calculations')) || []
  calculations.push(calculation)
  localStorage.setItem('calculations', JSON.stringify(calculations))
}

/**
 * Show the previous calculations from local storage.
 */
function showHistory () {
  const historyList = document.getElementById('history-list')
  const calculations = JSON.parse(localStorage.getItem('calculations')) || []

  historyList.innerHTML = '' // Clear old history
  calculations.forEach(calc => {
    const li = document.createElement('li')
    li.textContent = calc
    historyList.appendChild(li)
  })
}
