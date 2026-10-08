const screen = document.getElementById("calc-screen")
const clearButton = document.getElementById("clear-btn")

let currentNumber = ""
let currentNegative = false

let onSecondNum = false
let allClear = false
let ansDisplay = false

let numA = null
let numB = null
let _operator = null

let lastAns = null

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
    if (ansDisplay){
        ansDisplay = false
        clearNum()
    }

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

    if (ansDisplay){
        ansDisplay = false
        clearNum()
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
    if (ansDisplay){
        ansDisplay = false
        clearNum()
        return
    }

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
        console.log("clearing all")
    }
    else{
        clearNum()
        console.log("clearing number")
    }
}

function getAnswer() {
    if (ansDisplay){
        return
    }
    return
    clearNum()
}

async function calculateAns() {
    if (!onSecondNum || currentNumber.length == 0){
       return 
    }

    numB = Number(currentNumber)

    if (currentNegative){
        numB = -numB
    }

    console.log(numA + "," + numB + "," + _operator)

    const payload = {
        numA: numA,
        numB: numB,
        _operator: _operator
    }

    try {
        const response = await fetch("/calc", {
            method: "POST",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        const data = await response.json()
        
        ansDisplay = true
        
        screen.textContent = data.result
        lastAns = Number(data.result)

        if (data.result !== "Error") {
            numA = Number(data.result);
            currentNumber = data.result;    
        }
        else {
            numA = null;
            numB = null;
            currentNumber = "";
        }

        _operator = null;
        onSecondNum = false;
    }
    catch (error) {
        // This blocks fires if the server is offline or a network dropout happens
        console.error("Async communication failure with Flask:", error);
        screen.textContent = "Error";
    }
}