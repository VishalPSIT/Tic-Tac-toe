const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector("[data-gameInfo]");
const newGAmeBtn = document.querySelector(".btn");

let currPlayer;
let GameGrid;
let count ;
const winningPos = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [2,4,6],[0,4,8]
];

function initializeGame(){
    currPlayer ='X';
    GameGrid = ["","","","","","","","",""];
    boxes.forEach((box,index)=>{
        box.innerText = "";
        box.style.pointerEvents = 'auto';
        box.classList.remove("win");
    })
    count = 0;
    newGAmeBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currPlayer}`;
}
initializeGame();

boxes.forEach((box,index)=>{
    
    box.addEventListener("click" , ()=>{
        handleClick(index);
    })
});

function handleClick(index){
    if (GameGrid[index] === ""){
        count++;
        GameGrid[index]= currPlayer;
        boxes[index].innerText=currPlayer;
        boxes[index].style.pointerEvents = 'none';
        //swap chances
        swapChances();
        gameInfo.innerText = `Current Player - ${currPlayer}`;
        checkGameOver();
    }
};
function swapChances(){
    if (currPlayer === "X") currPlayer = "O";
    else currPlayer = "X";
};

function checkGameOver(){
    let ans = "";
    winningPos.forEach((pos)=>{
        if (GameGrid[pos[0]] != "" && (GameGrid[pos[0]]===GameGrid[pos[1]]) &&
            (GameGrid[pos[1]]===GameGrid[pos[2]])){
                if (GameGrid[pos[0]]==="X") ans = "X";
                else ans = "O";
                boxes[pos[0]].classList.add("win");
                boxes[pos[1]].classList.add("win");
                boxes[pos[2]].classList.add("win");
                newGAmeBtn.classList.add("active");
                boxes.forEach((box)=>{
                    box.style.pointerEvents = 'none';
                })
        }
    });
    if (ans!=""){
        gameInfo.innerText = `Player ${ans} win`;
    }  
    if (count === 9){
        newGAmeBtn.classList.add("active");
        gameInfo.innerText = "Draw";
    }  
}

newGAmeBtn.addEventListener("click" , initializeGame); 