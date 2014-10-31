/// <reference path="jquery.js" />

//default variables to control various class objects
var playerMoney = 1000;
var winnings = 0;
var jackpot = 5000;
var turn = 0;
var playerBet = 0;
var winNumber = 0;
var lossNumber = 0;
var spinResult;
var fruits = "";
var winRatio = 0;
var grapes = 0;
var bananas = 0;
var oranges = 0;
var cherries = 0;
var bars = 0;
var bells = 0;
var sevens = 0;
var blanks = 0;

/* Utility function to show Player Stats */
function showPlayerStats()
{
    //calculate and display player statistics
    winRatio = winNumber / turn;
    $("#jack2>center>p").text("Jackpot: " + jackpot);
    $("#play2>center>p").text("Credits: " + playerMoney);
    $("#playerTurn").text("Turn: " + turn);
    $("#playerWins").text("Wins: " + winNumber);
    $("#playerLosses").text("Losses: " + lossNumber);
    $("#playerWinRatio").text("Win Ratio: " + (winRatio * 100).toFixed(2) + "%");
}

/* Utility function to reset all fruit tallies */
function resetFruitTally() {
    grapes = 0;
    bananas = 0;
    oranges = 0;
    cherries = 0;
    bars = 0;
    bells = 0;
    sevens = 0;
    blanks = 0;
}

/* Utility function to reset the player stats */
function resetAll() {
    playerMoney = 1000;
    winnings = 0;
    jackpot = 5000;
    turn = 0;
    playerBet = 0;
    winNumber = 0;
    lossNumber = 0;
    winRatio = 0;
}


/* Check to see if the player won the jackpot */
function checkJackPot() {
    /* compare two random values */
    var jackPotTry = Math.floor(Math.random() * 51 + 1);
    var jackPotWin = Math.floor(Math.random() * 51 + 1);
    if (jackPotTry == jackPotWin) {
        alert("You Won the $" + jackpot + " Jackpot!!");
        playerMoney += jackpot;
        jackpot = 1000;
    }
}

/* Utility function to show a win message and increase player money */
function showWinMessage() {
    playerMoney += winnings;
    //display you won in win or lose div
    $("div#winOrLose>center>p").text("You Won: $" + winnings);
    resetFruitTally();
    checkJackPot();
}

/* Utility function to show a loss message and reduce player money */
function showLossMessage() {
    playerMoney -= playerBet;
    //display you lost in win or lose div
    $("div#winOrLose>center>p").text("You Lost!");
    resetFruitTally();
}

/* Utility function to check if a value falls within a range of bounds */
function checkRange(value, lowerBounds, upperBounds) {
    if (value >= lowerBounds && value <= upperBounds)
    {
        return value;
    }
    else {
        return !value;
    }
}

/* When this function is called it determines the betLine results.
e.g. Bar - Orange - Banana */
function Reels() {
    var betLine = [" ", " ", " "];
    var outCome = [0, 0, 0];

    for (var spin = 0; spin < 3; spin++) {
        outCome[spin] = Math.floor((Math.random() * 65) + 1);
        switch (outCome[spin]) {
            case checkRange(outCome[spin], 1, 27):  // 41.5% probability
                betLine[spin] = "blank.png";
                blanks++;
                break;
            case checkRange(outCome[spin], 28, 37): // 15.4% probability
                betLine[spin] = "grapes.png";
                grapes++;
                break;
            case checkRange(outCome[spin], 38, 46): // 13.8% probability
                betLine[spin] = "banana.png";
                bananas++;
                break;
            case checkRange(outCome[spin], 47, 54): // 12.3% probability
                betLine[spin] = "orange.png";
                oranges++;
                break;
            case checkRange(outCome[spin], 55, 59): //  7.7% probability
                betLine[spin] = "cherries.png";
                cherries++;
                break;
            case checkRange(outCome[spin], 60, 62): //  4.6% probability
                betLine[spin] = "bar.png";
                bars++;
                break;
            case checkRange(outCome[spin], 63, 64): //  3.1% probability
                betLine[spin] = "bell.png";
                bells++;
                break;
            case checkRange(outCome[spin], 65, 65): //  1.5% probability
                betLine[spin] = "seven.png";
                sevens++;
                break;
        }
    }
    return betLine;
}

/* This function calculates the player's winnings, if any */
function determineWinnings()
{
    if (blanks == 0)
    {
        if (grapes == 3) {
            winnings = playerBet * 10;
        }
        else if(bananas == 3) {
            winnings = playerBet * 20;
        }
        else if (oranges == 3) {
            winnings = playerBet * 30;
        }
        else if (cherries == 3) {
            winnings = playerBet * 40;
        }
        else if (bars == 3) {
            winnings = playerBet * 50;
        }
        else if (bells == 3) {
            winnings = playerBet * 75;
        }
        else if (sevens == 3) {
            winnings = playerBet * 100;
        }
        else if (grapes == 2) {
            winnings = playerBet * 2;
        }
        else if (bananas == 2) {
            winnings = playerBet * 2;
        }
        else if (oranges == 2) {
            winnings = playerBet * 3;
        }
        else if (cherries == 2) {
            winnings = playerBet * 4;
        }
        else if (bars == 2) {
            winnings = playerBet * 5;
        }
        else if (bells == 2) {
            winnings = playerBet * 10;
        }
        else if (sevens == 2) {
            winnings = playerBet * 20;
        }
        else if (sevens == 1) {
            winnings = playerBet * 5;
        }
        else {
            winnings = playerBet * 1;
        }
        winNumber++;
        showWinMessage();
    }
    else
    {
        lossNumber++;
        showLossMessage();
    }
    
}

//This function sets player bet amount to $10 and updates label
$("#bet10Button").click(function () {

    playerBet = 10;
    $("div#betamount>center>p").text("Bet Amount: $" + playerBet);

});

//This function sets player bet amount to maximum amount of credits and updates label
$("#maxbetButton").click(function () {

    playerBet = playerMoney;
    $("div#betamount>center>p").text("Bet Amount: $" + playerBet);

});

/* When the player clicks the spin button the game kicks off */
$("#spinButton").click(function () {
    //playerBet = $("div#betEntry>input").val();

    if (playerMoney == 0)
    {
        //ask user if theyd like a reset
        if (confirm("You ran out of Money! \nDo you want to play again?")) {
            resetAll();
            $("div#betamount>center>p").text("Bet Amount: $" + playerBet);
            document.getElementById("spinButton").style.background = "url('img/button.png')"; //grey out spin button
            document.getElementById("spinButton").disabled = false; //disable it
            showPlayerStats();
        }
        else {
            //enable the button and reset graphics
            document.getElementById("spinButton").style.background = "url('img/button2.png')";
            document.getElementById("spinButton").disabled = true;
            document.getElementById("spinButton").background - color == black;
        }
    }
    else if (playerBet == 0)
    {
        //alert player they have no bet placed
        alert("Bets must be greater than 0!")
    }
    else if (playerBet > playerMoney) {
        //alert player they are placing a bet higherr than bet amount
        alert("You don't have enough Money to place that bet.");
        document.getElementById("button").disabled = true;
    }
    else if (playerBet < 0) {
        alert("All bets must be a positive $ amount.");
    }
    else if (playerBet <= playerMoney) {
        spinResult = Reels();
        //set image sources to results from the spinResult array.
        $("#reel1").attr("src", "img/" + spinResult[0]);
        $("#reel2").attr("src", "img/" + spinResult[1]);
        $("#reel3").attr("src", "img/" + spinResult[2]);
        determineWinnings();
        turn++;
        showPlayerStats();
    }
    else {
        alert("Please enter a valid bet amount");
    }
    
}
);

//this function resets all variables within the program and displays stats
$("#reset").click(function () {
    resetAll();
    showPlayerStats();
    document.getElementById("spinButton").style.background = "url('img/button.png')";
    document.getElementById("spinButton").disabled = false;
    $("div#betamount>center>p").text("Bet Amount: $" + playerBet);

});

//this function redirects the player to "quit" the game
$("#quit").click(function () {

    window.location.replace("http://webdesign4.georgianc.on.ca/~200263939/comp2068/Assignment1/Portfolio/index");

});
