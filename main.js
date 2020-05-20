let playerInput = "rock", playerScore = 0, computerScore = 0, currentRound = 1;
        const buttons = document.querySelectorAll("button");
        const playerScoreDisplay = document.querySelector("#player-score");
        const computerScoreDisplay = document.querySelector("#computer-score");
        const gameWindow = document.getElementById("play");
        const playerChoice = document.querySelector("#player-selection");
        const selections = document.querySelector("#game-button-wrapper").childNodes;
        playerScoreDisplay.innerText = playerScore;
        computerScoreDisplay.innerText = computerScore;

        buttons.forEach(button => button.addEventListener("click", function(e) {
            getClickTarget(this.id);
        }));
    
        function getClickTarget(target) {
            switch (target) {
                case "rock-button":
                    playerInput = "rock";
                    playerChoice.innerHTML = '<i class="fa fa-hand-rock-o"></i>';
                    playRound(playerInput, computerPlay());
                    break;
                case "paper-button":
                    playerInput = "paper";
                    playerChoice.innerHTML = '<i class="fa fa-hand-paper-o"></i>';
                    playRound(playerInput, computerPlay());
                    break;
                case "scissors-button":
                    playerInput = "scissors";
                    playerChoice.innerHTML = '<i class="fa fa-hand-scissors-o"></i>';
                    playRound(playerInput, computerPlay());
                    break;
                case "reset-button":
                    startGame();
                    break;    
                default:
                return null;
                    break;
            };
        };

        function computerPlay() {
            const CHOICES = ["rock", "paper", "scissors"];
            return CHOICES[Math.floor(Math.random() * CHOICES.length)];
        };

        function updateScores() {
            playerScoreDisplay.innerText = playerScore;
            computerScoreDisplay.innerText = computerScore;
        }

        function print(str) {
            const newLine = document.createElement("p");
            newLine.innerText = str; 
            gameWindow.appendChild(newLine);
        };

        function capitalize(str) {
        return str[0].toUpperCase() + str.slice(1).toLowerCase();
        };

        function playRound(playerSelection, computerSelection) {
            print(`Round ${currentRound}:`);
            if (playerSelection === 'rock' && computerSelection === 'paper' ||
                playerSelection === 'paper' && computerSelection === 'scissors' ||
                playerSelection === 'scissors' && computerSelection === 'rock') {
                computerScore++;
                currentRound++;
                updateScores();
                print(`Round lost. ${capitalize(playerSelection)} vs ${capitalize(computerSelection)}.`);
            } else if (playerSelection === computerSelection) {
                currentRound++;
                print(`Round tie. ${capitalize(playerSelection)} vs ${capitalize(computerSelection)}.`);
            } else {
                playerScore++;
                currentRound++;
                updateScores();
                print(`Round won. ${capitalize(playerSelection)} vs ${capitalize(computerSelection)}.`);
            };
            if (currentRound > 5) {gameOver()};
    };

    function startGame() {
        selections.forEach(selection => selection.disabled = false);
        gameWindow.innerHTML = "";
        playerScore = 0;
        computerScore = 0;
        updateScores();
        currentRound = 1;

        print(`Game started.`);
    };

    function gameOver() {
        if (playerScore > computerScore) {
            print("You win! Press reset to play again.");
        } else if (playerScore === computerScore) {
            print("It's a tie. Press reset to play again.");
        } else {
            print("You lose. Press reset to play again.");
        };
        selections.forEach(selection => selection.disabled = true);
    };

    startGame();