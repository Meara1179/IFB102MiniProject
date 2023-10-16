var playerAction = { actionType: "", actionRoll: 0 };
var playerName = "Player";
var playerMaxHP = 150;
var playerCurrentHP = 150;
var playerMaxMP = 150;
var playerCurrentMP = 150;
var playerNameText = document.getElementById("playerNameText");
var playerHPText = document.getElementById("playerHPText");
var playerHPBar = document.getElementById("playerHP");
var playerMPText = document.getElementById("playerMPText");
var playerMPBar = document.getElementById("playerMP");

var aiAction = { actionType: "", actionRoll: 0 };
var aiName = "Enemy";
var aiMaxHP = 150;
var aiCurrentHP = 150;
var aiNameText = document.getElementById("aiNameText");
var aiHPText = document.getElementById("aiHPText");
var aiHPBar = document.getElementById("aiHP");

var clashResult;
var turnCount = 1;
var fightCount = 0;
var fightStatus = 0;

var battleResultsElement = document.getElementById("battleResults");
var attackButton = document.getElementById("attack");
var specialAttackButton = document.getElementById("specialAttack");

function startOfGame() {
    playerName = sessionStorage.getItem("playerName");
    playerNameText.innerHTML = `Name: ${playerName}`;
    playerCurrentHP = playerMaxHP;
    playerCurrentMP = playerMaxMP;
    fightCount = 0;

    startOfFight();
}

function startOfFight() {
    fightCount++;
    fightStatus = 0;
    turnCount = 1;
    battleResultsElement.innerHTML = "";
    attackButton.innerHTML = "Attack";
    playerCurrentMP = playerMaxMP;

    enemyNamePicker();
    aiNameText.innerHTML = `Name: ${aiName}`;
    aiCurrentHP = aiMaxHP;
    specialAttackButton.disabled = false;

    updateStatus();
}

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
            var guardedDamage = math.floor(playerAction.actionRoll - aiAction.actionRoll);
            clashResult = `${playerName} won! ${aiName} guarded and took ${guardedDamage} damage!`;
            aiCurrentHP -= guardedDamage;

            if (playerAction.actionType == "Special Attack") {
                playerCurrentHP += guardedDamage;
            }
        }
        else {
            clashResult = `${playerName} won! ${aiName} took ${playerAction.actionRoll} damage!`;
            aiCurrentHP -= playerAction.actionRoll;

            if (playerAction.actionType == "Special Attack") {
                playerCurrentHP += playerAction.actionRoll;
            }
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

    addResultText(`Turn: ${turnCount} <br>${playerName}'s Roll: ${playerAction.actionRoll} <br>${aiName}'s Roll: ${aiAction.actionRoll} <br>${clashResult} <br>`);
    turnCount++;
    endOfTurn();
}

function addResultText(resultText) {
    var battleResultText = battleResultsElement.innerHTML;
    battleResultsElement.innerHTML = resultText + "<br>";
    battleResultsElement.innerHTML += battleResultText;
}

function playerAttack() {
    if (fightStatus == 0) {
        playerAction.actionType = "Attack";
        playerAction.actionRoll = Math.floor(Math.random() * (12 - 8 + 1) + 8)

        aiAttack();
        ClashCalculator();
    }
    else if (fightStatus == 1) {
        startOfFight();
    }
    else if (fightStatus == 2) {
        startOfGame();
    }
}

function playerSpecialAttack() {
    if (playerCurrentMP >= 25) {
        playerCurrentMP -= 25;
        playerAction.actionType = "Special Attack";
        playerAction.actionRoll = Math.floor(Math.random() * (20 - 15 + 1) + 15)

        aiAttack();
        ClashCalculator();
    }
}

function aiAttack() {
    aiAction.actionType = "Attack";
    aiAction.actionRoll = 10
}

function endOfTurn() {
    if (playerCurrentHP > playerMaxHP) {
        playerCurrentHP = playerMaxHP;
    }
    if (playerCurrentMP < 25) {
        specialAttackButton.disabled = true;
    }
    else if (playerCurrentMP >= 25) {
        specialAttackButton.disabled = false;
    }

    if (playerCurrentHP <= 0) {
        playerCurrentHP = 0;
        attackButton.innerHTML = "Retry";
        fightStatus = 2;
        addResultText(`${playerName} lost... Game Over <br> You beat ${fightCount - 1} enemies.`)
        specialAttackButton.disabled = true;
    }
    else if (aiCurrentHP <= 0) {
        aiCurrentHP = 0;
        attackButton.innerHTML = "Next Fight";
        fightStatus = 1;
        addResultText(`${aiName} was defeated! You win!!! <br> You've beaten ${fightCount} enemies.`)
        specialAttackButton.disabled = true;
    }
    updateStatus();
}

function updateStatus() {
    playerHPText.innerHTML = `HP: ${playerCurrentHP} / ${playerMaxHP}`
    playerHPBar.style.width = `${(playerCurrentHP / playerMaxHP) * 100}%`;
    playerMPText.innerHTML = `MP: ${playerCurrentMP} / ${playerMaxMP}`
    playerMPBar.style.width = `${(playerCurrentMP / playerMaxMP) * 100}%`;

    aiHPText.innerHTML = `HP: ${aiCurrentHP} / ${aiMaxHP}`
    aiHPBar.style.width = `${(aiCurrentHP / aiMaxHP) * 100}%`;
}

function enemyNamePicker() {
    var enemyNameNumber = Math.floor(Math.random() * (7 - 1 + 1) + 1)

    switch (enemyNameNumber) {
        case 1:
            aiName = "Grimetooth";
            break;
        case 2:
            aiName = "Foulpod";
            break;
        case 3:
            aiName = "Netherpaw";
            break;
        case 4:
            aiName = "Flamebeast";
            break;
        case 5:
            aiName = "Nethermorph";
            break;
        case 6:
            aiName = "Plaguecreep";
            break;
        case 7:
            aiName = "Sarah"
            break;
    }
}

window.onload = startOfGame();