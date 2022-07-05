let calcStatus = 0;
let calcResult = 0;
let firstNumber = "";
let secondNumber = "";
let operator = ""; 

addEventToBtn();

function addEventToBtn(){
    const btn = document.querySelectorAll(".btn");
    for (const element of btn) {
        element.addEventListener("click", calculation);
      }
}


function calculation(){
    let userInput = this.value;
    console.log(userInput); 

    const calcPanel = document.querySelector("#panelRow01");
    const resultPanel = document.querySelector("#panelRow02");
 
    // Reset calculator if User pressed C button
    if (userInput == "clear"){
        clearCalculation();
    }

    // calcStatus == 0 means first number has to be entered
    if (calcStatus === 0){
        // if a number is clicked then show in display
        if (isNaN(userInput) == false){
            firstNumber += userInput;
        // if the decimal sign is clicked then show 0. in case no number proceeds otherwise attache id
        } else if (userInput == "decimal"){
            firstNumber = addDecimalSignToNumber(firstNumber);
        //if the user clicked delete the slice last character
        } else if (userInput == "delete"){
            firstNumber = deleteCharFromString(firstNumber);
        } else if (userInput == "+" || userInput == "-" || userInput == "*" || userInput == "/"){
            operator = userInput;
            calcStatus = 1;
        }
    } else if (calcStatus === 1){
        if ((userInput == "+" || userInput == "-" || userInput == "*" || userInput == "/") && secondNumber === ""){
            operator = userInput;
        } else if (isNaN(userInput) == false){
            secondNumber += userInput;
        } else if (userInput == "decimal"){
            secondNumber = addDecimalSignToNumber(secondNumber);
        //if the user clicked delete the slice last character
        } else if (userInput == "delete"){
            secondNumber = deleteCharFromString(secondNumber);
        } else if ((userInput == "+" || userInput == "-" || userInput == "*" || userInput == "/") && secondNumber != ""){
            calcResult = calculateResult(operator);
            firstNumber = calcResult;
            secondNumber = "";
            operator = userInput;
        } else if (userInput == "equal" && secondNumber != ""){
            calcResult = calculateResult(operator);
            firstNumber = calcResult;
            secondNumber = "";
            operator = "";
        } 
    }

    calcPanel.innerHTML = `${firstNumber} ${operator} ${secondNumber}` ;
    resultPanel.innerHTML = calcResult ;
  
}

function calculateResult(operat){
    let opResult = 0;

    switch(operat){
        case "+":
            opResult = parseFloat(firstNumber) + parseFloat(secondNumber)
            return opResult;
        case "-":
            opResult = parseFloat(firstNumber) - parseFloat(secondNumber)
            secondNumber = "";
            operator = "";
            return opResult;
        case "*":
            opResult = parseFloat(firstNumber) * parseFloat(secondNumber)
            secondNumber = "";
            operator = "";
            return opResult;
        case "/":
            opResult = parseFloat(firstNumber) / parseFloat(secondNumber)
            secondNumber = "";
            operator = "";
            return opResult;
    }
}

// Clear all for new calculation
function clearCalculation(){
    const calcPanel = document.querySelector("#panelRow01");
    const resultPanel = document.querySelector("#panelRow02");

    calcPanel.innerHTML = "";
    resultPanel.innerHTML = "0";
 
    addEventToBtn();
    calcStatus = 0;
    calcResult = 0;
    firstNumber = "";
    secondNumber = "";
    operator = ""; 
    console.log("clear panel"); 

}
// Check if the number contains a decimal separator and switch handler on/off
function switchDecimalButtonHandler(number){
    const btn = document.querySelector("#numberDecimal");
    if (number.includes(".")){
        btn.removeEventListener("click", calculation);
    } else {
        btn.addEventListener("click", calculation);
    }
}

// Delete the last character from string. If string is 0. delete all
function deleteCharFromString(number){
    if (number == "0."){
        number = "";
        switchDecimalButtonHandler(number);
    } else if (number != ""){
        let str = number;
        number = str.slice(0, str.length - 1);
        switchDecimalButtonHandler(number); 
    }
    return number;
}

function addDecimalSignToNumber(number){
    if (number == ""){
        number = "0.";
    } else {
        number += ".";
    }
    // disable decimal event handler if selected once
    switchDecimalButtonHandler(number);
    return number;
}