const tiles = Array.from(document.querySelectorAll('.tile'));
const playerDisplay = document.querySelector('.display-player');
const restartButton = document.querySelector('#restart');
const result = document.querySelector('.result');

let board = ['','','','','','','','',''];
let currentPlayer = 'X';
let isGameActive = true;

const playerXwon = 'Player X won!';
const playerOwon = 'Player O won!';

const winning = [
    [0,1,2],
    [2,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

const Result = (type)=>{
    switch(type){
        case playerOwon:
            result.innerHTML = 'Player <span class="player0">O</span> Won';
            break;
        case playerXwon:
            result.innerHTML = 'Player <span class="playerX">X</span> Won';
            break;
        case TIE:
            result.innerText = 'Tie';

    }
}

const changePlayer = () => {
    playerDisplay.classList.remove(`player${currentPlayer}`);
    currentPlayer = currentPlayer === 'X'?'O':'X';
    playerDisplay.innerText = currentPlayer;
    playerDisplay.classList.add(`player${currentPlayer}`);
}

const userAction = (tile,index)=>{
    if(isValidAction(tile) && isGameActive){
        tile.innerText = currentPlayer;
        tile.classList.add(`player${currentPlayer}`);
        updateBoard(index);
        handleResult();
        changePlayer();
    }
}

tiles.forEach((tile,index)=>{
    tile.addEventListener('click',()=>userAction(tile,index));
});