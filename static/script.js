const screen = document.getElementById("calc-screen")
const clearButton = document.getElementById("clear-btn")

let currentNumber = ""
let currentNegative = false

let onSecondNum = false
let allClear = false

let numA = null
let numB = null
let _operator = null

function writeToDisplay() {
    if (currentNumber.length == 0) {
        screen.textContent = "0"
    }
    else if (!currentNegative) {
        screen.textContent = currentNumber
    }
    else {
        screen.textContent = "-" + currentNumber
    }
}

function changeClearButton() {
    if (allClear) {
        clearButton.textContent = "AC"
    }
    else {
        clearButton.textContent = "C"
    }
}

function clearAll() {
    currentNumber = ""
    currentNegative = false

    onSecondNum = false

    numA = null
    numB = null
    _operator = null

    allClear = false
    changeClearButton()

    writeToDisplay()
}

function clearNum() {
    currentNumber = ""
    currentNegative = false

    allClear = true
    changeClearButton()

    writeToDisplay()
    
}

function addDigit(digit) {
    if (currentNumber.length < 12) {
        currentNumber += digit
        allClear = false
        changeClearButton()
        writeToDisplay()
    }
}

function addDecimalPoint() {
    if (!currentNumber.includes(".")) {

        if (currentNumber == "") {
            currentNumber = "0."
        }
        else {
            currentNumber += "."
        }

        allClear = false
        changeClearButton()
        writeToDisplay()
    }
}

function addOperator(operator) {
    if (currentNumber.length == 0) {
        return
    }

    if (!onSecondNum) {
        onSecondNum = true

        numA = Number(currentNumber)

        if (currentNegative) {
            numA = -numA
        }

        _operator = operator

        currentNumber = ""
        currentNegative = false

        allClear = false
        changeClearButton()
        writeToDisplay()
    }
}

function changePolarity() {
    if (currentNumber.length == 0) {
        return
    }

    if (currentNegative){
        currentNegative = false
    }
    else{
        currentNegative = true
    }
    
    writeToDisplay()
}

function backspace() {
    if (currentNumber.length != 0) {
        currentNumber = currentNumber.slice(0, -1)

        if (currentNumber.length == 0) {
            currentNegative = false
        }

        writeToDisplay()
    }
}

function clearClick() {
    if (allClear){
        clearAll()
    }
    else{
        clearNum()
    }
}

function calculate() {

}