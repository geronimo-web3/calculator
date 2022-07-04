let calcStatus = 0;
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
            if (firstNumber == ""){
                firstNumber = "0.";
            } else {
                firstNumber += ".";
            }
            // disable decimal event handler if selected once
            const btn = document.querySelector("#numberDecimal");
            btn.removeEventListener("click", calculation);
            //if the user clicked delete the slice last character
        } else if (userInput == "delete"){
            if (firstNumber != ""){
                let str = firstNumber;
                firstNumber = str.slice(0, str.length - 1);
                console.log(firstNumber); 
            }
        }


        calcPanel.innerHTML = firstNumber;
    } 
  
}

function clearCalculation(){
    const calcPanel = document.querySelector("#panelRow01");
    const resultPanel = document.querySelector("#panelRow02");

    calcPanel.innerHTML = "";
    resultPanel.innerHTML = "0";
 
    addEventToBtn();
    calcStatus = 0;
    firstNumber = "";
    secondNumber = "";
    operator = ""; 
    console.log("clear panel"); 

}