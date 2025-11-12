const blockSize = 50;
let flag;
var difficulty;
var blockList;

function preload(){
    flag = loadImage("/Assets/Flag.png");
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

    return {mineCount, width, height};
}

function Block(x, y){
    this.x = x;
    this.y = y;
    //If minesAroundTheBlock = -1 this block is the mine!
    this.minesAroundTheBlock = 0;
    this.isRevealed = false;
    this.isFlaged = false;
}

Block.prototype.draw = function(ix, iy){
    if(this.isRevealed){
        if((iy % 2 === 0 && ix % 2 === 0) || (iy % 2 === 1 && ix % 2 === 1))
            fill("#1D3100");
        
        else
            fill("#2F4808");
    }

    else{
        if((iy % 2 === 0 && ix % 2 === 0) || (iy % 2 === 1 && ix % 2 === 1))
            fill("#74B01C");
        
        else
            fill("#C7EE8E");
    }

    square(this.x, this.y, blockSize);

    if(this.isFlaged)
        image(flag, this.x, this.y);
}

function generateBlocks(){
    blockList = [];

    //Creates a 2D array.
    for(let x = 0; x < height; x += blockSize){
        let row = [];

        for(let y = 0; y < width; y += blockSize)
            row.push(new Block(x, y));

        blockList.push(row);
    }

    //Places mines.
    for(let mines = difficulty.mineCount; mines > 0;){
        let x = floor(random(0, blockList.length));
        let y = floor(random(0, blockList[0].length));

        if(blockList[x][y].minesAroundTheBlock === 0){
            blockList[x][y].minesAroundTheBlock = -1;
            mines--;
        }
    }

    //Calculates mines around the blocks.
    for(let x = 0; x < blockList.length; x++)
        for(let y = 0; y < blockList[0].length; y++)
            if(blockList[x][y].minesAroundTheBlock === -1)
                for(let b = x - 1; b <= x + 1; b++)
                    for(let a = y - 1; a <= y + 1; a++)
                        if(-1 < b && b < blockList.length && -1 < a && a < blockList[0].length && blockList[b][a].minesAroundTheBlock !== -1)
                            blockList[b][a].minesAroundTheBlock = blockList[b][a].minesAroundTheBlock + 1;

    return blockList;
}

function setup(){
    flag.resize(blockSize, blockSize);

    difficulty = setDifficulty(1);
    
    createCanvas(difficulty.width*blockSize, difficulty.height*blockSize);
    
    blockList = generateBlocks();
}

function draw(){
    //Codes in draw() are temporary!
    noStroke();

    for(let x = 0; x < blockList.length; x++)
        for(let y = 0; y < blockList[0].length; y++)
            blockList[x][y].draw(x, y);
}