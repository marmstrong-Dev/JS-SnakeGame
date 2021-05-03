const gameBoard = document.getElementById('GameBoard');
const gameOverTxt = document.getElementById('GameOverTxt');
const ctx = gameBoard.getContext('2d');

class SnakePart {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let score = 0;
let speed = 7;

let tileCount = 20;
let tileSize = gameBoard.width / tileCount - 2;

let headX = 10;
let headY = 10;

let appleX = 5;
let appleY = 5;

let inputXVelocity = 0;
let inputYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

const snakeParts = [];
let tailLength = 2;

// Game Loop
function DrawGame() {
    xVelocity = inputXVelocity;
    yVelocity = inputYVelocity;

    ChangeSnakePosition();

    let result = IsGameOver();

    if(result)
    { return; }

    ClearScreen();
    CheckAppleCollision();
    DrawApple();
    DrawSnake();
    DrawScore();

    if(score > 5)
    { speed = 9; }
    if(score > 10)
    { speed = 11; }

    setTimeout(DrawGame, 1000/speed);
}

function ClearScreen() {
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, gameBoard.width, gameBoard.height);
}

// Draw Score In Top Right Corner
function DrawScore() {
    ctx.fillStyle = 'white';
    ctx.font = '10px Verdana';
    ctx.fillText('Score ' + score, gameBoard.width-50, 10);
}

function DrawSnake() {
    ctx.fillStyle = 'green';

    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];
        ctx.fillRect(part.x*tileCount, part.y*tileCount, tileSize, tileSize);
    }

    snakeParts.push(new SnakePart(headX, headY));

    while(snakeParts.length > tailLength) 
    { snakeParts.shift(); }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX*tileCount, headY*tileCount, tileSize, tileSize);
}

function DrawApple() {
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX*tileCount, appleY*tileCount, tileSize, tileSize);
}

function ChangeSnakePosition() {
    headX = headX + xVelocity;
    headY = headY + yVelocity;
}

function CheckAppleCollision() {
    if(appleX === headX && appleY === headY) {
        appleX = Math.floor(Math.random()*tileCount);
        appleY = Math.floor(Math.random()*tileCount);
        tailLength++;
        score++;
    }
}

// Method to End Game
function IsGameOver() {
    let gameOver = false;

    if(yVelocity === 0 && xVelocity === 0)
    { return false; }

    // Border Walls
    if(headX < 0)
    { gameOver = true; }
    else if(headX === tileCount)
    { gameOver = true; }
    else if(headY < 0)
    { gameOver = true; }
    else if(headY === tileCount)
    { gameOver = true; }

    for(let i = 0; i < snakeParts.length; i++) {
        let part = snakeParts[i];

        if(part.x === headX && part.y === headY) {
            gameOver = true;
            break;
        }
    }

    if(gameOver) {
        ctx.fillStyle = 'white';
        ctx.font = '50px Verdana';

        if(gameOver) {
            ctx.fillStyle = 'white';
            ctx.font = '50px Verdana';

            var gradient = ctx.createLinearGradient(0, 0, gameBoard.width, 0);

            gradient.addColorStop('0', 'magenta');
            gradient.addColorStop('0.5', 'blue');
            gradient.addColorStop('1.0', 'red');

            ctx.fillStyle = gradient;

            ctx.fillText('Game Over', gameBoard.width/6.5, gameBoard.height/2);
            gameOverTxt.innerHTML = 'SCORE: ' + score;
        }

        ctx.fillText('Game Over', gameBoard.width/6.5, gameBoard.height/2);
    }

    return gameOver;
}

// Event Listener for Key Presses
document.body.addEventListener('keydown', KeyDown);

function KeyDown(event) {
    // Up
    if(event.keyCode == 38) {
        if(inputYVelocity == 1)
        { return; }

        inputYVelocity = -1;
        inputXVelocity = 0;
    }

    // Down
    if(event.keyCode == 40) {
        if(inputYVelocity == -1) 
        { return; }

        inputYVelocity = 1;
        inputXVelocity = 0;
    }

    // Left
    if(event.keyCode == 37) {
        if(inputXVelocity == 1)
        { return; }

        inputYVelocity = 0;
        inputXVelocity = -1;
    }

    // Right
    if(event.keyCode == 39) {
        if(inputXVelocity == -1)
        { return; }

        inputYVelocity = 0;
        inputXVelocity = 1;
    }
}

DrawGame();
