class Difficulty{
    constructor(name, bombCount, width, height){
        this.name = name;
        this.bombCount = bombCount;
        this.width = width;
        this.height = height;
    }
}

var difficultyList = [new Difficulty("Easy", 10, 10, 8), new Difficulty("Medium", 40, 18, 14), new Difficulty("Hard", 99, 24, 20), new Difficulty("Custom", 0, 0, 0)];

var difficultyValue;

class Block{
    constructor(x, y){
        this.x = x;
        this.y = y;
        this.bombCountAroundTheBlock = 0;
    }
}

var blockList = [];

const blockSize = 50;

function setup(){
    difficultyValue = 0;

    //Creats a canvas according to the difficulty.
    createCanvas(difficultyList[difficultyValue].width * blockSize, difficultyList[difficultyValue].height * blockSize);

    //Adds blocks to the "blockList" as a 2D array.
    for(let y = 0; y < height; y += blockSize){
        var row = [];

        for(let x = 0; x < width; x += blockSize)
            row.push(new Block(x, y));

        blockList.push(row);
    }
}
   
function draw(){

}