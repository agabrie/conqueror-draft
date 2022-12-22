const boardElement = $("#board")
const btnGenerateArena = $("#generate-arena-btn")
const btnAddPlayer = $("#add-player-btn")



let players = [];
let cells = [];
let updatedCells = [];
let currentPlayerIndex = 0;
btnAddPlayer.on("click",()=>{
    const inputPlayerName = $("#input-player-name")
    const inputPlayerToken = $("#input-player-token")
    let playerName = inputPlayerName.val()
    let playerToken = inputPlayerToken.val()
    let player = new Player(playerName, playerToken)
    player.printCharacterDetails();
    players.push(player);
    renderConfigPlayerList()
})

btnGenerateArena.on("click",()=>{
    startGame(players, 20)
    generateBoard();
})

function generateBoard(){
    board.arena.forEach(arenaCell => {
        let cellElement = $(`<div id="cell_${arenaCell.coord.x}_${arenaCell.coord.y}" class="cell"></div>`)
        cells.push({json:arenaCell, html:cellElement});
    });
    
    for (let row = 0; row < board.size; row++) {
        // let board_rows = []
        let board_row = $(`<div class="row"></div>`);
        for (let col = 0; col < board.size; col++) {
            let cellElement = getCellFromCoords(col,row);
            cellElement.html.on("click", ()=>{updateCell(cellElement)})
            board_row.append(cellElement.html)
            // board_rows.push(cellElement.html)
        }
        boardElement.append(board_row)
    }
}
function getCellFromCoords(x, y){
    return cells[y*board.size+x];
}
function updateCell(cell){
    updatedCells.push(cell);
    if(board.currentPlayer() == players[0]){
        cell.html.addClass("p0")
        cell.html.addClass("selected-cell")
    }
}

function renderConfigPlayerList(){
    const configPlayerList = $("#config-players-list");
    configPlayerList.empty();
    players.forEach((player, index)=>{
        let playerLi = $(`<li>${player.name}</li>`)
        let removeplayerBtn =$(`<button>Remove</button>`)
        removeplayerBtn.on("click", ()=>{removePlayer(index)})
        playerLi.append(removeplayerBtn);
        configPlayerList.append(playerLi)
    })
}

function removePlayer(index){
    players.splice(index,1)
    renderConfigPlayerList();
}