

//form validation
const name = document.getElementById("name");
const password = document.querySelector("#password");
const form = document.querySelector("form");
const errorElement = document.querySelector("#error");

form.addEventListener("submit", (e) => {
    let messages = []
    if (name.value === "" || name.value == null){
        messages.push("Name is required");
    }

    if (password.value.length <= 6){
        messages.push("Password must be longer than 6 characters")
    }

    if (password.value.length >= 20){
        messages.push("Password must be shorter than 20 characters")
    }
    if (messages.length > 0){
        e.preventDefault()
        errorElement.textContent = messages.join(", ");
    }
})

//LCM Calculator
const numberInput = document.querySelector("#numberInput");
const errorLCM = document.querySelector("#errorLCM");
const submitBtn = document.querySelector("#submitBtn");
const answerLCMp = document.querySelector("#answerLCMp");

numberInput.addEventListener("submit", submitLCM);

let messageLCM = []

function submitLCM(e){
    const number1 = document.querySelector("#number1").value;
    const number2 = document.querySelector("#number2").value;
    let messageLCM = []
    if (number1 === "" || number1 == null){
        messageLCM.push("Number 1 is required");
    }
    if (number2 === "" || number2 == null){
        messageLCM.push("Number 2 is required");
    }
    if (number1.length > 0 && number2.length){
        if (isNaN(parseInt(number1)) || isNaN(parseInt(number2))){
            messageLCM.push("Make sure you typed in a number");
        }
    }
    if (messageLCM.length < 1){
        lcmAns();
    }
    e.preventDefault()
    errorLCM.textContent = messageLCM.join(", ");
}

function lcmAns(){
    const number1 = parseInt(document.querySelector("#number1").value);
    const number2 = parseInt(document.querySelector("#number2").value);
    let greaterNum = Math.max(parseInt(number1), parseInt(number2))
    let lessNum = Math.min(parseInt(number1), parseInt(number2))
    if (lessNum === 0){
        answerLCMp.innerHTML = greaterNum;
    }
    if (messageLCM.length < 1){
        if (number1 === number2){
            answerLCMp.innerHTML = number1;
        }
        let LCM = greaterNum;
        while (true){
            if (LCM % number1 == 0 && LCM % number2 == 0){
                answerLCMp.innerHTML = LCM;
                break;
            }
            LCM++;
        }
    }
}

//Counter
let countEl = document.getElementById("count-el")
let saveEl = document.getElementById("save-el")

let count = 0

function increment() {
    count += 1
    countEl.innerText = count
}

function reset() {
    count = 0
    countEl.textContent = 0
}

function save() {
    var countStr = count + " - "
    saveEl.textContent += countStr
}

//Drum kit

function playSound(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`.key[data-key="${e.keyCode}"]`)
    audio.currentTime = 0; //rewind to start
    audio.play()
    key.classList.add("playing"); //adding transition
    if(!audio) return;
}

//removing transition
function removeTransition(e) {
    if(e.propertyName !== "transform") return;
    this.classList.remove("playing")
}

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown",playSound);

//Clock

const secHand = document.querySelector("#secHand");
const minHand = document.querySelector("#minHand");
const hrHand = document.querySelector("#hrHand");

function setDate() {
    const now = new Date();
    const seconds = now.getSeconds();
    const secondsDegrees = ((seconds/ 60) * 360) + 90;
    secHand.style.transform = `rotate(${secondsDegrees}deg)`;
   
    const minutes = now.getMinutes();
    const minDegrees = ((minutes/60) * 360) + ((seconds / 60) * 6) + 90;
    minHand.style.transform = `rotate(${minDegrees}deg)`;
    
    const hours = now.getHours();
    const hrDegrees = ((hours / 12) * 360) + ((minutes / 60) * 30) + 90;
    hrHand.style.transform = `rotate(${hrDegrees}deg)`;
}

setInterval(setDate, 1000);

//Vending Machine
const windowSnacks = document.querySelector("#windowSnacks");
const snacks = document.querySelectorAll(".snack");
const enterBtn = document.querySelector("#enterVendingNum");
const resetVendingBtn = document.querySelector("#resetVendingBtn");
const dropChuteCtn = document.querySelector("#dropChuteCtn");

function enter(e) {
  const inputNum = document.querySelector("#foodSelector").value;
  snacks.forEach(snack => {
    if (snack.id == inputNum) {
      snack.style.zIndex = "2";
      snack.style.transition = "transform 0.75s";
      let snackLoc = snack.getBoundingClientRect();
      let dropChuteloc = dropChuteCtn.getBoundingClientRect();
      let dropRate = dropChuteloc.top - snackLoc.top + 40;
      if (snackLoc.top < dropChuteloc.top) {
        snack.style.transform = `translateY(${dropRate}px)`;
      } else if (snackLoc.top >= dropChuteloc.top) {
        snack.style.transform = "none";
      }
    }
  });
}

function VMreset(e) {
  e.preventDefault();
  snacks.forEach(snack => {
    snack.style.transition = "none";
    snack.style.transform = "none";
  });
}


resetVendingBtn.addEventListener("click", VMreset);
enterBtn.addEventListener("click", enter);

//Rock Paper Scissors (RPS)

const buttons = document.querySelectorAll(".playerChoice");
const RPSresultMessage = document.querySelector("#RPSresultMessage");
const cpuChoiceMessage = document.querySelector("#cpuChoiceMessage")

//button animation
buttons.forEach(button => {
    button.addEventListener("click", playerChoiceSelection);
});

function playerChoiceSelection(e) {
    buttons.forEach(button => {
        button.classList.remove("active");
    })
    e.target.classList.add("active");
}

//game logic
function submitPlayerChoice(button){
    let playerChoice = checkBorderColor();
    console.log(playerChoice)
    let cpuChoice = cpuChoiceSelector();
    console.log(cpuChoice);
    if(cpuChoice === playerChoice){
        RPSresultMessage.innerHTML = "Tie";
    } else if (
        playerChoice === "rock" && cpuChoice === "scissors"|| 
        playerChoice === "scissors" && cpuChoice === "paper"|| 
        playerChoice ==="paper" && cpuChoice === "rock"
    ){
        RPSresultMessage.innerHTML = "You win";
    } else {
        RPSresultMessage.innerHTML = "You lose";
    }
}

function checkBorderColor() {
    let playerChoice = null;
    for (const button of buttons) {
        const computedStyle = getComputedStyle(button);
        const borderColor = computedStyle.getPropertyValue("border-color");
        if (borderColor === "rgb(173, 138, 48)") {
            let playerChoice = button.id;
            return playerChoice;
        }
    };
}

function cpuChoiceSelector(){
    const cpuChoiceOptions = ["rock","paper","scissors"];
    const cpuChoiceIndex = Math.floor(Math.random() * cpuChoiceOptions.length);
    let cpuChoice = cpuChoiceOptions[cpuChoiceIndex];
    cpuChoiceMessage.innerHTML = cpuChoice;
    return cpuChoice;
}

//Tic Tac Toe

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.querySelector("#board");
const TTTplayer1 = document.querySelector("#TTTplayer1");
const TTTplayer2 = document.querySelector("#TTTplayer2");
const TTTwinMsgText = document.querySelector(".WinMsgText");
const TTTwinMsg = document.querySelector(".winMsg");
const TTTrestartBtn = document.querySelector("#restartBtn");

const xClass = "x"
const circleClass = "circle"
let circleTurn
const winningCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

startGame()

TTTrestartBtn.addEventListener("click", startGame)

function startGame(){
    circleTurn = false
    cellElements.forEach(cell => {
        cell.classList.remove(xClass);
        cell.classList.remove(circleClass);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, {once: true});
    })
    setBoardHoverClass();
    TTTwinMsg.classList.remove("show");
}

function handleClick(e){
    //placeMark
    const cell = e.target;
    const currentClass = circleTurn ? circleClass : xClass;
    placeMark(cell, currentClass);
    //Checking outcome
    if (checkWin(currentClass)) {
        endTTTGame(false);
    } else if (isDraw()) {
        endTTTGame(true);
    }
    //if none, switch turns
    swapTurns()
    setBoardHoverClass()
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function setBoardHoverClass() {
    board.classList.remove(xClass);
    board.classList.remove(circleClass);
    if (circleTurn) {
        board.classList.add(circleClass);
        TTTplayer1.classList.remove("TTTunderline");
        TTTplayer2.classList.add("TTTunderline");
    } else {
        board.classList.add(xClass);
        TTTplayer1.classList.add("TTTunderline");
        TTTplayer2.classList.remove("TTTunderline");
    }
}

//check win
function checkWin(currentClass) {
    return winningCombos.some (combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        })
    })
}

//check for draw
function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(xClass) ||
        cell.classList.contains(circleClass);
    })
}

//updating winMsg to show outcome
function endTTTGame(draw){
    if (draw) {
        TTTwinMsgText.innerText = "Draw"
    } else {
        TTTwinMsgText.innerText =
        `${circleTurn ? "Player 2" : "Player 1"} Wins`;
    }
    TTTwinMsg.classList.add("show");
}

//Pixel Drawing

const PDgrid = document.querySelector("#PDgrid");
const PDsizeRange = document.querySelector("#PDsizeRange");
const rangeNumMsg = document.querySelector("#rangeNumMsg");
const PDcolorInput = document.querySelector("#PDcolorInput");
const PDclear = document.querySelector("#PDclear");
const PDeraser = document.querySelector("#PDeraser");

const defaultRangeValue = 15;
let rangeValue = defaultRangeValue;
let gridSize = rangeValue * rangeValue;
rangeNumMsg.textContent = rangeValue;
let containerWidth, containerHeight, cellSize;
let mouseDown = false;
let PDcurrentColor = PDcolorInput.value;
let eraserOn = false;
let gridRow = rangeValue;

PDsizeRange.addEventListener("input", () => {
    rangeValue = PDsizeRange.value;
    rangeNumMsg.textContent = rangeValue;
    gridRow = rangeValue
    updateGrid();
});

PDcolorInput.addEventListener("input", () => {
    PDcurrentColor = PDcolorInput.value;
});

window.addEventListener("DOMContentLoaded", () => {  
    let containerWidth = PDgrid.offsetWidth;
    let containerHeight = PDgrid.offsetHeight;
    let cellSize = Math.floor(Math.min(containerWidth, containerHeight)/rangeValue) + "px";
    createGrid();
    coloring();
})

function createGrid(){
    PDgrid.innerHTML = "";
    PDgrid.style.gridTemplateRows = `repeat(${gridRow}, 1fr)`;
    PDgrid.style.gridTemplateColumns = `repeat(${gridRow}, 1fr)`;
    for (let i = 0; i < gridSize; i++){
        let gridElement = document.createElement("div");
        gridElement.classList.add("gridElement");
        gridElement.style.width = cellSize;
        gridElement.style.height = cellSize;
        PDgrid.appendChild(gridElement);
    }
}

function updateGrid() {
    PDgrid.innerHTML = "";
    PDgrid.style.gridTemplateRows = `repeat(${gridRow}, 1fr)`;
    PDgrid.style.gridTemplateColumns = `repeat(${gridRow}, 1fr)`;
    gridSize = gridRow * gridRow;
    createGrid();
    coloring();
}

function coloring(){
const gridElements = document.querySelectorAll(".gridElement");
    gridElements.forEach((gridElement) => {
        gridElement.addEventListener("mousedown", () => {
            mouseDown = true;
            if (eraserOn) {
                gridElement.style.background = "white";
            } else {
                gridElement.style.background = PDcurrentColor;
            }
        });
        gridElement.addEventListener("mouseenter", () => {
            if (mouseDown) {
                if (eraserOn) {
                    gridElement.style.background = "white";
                } else {
                    gridElement.style.background = PDcurrentColor;
                }
            }
        });
    });
    window.addEventListener("mouseup", () => {
        mouseDown = false;
    });
}

PDclear.addEventListener("click", () => {
const gridElements = document.querySelectorAll(".gridElement");
    gridElements.forEach((gridElement) => {
        gridElement.style.background = "white";
    })
});

PDeraser.addEventListener("click", () => {
    if (eraserOn !== true){
    eraserOn = false;
    PDeraser.style.transform = "scale(1)";
    } else {
    eraserOn = true;
    PDeraser.style.transform = "scale(1.1)";
    }
}) 

PDsizeRange.addEventListener("input", () => {
    rangeValue = PDsizeRange.value;
    rangeNumMsg.textContent = rangeValue;
    gridRow = rangeValue
    updateGrid();
});

PDcolorInput.addEventListener("input", () => {
    PDcurrentColor = PDcolorInput.value;
});

window.addEventListener("DOMContentLoaded", () => {  
    let containerWidth = PDgrid.offsetWidth;
    let containerHeight = PDgrid.offsetHeight;
    let cellSize = Math.floor(Math.min(containerWidth, containerHeight)/rangeValue) + "px";
    createGrid();
    coloring();
})

function createGrid(){
    PDgrid.innerHTML = "";
    PDgrid.style.gridTemplateRows = `repeat(${gridRow}, 1fr)`;
    PDgrid.style.gridTemplateColumns = `repeat(${gridRow}, 1fr)`;
    for (let i = 0; i < gridSize; i++){
        let gridElement = document.createElement("div");
        gridElement.classList.add("gridElement");
        gridElement.style.width = cellSize;
        gridElement.style.height = cellSize;
        PDgrid.appendChild(gridElement);
    }
}

function updateGrid() {
    PDgrid.innerHTML = "";
    PDgrid.style.gridTemplateRows = `repeat(${gridRow}, 1fr)`;
    PDgrid.style.gridTemplateColumns = `repeat(${gridRow}, 1fr)`;
    gridSize = gridRow * gridRow;
    createGrid();
    coloring();
}

function coloring(){
const gridElements = document.querySelectorAll(".gridElement");
    gridElements.forEach((gridElement) => {
        gridElement.addEventListener("mousedown", () => {
            mouseDown = true;
            if (eraserOn) {
                gridElement.style.background = "white";
            } else {
                gridElement.style.background = PDcurrentColor;
            }
        });
        gridElement.addEventListener("mouseenter", () => {
            if (mouseDown) {
                if (eraserOn) {
                    gridElement.style.background = "white";
                } else {
                    gridElement.style.background = PDcurrentColor;
                }
            }
        });
    });
    window.addEventListener("mouseup", () => {
        mouseDown = false;
    });
}

PDclear.addEventListener("click", () => {
const gridElements = document.querySelectorAll(".gridElement");
    gridElements.forEach((gridElement) => {
        gridElement.style.background = "white";
    })
});

PDeraser.addEventListener("click", () => {
    if (eraserOn == true){
    eraserOn = false;
    PDeraser.style.transform = "scale(1)";
    } else {
    eraserOn = true;
    PDeraser.style.transform = "scale(1.1)";
    }
}) 


//Carousel

const C1 = document.querySelector("#C1");
const C2 = document.querySelector("#C2");
const C3 = document.querySelector("#C3");
const nextBtn = document.querySelector(".carouselBtn--right");
const backBtn = document.querySelector(".carouselBtn--left");
const CI1 = document.querySelector(".CI1");
const CI2 = document.querySelector(".CI2");
const CI3 = document.querySelector("#CI3");

let currentCslide = 1;

nextBtn.addEventListener("click", cNextFunc);
backBtn.addEventListener("click", cBackFunc);

CI1.addEventListener("click", () => {
    currentCslide = 1
    displaySlide();
})

CI2.addEventListener("click", () => {
    currentCslide = 2
    displaySlide();
})

CI3.addEventListener("click", () => {
    currentCslide = 3
    displaySlide();
})

function cNextFunc(){
    currentCslide += 1;
    if (currentCslide > 3) {
        currentCslide = 1;
      }
    displaySlide();
}

function cBackFunc(){
    currentCslide -= 1;
    if (currentCslide < 1) {
      currentCslide = 3;
    }
    displaySlide()
}

function displaySlide(){
    CI1.classList.remove("carouselNavLoc")
    CI2.classList.remove("carouselNavLoc")
    CI3.classList.remove("carouselNavLoc")

    console.log(currentCslide)
    if (currentCslide === 1){
        C1.scrollIntoView({ behavior: 'smooth' });
        CI1.classList.add("carouselNavLoc")
    } else if (currentCslide === 2){
        C2.scrollIntoView({ behavior: 'smooth' });
        CI2.classList.add("carouselNavLoc")
    } else if (currentCslide === 3){
        C3.scrollIntoView({ behavior: 'smooth' });
        CI3.classList.add("carouselNavLoc")
    }
}

//Email Contact Form

const ECFsubmitBtn = document.querySelector("#ECFsubmitBtn")
const ECFalertMSG = document.querySelector("#ECFalertMSG");


document.getElementById('EFCform').addEventListener('submit', function(e){
    e.preventDefault();

    ECFsubmitBtn.classList.add("ECFbtnAnimation")
    setTimeout(() => {
        ECFsubmitBtn.classList.remove("ECFbtnAnimation");
    }, 300);

    ECFsubmitBtn.value = 'Sending...';

    const serviceID = 'default_service';
    const templateID = 'template_we6i907';
 
    emailjs.sendForm(serviceID, templateID, this)
     .then(() => {
       ECFsubmitBtn.value = 'Send Email';
       ECFmsgAlert();
     }, (err) => {
       ECFsubmitBtn.value = 'Send Email';
        alert(JSON.stringify(err));
     });
})

function ECFmsgAlert(){
    ECFalertMSG.classList.add("ECFanimationMsg");
    setTimeout(() => {
        ECFalertMSG.classList.add("ECFanimationOut")
        ECFalertMSG.classList.remove("ECFanimationMsg");
    }, 1500);
}


