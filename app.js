let clickSound = new Audio("click.mp3");
let winSound = new Audio("winning.mp3");

let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector("#msg")
let turnText = document.querySelector("#turn-indicator");

let turn0 = true;

const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8],
];

const resetGame = () => {
    turn0 = true;
    enableBoxes();
    msgContainer.classList.add("hide");
    turnText.innerText = "Player 0's Turn";
}

boxes.forEach((box) => {
    box.addEventListener("click", () => {
        if (box.innerText !== "") return;
        clickSound.currentTime = 0;  
        clickSound.play();           


        if (turn0) {
            box.innerText = "0";
            box.classList.add("o-symbol");
            box.classList.remove("x-symbol");
            turn0 = false;
            turnText.innerText = "Player X's Turn";
        } else {
            box.innerText = "X";
            box.classList.add("x-symbol");
            box.classList.remove("o-symbol");
            turn0 = true;
            turnText.innerText = "Player 0's Turn";

        }
        box.style.pointerEvents = "none";

        Winner();
    });
});

const disableBoxes = () => {
    for (let box of boxes) {
        box.style.pointerEvents = "none";
    }
}

const enableBoxes = () => {
    for (let box of boxes) {
        box.style.pointerEvents = "auto";
        box.innerText = "";
        box.classList.remove("x-symbol", "o-symbol");
    }
}

const showWinner = (winner) => {
    winSound.currentTime = 0;
    winSound.play();

    msg.innerText = `Congratulations, Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBoxes();
    turnText.innerText = "";
}

const Winner = () => {
    let winnerFound = false;

    for (let pattern of winPatterns) {
        let pos1Val = boxes[pattern[0]].innerText;
        let pos2Val = boxes[pattern[1]].innerText;
        let pos3Val = boxes[pattern[2]].innerText;

        if (pos1Val !== "" && pos2Val !== "" && pos3Val !== "") {
            if (pos1Val === pos2Val && pos2Val === pos3Val) {
                showWinner(pos1Val);
                winnerFound = true;
                return; 
            }
        }
    }

    let isDraw = true;
    boxes.forEach((box) => {
        if (box.innerText === "") {
            isDraw = false;
        }
    });

    if (!winnerFound && isDraw) {
        msg.innerText = "It's a draw!";
        msgContainer.classList.remove("hide");
        disableBoxes();
    }
};

newGameBtn.addEventListener("click", resetGame)
resetBtn.addEventListener("click", resetGame)
