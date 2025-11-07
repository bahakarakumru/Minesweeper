const blockSize = 50;

class Block{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.bombCountAroundTheBlock = 0;
    }
}

//i = 0: Custom, i = 1: Easy, i = 2: Medium, i = 3: Hard
function setDifficulty(i, bombCount, x, y){
    let difficultySetting = [];
    
    switch(i){
        case 0:
            difficultySetting.push(bombCount, x, y);
            break;
        case 1:
            difficultySetting.push(10, 10, 8);
            break;
        case 2:
            difficultySetting.push(40, 18, 14);
            break;
        case 3:
            difficultySetting.push(99, 24, 20);
            break;
    }

    return difficultySetting;
}

//addBlocks() creats a 2D blockList.
function addBlocks(){
    let blocks = [];

    for(let y = 0; y < height; y += blockSize){
        let row = [];

        for(let x = 0; x < width; x += blockSize)
            row.push(new Block(x, y));

        blocks.push(row);
    }

    return blocks;
}

//setup() runs after every other game.
function setup(){
    var difficulty = setDifficulty(1);
    
    //Creats a canvas according to the difficulty.
    createCanvas(difficulty[1]*blockSize, difficulty[2]*blockSize);
    
    var blockList = addBlocks();
}
   
function draw(){

}