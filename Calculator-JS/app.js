// Variables to store calculator state
let display = "0";
let previousValue = null;
let operation = null;
let waitingForNewValue = false;

// Update the display on the screen
function updateCalculatorDisplay() {
  document.getElementById("display").textContent = display;
}

// Handle number button clicks
function useNumberClick(number) {
  if (waitingForNewValue) {
    display = String(number);
    waitingForNewValue = false;
  } else {
    display = display === "0" ? String(number) : display + number;
  }
  updateCalculatorDisplay();
}

// Handle decimal point
function showDecimalNumber(){
    if(waitingForNewValue){
        display = "0";
        waitingForNewValue = false;
    } else if (!display.includes(".")){
        display = display + ".";
    }
    updateCalculatorDisplay()
}

// Handle operation buttons (+, -, *, /)
function useOperationsButtons(operations){
    const currentValue = parseFloat(display);

    if(previousValue === null){
        previousValue = currentValue;
    } else if (operation){
        const showResult = calculate(previousValue, currentValue, operation);
        display = String(showResult);
        previousValue = showResult
    }

    waitingForNewValue = true;
    operation = operations;
    updateCalculatorDisplay()
}

// Calculate the result
function calculate(firstNumber, secondNumber, operation){
    if(operation === "+") return firstNumber + secondNumber;
    if(operation === "-") return firstNumber - secondNumber;
    if(operation === "/") return firstNumber / secondNumber;
    if(operation === "*") return firstNumber * secondNumber;
    return secondNumber
}

// Handle equals button
function handleEquals(){
    const currentValue = parseFloat(display)

    if(operation && previousValue !== null){
        const showResult = calculate(previousValue, currentValue, operation);
        display = String(showResult);
        previousValue = null;
        operation = null;
        waitingForNewValue = true;
    }
    updateCalculatorDisplay()
}

// Clear everything
function clearCalculator(){
    display = "0"
    previousValue = null
    operation = null
    waitingForNewValue = false
    updateCalculatorDisplay()
}

// Delete last character
// function handleDelete(){
//     if(display.length > 1){
//         display = display.slice(0, -1)
//     } else {
//         display = "0"
//     }
//     updateCalculatorDisplay()
// }

// Delete current number (entire number at once)
function handleDelete() {
  display = '0';
  updateCalculatorDisplay();
}