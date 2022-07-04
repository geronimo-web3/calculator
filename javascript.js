const btn = document.querySelectorAll(".btn");

for (const element of btn) {
    element.addEventListener("click", calculatorCmd);
  }

function calculatorCmd() {
    const calcPanel = document.querySelector("#panelRow02");
    console.log("hallo");

    calcPanel.innerText = this.innerText;
}