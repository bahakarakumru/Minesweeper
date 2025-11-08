const blockSize = 50;
var difficulty;
var blockList;

//i === 0: Custom, i === 1: Easy, i === 2: Medium, i === 3: Hard
function setDifficulty(i, bombCount, width, height){
    switch(i){
        case 0:
            if(height >= 1 && height >= 1)
                if(bombCount === (width * height) -1)
                    break;

                else{
                    console.log("Bomb count can't be higher or equal to", (width * height));
                    return 0;
                }

            else{
                console.log("Width and Height needs to be higher or equal to 1");
                return 0;
            }

        case 1:
            bombCount = 10, width = 10, height = 8; break;

        case 2:
            bombCount = 40, width = 18, height = 14; break;

        case 3:
            bombCount = 99, width = 24, height = 20; break;
    }

    return {bombCount, width, height};
}

function Block(x, y){
    this.x = x;
    this.y = y;
    this.bombCountAroundTheBlock = 0;
}

function addBlocks(){
    let blocks = [];

    //Creates a 2D array.
    for(let y = 0; y < height; y += blockSize){
        let row = [];

        for(let x = 0; x < width; x += blockSize)
            row.push(new Block(x, y));

        blocks.push(row);
    }

    //Places bombs.
    for(let bombs = difficulty.bombCount; bombs > 0;){
        let y = Math.floor(Math.random() * blocks.length);
        let x = Math.floor(Math.random() * blocks[0].length);

        if(blocks[y][x].bombCountAroundTheBlock === 0){
            blocks[y][x].bombCountAroundTheBlock = -1;
            bombs--;
        }
    }

    //Calculates bombs around the blocks.
    for(let y = 0; y < blocks.length; y++)
        for(let x = 0; x < blocks[0].length; x++)
            if(blocks[y][x].bombCountAroundTheBlock === -1)
                for(let b = y - 1; b <= y + 1; b++)
                    for(let a = x - 1; a <= x + 1; a++)
                        if(-1 < b && b < blocks.length && -1 < a && a < blocks[0].length && blocks[b][a].bombCountAroundTheBlock !== -1)
                            blocks[b][a].bombCountAroundTheBlock = blocks[b][a].bombCountAroundTheBlock + 1;

    return blocks;
}

function setup(){
    difficulty = setDifficulty(1);
    
    //Creats a canvas according to the difficulty.
    createCanvas(difficulty.width*blockSize, difficulty.height*blockSize);
    
    blockList = addBlocks();
}
   
function draw(){

}