const cells = document.querySelectorAll('.cell');
const display = document.getElementById('display');
const restartBtn = document.getElementById('restart');

const winConditions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

let options = ["","","","","","","","",""];
let currentPlayer = "X";
let running = false;

initializeGame();

function initializeGame(){
    cells.forEach(cell=>cell.addEventListener("click",cellClicked));
    restartBtn.addEventListener("click",restartGame);
    display.textContent = `Player ${currentPlayer}'s turn`; 
    running = true;
}
function cellClicked(){
    const cellIndex = this.getAttribute("cellIndex");

    if(options[cellIndex] != "" || !running){
        return;
    }
    updateCell(this,cellIndex);
    checkWinner();
}
function updateCell(tile,index){
    options[index] = currentPlayer;
    tile.textContent = currentPlayer;
    //changePlayer();
}
function changePlayer(){
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    display.textContent = `Player ${currentPlayer}'s turn`;
}
function checkWinner(){
    let won = false;

    for(let i = 0; i<winConditions.length;i++){
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]]; 

        if(cellA == "" || cellB == "" || cellC == ""){
            continue;
        }
        if(cellA == cellB && cellB == cellC){
            won = true;
            break;
        }
    }

    if(won){
        display.textContent = `${currentPlayer} wins!`;
        running = false;
    }else if(!options.includes("")){
        display.textContent = 'Draw!';
        running = false;
    }
    else{
        changePlayer();
    }
}
function restartGame(){
    currentPlayer = "X";
    options = ["","","","","","","","",""];
    display.textContent = `Player ${currentPlayer}'s turn`;
    cells.forEach(cell=>cell.textContent = "");
    running = true;
}