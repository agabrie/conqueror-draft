let boardSize = 20;

let board;
class GameObject{
    constructor(pos){
        this.pos = pos;
    }
}
class Cell{
    constructor(coord, token=null){
        this.coord = coord;
        this.token = token;
        // console.log("new Cell created", coord.getIndex(), coord)
    }
}
class Board{
    constructor(size, starting_conditions = {}){
        this.size = size;
        this.starting_conditions = starting_conditions;
        this.arena = [];
        this.players = [];
        this.cells = [];
        this.cellsToRender=[]
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
        console.log("player to player now",this.currentPlayerIndex, this.currentPlayer())
        if(this.currentPlayerIndex == this.players.length){
            this.totalTurns++;
            this.currentPlayerIndex = 0;
        }
        // return th;
    }
    printBoard =()=>{
        this.players.forEach(e=>e.printCharacterDetails())
        // let output = this.arena.map((e,index)=>{
            // return e.join('');
        // }).join('\n')
        let output = ""
        this.arena.forEach(cell=>{
            // row.forEach(col=>{
                if(cell.token){
                    output += `[${cell.token.icon}]`
                }else{
                    output += `[ ]`
                }
            let cellIndex = cell.coord.getIndex();
            // console.log(cellIndex, cellIndex%(boardSize))
            if(cell.coord.x == boardSize-1){
                output += `\n`;
            }
            // })
        })
        console.log(output)
    }
    clearRenderedCells =()=>{
        this.cellsToRender = []
    }
    placeToken = (token)=>{
        console.log("place token", token)
        let tokenIndex = (token.coord.getIndex());
        console.log(tokenIndex)
        let arenaCell = this.arena[tokenIndex]
        // console.log(this.arena)
        // arenaCell.coord = token.coord;
        arenaCell.token = token.token;
        console.log(arenaCell)
        this.cellsToRender.push(arenaCell);
        // arenaCell.token = `[${token.token.icon}]`;
        // this.arena[(coord.y*10)+coord.x].token = token;
    }
    addPlayer = (player)=>{
        // let {x,y}= player.pos;

        // this.arena[y][x].token = `[${player.character}]`;
        this.players.push(player);
    }
}
class Player{
    constructor(name, icon, color){
        this.name = name;
        this.points = 0;
        this.piece_conditions ={
            num_blocks:2,
            piece_dimensions:2
        }
        this.max_pieces = 1;
        this.tokens = []
        this.token = new Token(icon, color);

        this.turn_number = 0;
    }
    createToken=(coord)=>{
        let cell = new Cell(coord, this.token);
        this.tokens.push(cell);
        return cell;
    }
    printCharacterDetails =()=>{
        console.log(this)
        console.log(`##############################\n${this.token.color} ${this.token.icon} : ${this.name}\nNumber Of Tokens : {${this.tokens.length}}\n##############################`)
    }
}
class Upgrade extends GameObject{
    constructor(pos){
        super(pos)
    }
}
class Token{
    constructor(icon, color){
        this.icon = icon;
        this.color = color;
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

