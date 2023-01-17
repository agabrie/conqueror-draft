// let defaultPlayers = [
//     {
//         name:"Alec", 
//         icon:"A",
//         color:"teal"
//     },
//     {
//         name:"Jeffry", 
//         icon:"J",
//         color:"purple"
//     }
// ];

let players = [];
let selectedIcon = null;
let selectedColor = null;
let playerName = "A";
let previewToken = $("#preview-token")
let iconSelection = [
    $("#icon-select-initial"),
    $("#icon-select-star"),
    $("#icon-select-heart"),
    $("#icon-select-spade"),
    $("#icon-select-diamond")
];
let colorSelection = [
    $("#color-select-red"),
    $("#color-select-green"),
    $("#color-select-blue"),
    $("#color-select-purple"),
    $("#color-select-yellow")
];
const configPlayerList = $("#config-players-list");
let playerInfo ={name:null,color:null,icon:null}
const inputPlayerName = $("#input-player-name");
const inputPlayerToken = $("#input-player-token");

$(document).ready(()=>{
    inputPlayerName.on("keyup",()=>{
        playerName = inputPlayerName.val()
        if(selectedIcon == "initial"){
            previewToken.text(getInitial());
        }
    
        playerInfo.name = playerName;
        validatePlayerInfo();
    })

    iconSelection.forEach((token)=>{
        token.on("click", selectIcon)
    })
    colorSelection.forEach((token)=>{
        token.on("click", selectColor)
    })

    btnAddPlayer.on("click",addPlayer)
    // btnAddPlayerDefaults.on("click",addPlayerFromDefaults)
    btnGenerateArena.on("click",initGame)
})


let startingPositions = [{x:1,y:1},{x:boardSize-1,y:boardSize-1},{x:boardSize-1,y:1},{x:1,y:boardSize-1}]
// function selectIcon(){
//     let icon = null;
//     if(selectedIcon == "token-select-initial"){
//         icon = playerName.charAt(0).toUpperCase()
//     }else{
//         switch(selectedId){
//             case ""
//         }
//         previewToken.text();
//     }
// }
function getInitial(){
    return playerName.charAt(0).toUpperCase()
}
function selectIcon(event){
    let selectedId = $(this).attr("id")
    // console.log(selectedIcon, selectedId);
    selectedIcon = null;
    if(selectedId == "icon-select-initial"){
        selectedIcon = "initial";

        previewToken.text(getInitial());
    }else{
        switch(selectedId){
            case "icon-select-star":{
                selectedIcon = "⋆";
                break;
            };
            case "icon-select-heart":{
                selectedIcon = "❤";
                break;
            };
            case "icon-select-spade":{
                selectedIcon = "♠";
                break;
            };
            case "icon-select-diamond":{
                selectedIcon = "◆";
                break;
            };
        }
        previewToken.text(selectedIcon);
    }
    playerInfo.icon = selectedIcon;
    validatePlayerInfo();
}
function selectColor(event){
    let selectedId = $(this).attr("id")
    // console.log(selectedColor, selectedId);
    selectedColor = null
    switch(selectedId){
        case "color-select-red":{
            selectedColor = "red";
            break;
        };
        case "color-select-green":{
            selectedColor = "green";
            break;
        };
        case "color-select-blue":{
            selectedColor = "blue";
            break;
        };
        case "color-select-purple":{
            selectedColor = "purple";
            break;
        };
        case "color-select-yellow":{
            selectedColor = "yellow";
            break;
        };
    }
    playerInfo.color = selectedColor;
    validatePlayerInfo();
    previewToken.attr("class", `token token-${selectedColor}`)
    // selectInitial();
}



function addPlayer(){
        // inputPlayerName = $("#input-player-name")
        // inputPlayerToken = $("#input-player-token")
        // let playerName = inputPlayerName.val()
        // let playerToken = inputPlayerToken.val()
        let playerIcon = selectedIcon;
        if(playerIcon=="initial"){
            playerIcon = getInitial()
        }
        let playerColor=selectedColor;
        playerInfo.icon = playerIcon;
        playerInfo.name = playerName;
        playerInfo.color = playerColor;
        
        // {
            // color:selectedColor, 
            // icon:icon
        // }
        // console.log(playerToken);
        createPlayer(playerInfo);
}

// function addPlayerFromDefaults(){
//     defaultPlayers.forEach(p=>{
//         createPlayer(p.name, p.icon, p.color)
//     })
// }
function createPlayer({name, icon, color} ){
    let playerName = name
    let playerIcon = icon
    let playerColor = color
    let player = new Player(playerName, playerIcon, playerColor)
    player.printCharacterDetails();
    players.push(player);
    btnAddPlayer.prop("disabled", true);
    validateBoard()
    renderConfigPlayerList()
}


function renderConfigPlayerList(){
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
    validateBoard()
}
function validateBoard(){
    if(players.length<1){
        btnGenerateArena.prop("disabled", true)
    }else{
        btnGenerateArena.prop("disabled", false)
    }
}
function validatePlayerInfo(){
    if(playerInfo.icon && playerInfo.name.length >= 3 && playerInfo.color){
        // console.log("valid")
        btnAddPlayer.prop("disabled", false)

    }
    else{
        // console.log("invalid")
        btnAddPlayer.prop("disabled", true)
    }
}


function renderPlayerInfo(){
    let cpName = $("#current-player-name");
    let cpToken = $("#current-player-token");
    let cpPoints = $("#current-player-points");
    let cpPieces = $("#current-player-pieces");
    let cpTurns = $("#current-player-turns");

    currentPlayer = board.currentPlayer();
    let cp = currentPlayer;
    cpName.text(cp.name);
    cpPoints.text(cp.points);
    cpPieces.text(`${currentPlayerPieces}/${cp.max_pieces}`);
    cpTurns.text(cp.name);
}
