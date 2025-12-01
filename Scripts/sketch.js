const blockSize = 50;
var flag;
var mine;
var difficulty;
var blockList;

function preload(){
    flag = loadImage("/Assets/Flag.png");
    mine = loadImage("/Assets/Mine.png");
}

//i === 0: Custom, i === 1: Easy, i === 2: Medium, i === 3: Hard
function setDifficulty(i, mineCount, width, height){
    switch(i){
        case 0:
            if(width >= 3 && height >= 3)
                if(mineCount < (width * height))
                    break;
                    
                else{
                    console.log("Mine count needs to be lower than", width * height + "!");
                    return 0;
                }
            
            else{
                console.log("Width and height can't be lower than 3!");
                return 0;
            }
        
        case 1: mineCount = 10, width = 10, height = 8; break;
        
        case 2: mineCount = 40, width = 18, height = 14; break;
        
        case 3: mineCount = 99, width = 24, height = 20; break;  
    }

    difficulty = {mineCount, width, height};
}

function Block(x, y){
    this.x = x;
    this.y = y;
    //If minesAroundTheBlock = -1 this block is the mine!
    this.minesAroundTheBlock = 0;
    this.isRevealed = true;
    this.isFlaged = false;
}

Block.prototype.draw = function(iy, ix){
    if(this.isRevealed){
        if((ix % 2 === 0 && iy % 2 === 0) || (ix % 2 === 1 && iy % 2 === 1))
            fill("#D4A276");
        
        else
            fill("#E7BC91");
    }

    else{
        if((ix % 2 === 0 && iy % 2 === 0) || (ix % 2 === 1 && iy % 2 === 1))
            fill("#603808");
        
        else
            fill("#6F4518");
    }

    square(this.x, this.y, blockSize);

    switch(this.minesAroundTheBlock){
        case 1: fill("#0100fe"); break;
        case 2: fill("#017e00"); break;
        case 3: fill("#fe0000"); break;
        case 4: fill("#010080"); break;
        case 5: fill("#810102"); break;
        case 6: fill("#00807f"); break;
        case 7: fill("#000000"); break;
        case 8: fill("#808080"); break;
    }

    textFont("Consolas", blockSize - blockSize / 4);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    
    if((this.minesAroundTheBlock !== -1 || 0) && this.isRevealed)
        text(this.minesAroundTheBlock, this.x, this.y, blockSize, blockSize)

    if(this.minesAroundTheBlock === -1 && this.isRevealed)
        image(mine, this.x, this.y);
    
    if(this.isFlaged && !this.isRevealed)
        image(flag, this.x, this.y)
}

function generateBlocks(){
    blockList = [];

    //Creates a 2D array.
    for(let y = 0; y < height; y += blockSize){
        let row = [];

        for(let x = 0; x < width; x += blockSize)
            row.push(new Block(x, y));

        blockList.push(row);
    }

    //Places mines.
    for(let mines = difficulty.mineCount; mines > 0;){
        let y = floor(random(0, blockList.length));
        let x = floor(random(0, blockList[0].length));

        if(blockList[y][x].minesAroundTheBlock === 0){
            blockList[y][x].minesAroundTheBlock = -1;
            mines--;
        }
    }

    //Calculates mines around the blocks.
    for(let y = 0; y < blockList.length; y++)
        for(let x = 0; x < blockList[0].length; x++)
            if(blockList[y][x].minesAroundTheBlock === -1)
                for(let b = y - 1; b <= y + 1; b++)
                    for(let a = x - 1; a <= x + 1; a++)
                        if(-1 < b && b < blockList.length && -1 < a && a < blockList[0].length && blockList[b][a].minesAroundTheBlock !== -1)
                            blockList[b][a].minesAroundTheBlock = blockList[b][a].minesAroundTheBlock + 1;
}

function setup(){
    flag.resize(blockSize, blockSize);
    mine.resize(blockSize, blockSize);

    setDifficulty(1);
    
    createCanvas(difficulty.width*blockSize, difficulty.height*blockSize);
    
    generateBlocks();
}

//Codes in draw() are for testing!
function draw(){
    noStroke();

    for(let y = 0; y < blockList.length; y++)
        for(let x = 0; x < blockList[0].length; x++)
            blockList[y][x].draw(y, x);
}