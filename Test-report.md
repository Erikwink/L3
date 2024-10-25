# Test-report

## Test cases
### 1 Convert Units
  - Steps:
    1. Fill all the fields on the main page (Value, From, To, Decimals)
    3. Press convert
  - Expected Result:
    - Correct conversion shows under convert button
### 1.1 Convert different types of units
  - Steps:
    1. Choose "From" and "To" from different types of messure (ton and kt)
    2. Press convert
  - Expected Result:
   - Error message is displayed "Cannot convert between ton and kt"
### 1.2 Convert without value
  - Steps:
    1. Leave the "Value" field empty
    2. Fill in the rest
    3. Press convert
  - Expected Result:
    - Error message is displayed "Value needs to be a number"
### 1.3 Convert same unit
  - Steps:
    1. Choose the same unit in "From" and "To" fields. (kg and kg)
    2. Press convert
  - Expected Result:
    - Error message is displayed "Cannot convert between the same unit."

### 2 Show history
  - Steps:
    1. Do a couple of conversion
    2. Press the slider to display previous calculations
  - Expected Result:
    - Previous calculations page is showing with correct calculations.
### 2.1 Clear history
  - Steps:
    1. Navigate to previous calculations
    2. press Clear History
    3. Press "yes, clear it!" on the popup
  - Expected Result:
    - Popup is displayed showing the user that the history is cleared.
### 2.2 No history to clear
  - Steps:
    1. Press clear history again (when no history is displayed)
  - Expected Result:
    - Popup is presented telling the user that there is no data to clear.
### 3 Show calculations
  - Steps:
    1. Press the "Show Calculation" button
    2. Do a conversion
  - Expected Result:
    - The displayed result contains a calculation
### 3.1 Hide calculations
  - Steps:
    1. Press the "Hide Calculation" button
    2. Do a conversion
  - Expected Result:
    - The displayed result doesn´t contain a calculation
- 
  - Steps:
  - Expected Result:
