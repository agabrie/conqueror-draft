const boardElement = $("#board")
const btnGenerateArena = $("#btn-generate-arena")
const btnAddPlayer = $("#btn-add-player")
const btnAddPlayerDefaults = $("#btn-add-player-defaults")
const sectionGameInfo=$("#section-game-info")
const sectionGameConfig=$("#section-game-config")
const btnReset=$("#btn-reset")
const btnClosePrompt = $("#btn-close-prompt");
const sectionPrompt = $("#prompt-section");
const promptBody = $("#prompt-body");
let cells = [];
let updatedCells = [];
let currentPlayerIndex = 0;
let currentPlayer = null;

let currentPlayerPieces = 0;

$(document).ready(()=>{
    boardElement.hide();
    sectionGameInfo.hide();
    btnReset.on("click",resetGame)
    sectionPrompt.hide();
    btnClosePrompt.on("click", closePrompt)
})
function initGame(){
    startGame(players, boardSize)
    
    players.forEach((player,index)=>{
        let {x, y} = startingPositions[index]
        placeToken(x, y, player)
    })
    generateBoard();
    renderBoard();
    resetCurrentPieces();
    renderPlayerInfo()

    // board.printBoard();
}
function placeToken(x, y, player=board.currentPlayer()){
    board.placeToken(player.createToken(new Coord(x, y)));
}
function generateBoard(){
    cells = [];
    board.arena.forEach(arenaCell => {
        let cellElement = $(`<td id="cell_${arenaCell.coord.x}_${arenaCell.coord.y}" class="cell"></td>`)
        cells.push({json:arenaCell, html:cellElement});
    });
    boardElement.empty();
    for (let row = 0; row < board.size; row++) {
        // let board_rows = []
        let board_row = $(`<tr class="row"></tr>`);
        for (let col = 0; col < board.size; col++) {
            let cellElement = getCellFromCoords(col,row);
            cellElement.html.on("click", ()=>{updateCell(cellElement)})
            board_row.append(cellElement.html)
            // board_rows.push(cellElement.html)
        }
        boardElement.append(board_row)
    }
    showBoard();
}
function getCellFromCoords(x, y){
    return cells[y*board.size+x];
}
function updateCell(cell){
    console.log(cell)
    let {x,y} = cell.json.coord;
    placeToken(x,y)
    currentPlayerPieces--;
    renderPlayerInfo();
    renderBoard();
    if(currentPlayerPieces<1){
        board.nextPlayerTurn();
        currentPlayer = board.currentPlayer()
        displayPrompt(`${currentPlayer.name}'s Turn`,1000);
        resetCurrentPieces();
        renderPlayerInfo();
    }
    // updatedCells.push(cell);
    // if(board.currentPlayer() == players[0]){
        // cell.html.addClass("p0")
        // cell.html.addClass("selected-cell")
    // }
}
function resetCurrentPieces(){
    currentPlayerPieces = board.currentPlayer().max_pieces;
}
function createToken(token){
    console.log("create token", token)
    let jToken = $(`<div  class="token"></div>`)
    jToken.attr('class', `token token-${token.color}`)
    jToken.text(token.icon)
    jToken.hide();
    return jToken;
}
function renderBoard(){
    console.log(board.cellsToRender)
    board.cellsToRender.forEach(cell=>{
        let cellToUpdate = cells[cell.coord.getIndex()]
        console.log(cellToUpdate)
        let jToken = createToken(cell.token);
        cellToUpdate.html.empty()
        cellToUpdate.html.append(jToken)
        jToken.show(200);
    })
    board.clearRenderedCells();
}

function showBoard(){
    boardElement.show(1000)
    sectionGameInfo.show(1000);
    // console.log(gameInitSection)
    sectionGameConfig.hide(1000);
}
function hideBoard(){
    boardElement.hide(1000);
    sectionGameInfo.hide(1000);
    sectionGameConfig.show(1000);

}
function resetGame(){
    cells = [];
    updatedCells = [];
    currentPlayerIndex = 0;

    currentPlayerPieces = 0;
    playerInfo = {name:null,color:null,icon:null}
    boardSize = 20;
    configPlayerList.empty()
    boardElement.empty()
    board=null;
    hideBoard()

}
function closePrompt(){
    sectionPrompt.hide(100);
}

function displayPrompt(text, duration){
    sectionPrompt.show(0,()=>{
        promptBody.text(text)
        setTimeout(()=>{
            closePrompt()
        },duration)
    })
}