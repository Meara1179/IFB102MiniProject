var playerAction = { actionType: "", actionRoll: 0 };
var playerName = "Player";
var playerMaxHP = 150;
var playerCurrentHP = 150;
var playerMaxMP = 150;
var playerCurrentMP = 150;
var playerHPText = document.getElementById("playerHPText");
var playerHPBar = document.getElementById("playerHP");
var playerMPText = document.getElementById("playerMPText");
var playerMPBar = document.getElementById("playerMP");

var aiAction = { actionType: "", actionRoll: 0 };
var aiName = "Enemy";
var aiMaxHP = 100;
var aiCurrentHP = 100;
var aiHPText = document.getElementById("aiHPText");
var aiHPBar = document.getElementById("aiHP");

var clashResult;
var turnCount = 1;

var battleResultsElement = document.getElementById("battleResults");
var attackButton = document.getElementById("attack");

function ClashCalculator()
{
    var clashWinner;

    if (playerAction.actionRoll == aiAction.actionRoll) {
        clashWinner = "Draw";
    }
    else if (playerAction.actionRoll > aiAction.actionRoll) {
        clashWinner = playerName;
    }
    else if (playerAction.actionRoll < aiAction.actionRoll) {
        clashWinner = aiName;
    }

    if (clashWinner == playerName) {
        if (aiAction.actionType == "Guard") {
            var guardedDamage = playerAction.actionRoll - aiAction.actionRoll;
            clashResult = `${playerName} won! ${aiName} guarded and took ${guardedDamage} damage!`;
            aiCurrentHP -= guardedDamage;
        }
        else {
            clashResult = `${playerName} won! ${aiName} took ${playerAction.actionRoll} damage!`;
            aiCurrentHP -= playerAction.actionRoll;
        }
    }
    else if (clashWinner == aiName) {
        if (playerAction.actionType == "Guard") {
            var guardedDamage = aiAction.actionRoll - playerAction.actionRoll;
            clashResult = `${aiAction} won! ${playerName} guarded and took ${guardedDamage} damage!`;
            playerCurrentHP -= guardedDamage;
        }
        else {
            clashResult = `${aiName} won! ${playerName} took ${aiAction.actionRoll} damage!`;
            playerCurrentHP -= aiAction.actionRoll;
        }
    }
    else if (clashWinner == "Draw") {
        clashResult = "The clash resulted in a draw.";
    }

    addResultText("Turn: " + turnCount + "<br>" + "Player HP: " + playerCurrentHP + "<br>" + "Player Roll: " + playerAction.actionRoll + "<br>" + "AI HP: " + aiCurrentHP + "<br>" +  "AI Roll: " + aiAction.actionRoll + "<br>" + clashResult + "<br>");
    turnCount++;
    endOfTurn();
}

function addResultText(resultText) {
    var battleResultText = battleResultsElement.innerHTML;
    battleResultsElement.innerHTML = resultText + "<br>";
    battleResultsElement.innerHTML += battleResultText;
}

function playerAttack() {
    playerAction.actionType = "Attack";
    playerAction.actionRoll = Math.floor(Math.random() * (12 - 8 + 1) + 8)

    aiAttack();
    ClashCalculator();
}

function aiAttack() {
    aiAction.actionType = "Attack";
    aiAction.actionRoll = 10
}

function endOfTurn() {
    if (playerCurrentHP <= 0) {
        playerCurrentHP = 0;
        playerHPBar.style.width = "0%";
        attackButton.disabled = true;
        addResultText(`${playerName} lost... Game Over`)
    }
    else if (aiCurrentHP <= 0) {
        aiCurrentHP = 0;
        aiHPBar.style.width = "0%";
        attackButton.disabled = true;
        addResultText(`${aiName} was defeated! You win!!!`)
    }

    playerHPText.innerHTML = `HP: ${playerCurrentHP} / ${playerMaxHP}`
    playerHPBar.style.width = `${(playerCurrentHP / playerMaxHP) * 100}%`;
    playerMPText.innerHTML = `MP: ${playerCurrentMP} / ${playerMaxMP}`
    playerMPBar.style.width = `${(playerCurrentMP / playerMaxMP) * 100}%`;

    aiHPText.innerHTML = `HP: ${aiCurrentHP} / ${aiMaxHP}`
    aiHPBar.style.width = `${(aiCurrentHP / aiMaxHP) * 100}%`;
}