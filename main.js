//랜덤 숫자 자동 생성 - 페이지가 시작될때마다, reset버튼을 누를때마다

//Go버튼을 누르면
// 1. 1-100 숫자 유효성 검사
// 2. 정답과 일치하는지 검사
// 3. 정답보다 높으면 - down을 결과창에 보여주기 / 낮으면 up을 결과창에 보여주기
// 4. chances 칸에 5번부터 시작해서 줄어들기
// 5. 동일한 숫자 입력한 시에는 기회가 줄지 않고 - '이미 입력한 숫자' 라고 결과창에 보여주기

//Reset 버튼을 누르면
// 랜덤 숫자 생성

let computerNum = 0;
let goBtn = document.getElementById("go-btn");
let userNum = document.getElementById("user-num");
let resultArea = document.getElementById("result-area");
let chanceNum = document.getElementById("chance-num");
let resetBtn = document.getElementById("reset-btn");
let userNumHistory = [];
let chances = 5;
let gameOver = false;



goBtn.addEventListener("click", play);
resetBtn.addEventListener("click", reset);
userNum.addEventListener("focus", function(){userNum.value="";});


function randomNum(){
    computerNum = Math.floor(Math.random()*100+1);
    console.log(computerNum);
}

function play(){
    let userValue = userNum.value;

    if(userValue <1 || userValue >100){
        resultArea.textContent = "1-100 숫자만 입력하세요";
        return;
    }    

    if(userNumHistory.includes(userValue)){
        resultArea.textContent = "이미 입력한 숫자입니다";
        return;
    }
    
    chances --; 
    chanceNum.textContent = `남은기회: ${chances}번`;

    if(userValue<computerNum){
        resultArea.textContent = "UP";
    }
    else if(userValue>computerNum){
        resultArea.textContent = "DOWN";
    }
    else{
        resultArea.textContent = "YOU'RE RIGHT!!!";
    }    

    userNumHistory.push(userValue);
    console.log(userNumHistory);

    if(chances == 0){
        gameOver = true;
    }
    if(gameOver){
        goBtn.disabled = true;
        resultArea.textContent = "FAILD";
    }
}

function reset(){
    randomNum();
    gameOver = false;
    goBtn.disabled = false;
    resultArea.textContent = "";
    chanceNum.textContent = "남은기회: 5번";
    userNum.value = "";
}

randomNum();