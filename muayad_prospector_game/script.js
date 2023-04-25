let floodTime=10;
let currentTime=0;
let myGold=0;
let allGoldInRiver = 0;


let theRiver = [

    [

        {chanceOfFinding:.5,amt:24,collected:false},
        {chanceOfFinding:.3,amt:20,collected:false},
        {chanceOfFinding:.9,amt:15,collected:false}
    ],



    [
        {chanceOfFinding:.3,amt:12,collected:false},
        {chanceOfFinding:.2,amt:8,collected:false},
        {chanceOfFinding:.7,amt:78,collected:false}

    ],

   
    [

        {chanceOfFinding:.4,amt:3,collected:false},
        {chanceOfFinding:.2,amt:6,collected:false},
        {chanceOfFinding:.6,amt:3,collected:false}
        
    ],
    
        
     

    [

        {chanceOfFinding:.2,amt:17,collected:false},
        {chanceOfFinding:.8,amt:21,collected:false},
        {chanceOfFinding:.3,amt:5,collected:false}
    ],

      
    [

        {chanceOfFinding:.5,amt:46,collected:false},
        {chanceOfFinding:.6,amt:22,collected:false},
        {chanceOfFinding:.7,amt:43,collected:false}

    ],
 
    
    [

        {chanceOfFinding:.43,amt:6,collected:false},
        {chanceOfFinding:.23,amt:7,collected:false},
        {chanceOfFinding:.17,amt:4,collected:false}
    ],
   

    [

        {chanceOfFinding:.37,amt:4,collected:false},
        {chanceOfFinding:.29,amt:9,collected:false},
        {chanceOfFinding:.13,amt:2,collected:false}

    ]

];

let riverLength = theRiver.length;
let riverWidth = theRiver[1].length;

// *  Update the function to return the total amount of gold in the river.  
function totalGoldInRiver(){
    allGoldInRiver = 0;
    for(let i=0;i<theRiver.length;i++){
        for(let j=0;j<theRiver[i].length;j++){
            allGoldInRiver += theRiver[i][j].amt;
        }
    }
    console.log(allGoldInRiver);
    return allGoldInRiver;
};


function findGoldAtLocation(lengthCoord,widthCoord ){
    // * Make riverSpot hold the location specified by the 2 variables
    let riverSpot = theRiver[lengthCoord][widthCoord] ;
    let goldChance = Math.random();
    let goldFound;
    if(goldChance>riverSpot.chanceOfFinding && riverSpot.collected==false){
        myGold+= riverSpot.amt;
        console.log(`Yee Haw! I found ${riverSpot.amt}`);
        //* make goldFound hold an object holding a boolean called found and a number called amt
        goldFound = {
            found: true,
            amt: riverSpot.amt
         };
    }else{
        console.log(`darn tootin!  No Gold for me!`);
        // * Make goldFound hold an object holding a boolean called found and a number called amt
        // * 
        goldFound = { 
            found:false,
            amt:0
        };
    }
    return goldFound;
}

function removeActions(square){
    
    square.removeEventListener("click", squareClicks);

    square.removeEventListener("mouseenter", squareOver);
    square.removeEventListener("mouseleave", squareOut);

}

let gameOver =document.querySelector("#game")
gameOver.classList.add("game");

function updateRound(){
    
    currentTime+=1;
    if(currentTime==floodTime){
        console.log("game is over!");
        gameOver.innerText="GAME OVER!";
        removeAllBoardClicks();
    }
}

function squareClicks(e){
    removeActions(e.target);

    console.log( e.target.id.split("_"));
    console.log("Data type is an array of strings");
    let yVal = e.target.id.split("_")[1];
    
    let xVal = e.target.id.split("_")[2];
   
    let wasGoldFound = findGoldAtLocation(yVal, xVal);
    console.log(wasGoldFound);
    if(wasGoldFound.found==true){

        e.target.classList.add("collectedGold");
       
        e.target.innerText= wasGoldFound.amt;
    }else{
        
        e.target.classList.add("collectedNoGold");
    }
    updateRound();
    updateStatsDisplay();
    
}
function squareOver(e){
    e.target.classList.add("hovering");
}
function squareOut(e){
    e.target.classList.remove("hovering");
}



function removeAllBoardClicks(){
    for(let y=0;y<riverLength;y++){
        for(let x=0;x<riverWidth;x++){
            
            let mySquare = document.querySelector(`#river_${y}_${x}`);
        
            mySquare.removeEventListener("click",squareClicks);
          
            mySquare.removeEventListener("mouseenter", squareOver);
          
            mySquare.removeEventListener("mouseleave", squareOut);
        }
    }
}

function setupGameboardClicks(){
    for(let y=0;y<riverLength;y++){
        for(let x=0;x<riverWidth;x++){
            let mySquare = document.querySelector(`#river_${y}_${x}`);
            console.log(`river_${y}_${x}`);
            mySquare.addEventListener("click",squareClicks);
            mySquare.addEventListener("mouseenter", squareOver);
            mySquare.addEventListener("mouseleave", squareOut);
            
        }
    }
}
function updateStatsDisplay(){
    let totalGold = document.querySelector("#totalGold");
    totalGold.innerHTML = `Total Gold: ${totalGoldInRiver()}`;
    let myCurrentRound= document.querySelector("#currentTime")
    myCurrentRound.innerHTML=`Current round is ${currentTime}`; 
    

    let goldAmountCollected= document.querySelector("#collectedGold")
    goldAmountCollected.innerHTML = `Gold Found: ${myGold}`;
    let totalTime = document.querySelector("#totalTime");
    totalTime.innerText = `Time To Flood: ${floodTime}`;
}


function clearSquares(){
    for(let y=0;y<riverLength;y++){
        for(let x=0;x<riverWidth;x++){
            let mySquare = document.querySelector(`#river_${y}_${x}`);
            mySquare.classList.remove("collectedGold");
            console.log(mySquare);

            mySquare.classList.remove("collectedNoGold");

            theRiver[y][x].collected=false;
            mySquare.classList.remove("hovering");
           
            mySquare.innerText="";
            mySquare.removeEventListener("click",squareClicks);
            mySquare.removeEventListener("mouseenter",squareOver);
            mySquare.removeEventListener("mouseleave",squareOut);
            
        }
    }
}
function newGame(){
    floodTime=10;
    currentTime=0;
    myGold=0;
    allGoldInRiver = 0;
    gameOver.innerText="";
    clearSquares();
    updateStatsDisplay();
    setupGameboardClicks();
}

function initReset(){
    let myReset = document.querySelector("#reset")
    myReset.addEventListener("click",newGame);
}

function initGame(){
    initReset();
    newGame();
}
initGame();