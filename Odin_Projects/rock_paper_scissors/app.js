const choices = ['rock', 'paper', 'scissors'];
const getComputerChoice = () => {

    let index = Math.floor(Math.random() * (choices.length));
    console.log('index ', index);
    return choices[index];

}
let player1Score = 0;
let computerScore = 0;
let round = 0;
const playRound = (playerSelection, computerSelection) => {

    let playerVal = playerSelection.toLowerCase();
    let computerVal = computerSelection.toLowerCase();
    if (playerVal === 'rock' && computerVal === 'scissors') {
        player1Score++;
        console.log("You Win! rock beats scissors");

    } else if (playerVal === 'scissors' && computerVal === 'rock') {
        computerScore++;
        console.log("You Lose! rock beats scissors");
    } else if (playerVal === 'paper' && computerVal === 'rock') {
        player1Score++;
        console.log("You Win! paper beats rock");
    } else if (playerVal === 'rock' && computerVal === 'paper') {
        computerScore++;
        console.log("You Lose! paper beats rock");
    } else if (playerVal === 'scissors' && computerVal === 'paper') {
        player1Score++;
        console.log("You Win! scissors beats paper");
    } else if (playerVal === 'paper' && computerVal === 'scissors') {
        computerScore++;
        console.log("You Lose! scissors beats paper");
    } else {
        console.log("it's a tie");
    }





}




let game = () => {




    window.onload = () => {
        let rockBtn = document.createElement("button");
        rockBtn.id = "rock";
        rockBtn.textContent = "Rock";
        rockBtn.style.backgroundColor = "blue";
        rockBtn.style.color = "white";
        // rockBtn.style.height = "100px";
        // rockBtn.style.width = "auto";
        let paperBtn = document.createElement("button");
        paperBtn.id = "paper";
        paperBtn.textContent = "Paper";
        paperBtn.style.backgroundColor = "green";
        paperBtn.style.color = "white";
        // paperBtn.style.height = "100px";
        // paperBtn.style.width = "auto";
        let scissorsBtn = document.createElement("button");
        scissorsBtn.id = "scissors";
        scissorsBtn.textContent = "Scissors";
        scissorsBtn.style.backgroundColor = "red";
        scissorsBtn.style.color = "white";
        // scissorsBtn.style.height = "100px";
        // scissorsBtn.style.width = "auto";
        let choiceContainer = document.createElement("div");
        choiceContainer.id = "choiceContainer";
        let playerSelection;
        let player1ScoreEle = document.createElement("div");
        player1ScoreEle.id = "player1Score";
        let computerScoreEle = document.createElement("div");
        computerScoreEle.id = "computerScore";
        let scoreCont = document.createElement("div");
        scoreCont.id = "scoreCont";
        scoreCont.appendChild(player1ScoreEle);
        scoreCont.appendChild(computerScoreEle);
        document.body.appendChild(scoreCont)
        let play1Score = document.querySelector("player1Score");
        let compScore = document.querySelector("computerScore");

        let resultEle = document.createElement("div");
        resultEle.id = "result";
        document.body.append(resultEle);


        choiceContainer.appendChild(rockBtn);
        choiceContainer.appendChild(paperBtn);
        choiceContainer.appendChild(scissorsBtn);
        document.body.appendChild(choiceContainer);
        choiceContainer.addEventListener('click', (event) => {
            console.log("clicked")

            let target = event.target;
            console.log("target id ", target.id)
            switch (target.id) {
                case 'rock':
                    playerSelection = target.id;
                    break;
                case 'paper':
                    playerSelection = target.id;
                    break;
                case 'scissors':
                    playerSelection = target.id;
                    break;
            }
            let computerSelection = getComputerChoice();
            round++;
            console.log("player1Score ", player1Score)
            console.log("computerScore ", computerScore)
            console.log("  player selection ", playerSelection, "comp select", computerSelection, "round", round);
            playRound(playerSelection, computerSelection);
            let playerDiv = document.querySelector("#player1Score");
            let compDiv = document.querySelector("#computerScore");
            playerDiv.textContent = player1Score;
            compDiv.textContent = computerScore;

            if (player1Score === 5 || computerScore === 5) {
                if (player1Score > computerScore) {
                    resultEle.textContent = "You won! your score:" + player1Score + " computer score: " + computerScore;
                } else if (computerScore > player1Score) {
                    resultEle.textContent = "You Lost! your score:" + player1Score + " computer score: " + computerScore;
                } else {
                    resultEle.textContent = "tie! your score:" + player1Score + " computer score: " + computerScore;
                }
            }





        });



        // if (player1Score > computerScore) {
        //     resultEle.textContent = "You won! your score:" + player1Score + " computer score: " + computerScore;
        // } else if (computerScore > player1Score) {
        //     resultEle.textContent = "You Lost! your score:" + player1Score + " computer score: " + computerScore;
        // } else {
        //     resultEle.textContent = "tie! your score:" + player1Score + " computer score: " + computerScore;
        // }

    }







}

game();