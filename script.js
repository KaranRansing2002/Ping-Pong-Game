alert("Script Connected");
let ball=document.querySelector(".ball");
let board=document.querySelector(".board");
let paddleLeft=document.querySelector(".paddle.left");
let paddleRight=document.querySelector(".paddle.right");
let boardCord=board.getBoundingClientRect();
let listner=document.addEventListener("keydown",function(e){
    //console.log(e, "is pressed");
    if(e.key=="w"){
        movePaddle(paddleLeft,-window.innerHeight*0.1);
    }
    else if(e.key=="s"){
        movePaddle(paddleLeft,window.innerHeight*0.1);
    }
    else if(e.key=="ArrowUp"){
        movePaddle(paddleRight,-window.innerHeight*0.1);
    }
    else if(e.key=="ArrowDown"){
        movePaddle(paddleRight,window.innerHeight*0.1);
    }
});
let leftPlayerLives=3;
let rightPlayerLives=3;

function movePaddle(curPaddle,change){
    let curPaddleBounds=curPaddle.getBoundingClientRect();
    if((curPaddleBounds.top+change)>=boardCord.top && (curPaddleBounds.bottom+change)<=boardCord.bottom)curPaddle.style.top=curPaddleBounds.top+change+"px";
}

let x=true;
let y=true;

function moveBall(){
    let ballCord=ball.getBoundingClientRect();
    let ballTop=ballCord.top;
    let ballLeft=ballCord.left;
    let ballBottom=ballCord.bottom;
    let ballRight=ballCord.right;
    let boardTop=boardCord.top;
    let boardBottom=boardCord.bottom;
    
    if(ballBottom>=boardBottom || ballTop<=boardTop){
        y=!y;
    }
    let leftPaddleBounds=paddleLeft.getBoundingClientRect();
    let rightPaddleBounds=paddleRight.getBoundingClientRect();
    if(ballLeft<=leftPaddleBounds.right && ballRight>=leftPaddleBounds.left && ballTop+30>=leftPaddleBounds
        .top && ballBottom-30<=leftPaddleBounds.bottom){
        x=!x;
    }
    if(ballLeft<=rightPaddleBounds.right && ballRight>=rightPaddleBounds.left && ballTop+30>=rightPaddleBounds
        .top && ballBottom-30<=rightPaddleBounds.bottom){
        x=!x
    }
    let hasTouchedLeft=ballLeft<boardCord.left;
    let hasTouchedRight=ballRight>boardCord.right;
    if(hasTouchedLeft || hasTouchedRight){
        if(hasTouchedLeft){
            leftPlayerLives--;
            if(leftPlayerLives==0){
                alert("Game Over Player 2 has won");
            }
            else{
                return resetGame();
            }
        }
        else{
            rightPlayerLives--;
            if(rightPlayerLives==0){
                alert("Game Over Playr 1 has won");
            }
            else{
                return resetGame();
            }
        }
    }
    function resetGame() {
        ball.style.top=window.innerHeight*0.45+"px";
        ball.style.left=window.innerWidth*0.45+"px";
        requestAnimationFrame(moveBall);
    }
    //console.log(x);
    ball.style.top=y==true ? ballTop+4+"px" : ballTop-4+"px";
    ball.style.left=x==true ? ballLeft+4+"px" : ballLeft-4+"px";
     
    requestAnimationFrame(moveBall);
}

 requestAnimationFrame(moveBall);