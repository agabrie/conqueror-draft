let boardSize = 10;

let board;
class GameObject{
    constructor(pos){
        this.pos = pos;
    }
}
class Cell{
    constructor(coord, playerToken="[ ]"){
        this.coord = coord;
        this.token = playerToken;
        // console.log("new Cell created", coord.getIndex(), coord)
    }
}
class Board{
    constructor(size, starting_conditions = {}){
        this.size = size;
        this.starting_conditions = starting_conditions;
        this.arena = [];
        this.players = [];
        this.cells = []
        this.currentPlayerIndex = 0;
        this.totalTurns = 0;
    }
    generateArena = ()=>{
        for(let y = 0; y<this.size;y++){
            // let row = []
            for(let x = 0; x<this.size;x++){
                let cell =new Cell(new Coord(x, y))
                this.arena.push(cell)
                // row.push(new Cell(x, y));
            }
            // this.arena.push(row)
        }
    }
    currentPlayer(){
        return this.players[this.currentPlayerIndex];
    }
    nextPlayerTurn(){
        this.currentPlayerIndex++;
        if(this.currentPlayerIndex == this.players.length){
            this.totalTurns++;
            this.currentPlayerIndex = 0;
        }
        return this.currentPlayerIndex++;
    }
    printBoard =()=>{
        this.players.forEach(e=>e.printCharacterDetails())
        // let output = this.arena.map((e,index)=>{
            // return e.join('');
        // }).join('\n')
        let output = ""
        this.arena.forEach(cell=>{
            // row.forEach(col=>{
            output += `${cell.token}`
            let cellIndex = cell.coord.getIndex();
            // console.log(cellIndex, cellIndex%(boardSize))
            if(cell.coord.x == boardSize-1){
                output += `\n`;
            }
            // })
        })
        console.log(output)
    }
    placeToken = (token)=>{
        console.log("place token", token)
        let tokenIndex = (token.coord.getIndex());
        console.log(tokenIndex)
        let arenaCell = this.arena[tokenIndex]
        // console.log(this.arena)
        // arenaCell.coord = token.coord;
        arenaCell.token = `[${token.token}]`;
        // this.arena[(coord.y*10)+coord.x].token = token;
    }
    addPlayer = (player)=>{
        // let {x,y}= player.pos;

        // this.arena[y][x].token = `[${player.character}]`;
        this.players.push(player);
    }
}
class Player extends GameObject{
    constructor(name, character){
        super()
        this.name = name;
        this.points = 0;
        this.piece_conditions ={
            num_blocks:2,
            piece_dimensions:2
        } 
        this.tokens = []
        this.character = character;
    }
    createToken=(coord)=>{
        let cell = new Cell(coord, this.character);
        this.tokens.push(cell);
        return cell;
    }
    printCharacterDetails =()=>{
        console.log(`##############################\n${this.character} : ${this.name}\nNumber Of Tokens : {${this.tokens.length}}\n##############################`)
    }
}
class Upgrade extends GameObject{
    constructor(pos){
        super(pos)
    }
}
class Coord{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
    getIndex(){
        return this.y*boardSize + this.x;        
    }
}

function startGame(players, size=10){
    boardSize = size
    board = new Board(boardSize);
    board.generateArena();
    players.forEach(player=>{board.addPlayer(player)})
    return board;
}

// startGame();

