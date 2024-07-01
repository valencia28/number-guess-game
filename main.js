//랜덤 숫자 자동 생성 - 페이지가 시작될때마다, reset버튼을 누를때마다

//Go버튼을 누르면
// 1. 1-100 숫자 유효성 검사
// 2. 정답과 일치하는지 검사
// 3. 정답보다 높으면 - down을 결과창에 보여주기 / 낮으면 up을 결과창에 보여주기
// 4. chances 칸에 5번부터 시작해서 줄어들기
// 5. 동일한 숫자 입력한 시에는 기회가 줄지 않고 - '이미 입력한 숫자' 라고 결과창에 보여주기

//Reset 버튼을 누르면
// 랜덤 숫자 생성

/*
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
        resultArea.textContent = "FAILED";
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
*/

//jquery로 위 코드와 같은 내용 구현
$(document).ready(function(){

    let computerNum = 0;
    let userNum = $('#user-num').val();
    let userNumHistory = [];
    let chances = 3;
    let gameOver = false;

    //맞춰야 할 숫자 자동 생성    
    function randomNum(){
        computerNum = Math.floor(Math.random()*100+1);       
    }
    randomNum();    
    console.log(computerNum);
    $('#answer').text(`정답: ${computerNum}`);

    //Go버튼을 눌렀을 때
    $('#go-btn').click(function(){
        userNum = $('#user-num').val();

        if(userNum < 1 || userNum > 100){
            $('#result-area').text("1~100사이 숫자를 입력하세요.").removeClass('blink');
            return;
        }

        if(userNumHistory.includes(userNum)){
            $('#result-area').text("이미 입력한 숫자입니다.").removeClass('blink');
            return;
        }

        chances --;
        $('#chance-num').text(`남은기회: ${chances}번`);        

        if(userNum < computerNum){
            $('#result-area').text("UP!!").css('color', 'red').removeClass('blink');
        }else if(userNum > computerNum){
            $('#result-area').text("DOWN!!").css('color', 'green').removeClass('blink');
        }else{
            $('#result-area').text("YOU'RE RIGHT!!!!").addClass("blink");
            $('#result-img').attr('src', 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzIxZ3Jud2dnYjhmZW12dWZ6NG4zbHF2YmhxeW44enZjNW9zeGtxcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U15K44Hl3zvbd1n3oG/giphy.webp').show();
        }

        userNumHistory.push(userNum);

        if(chances == 0){
            if(userNum == computerNum){
                $('#result-area').text("YOU'RE RIGHT!!!!").addClass("blink");
            $('#result-img').attr('src', 'https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExZzIxZ3Jud2dnYjhmZW12dWZ6NG4zbHF2YmhxeW44enZjNW9zeGtxcyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/U15K44Hl3zvbd1n3oG/giphy.webp').show();
            }else{
               gameOver = true;
            $('#result-area').text("DRINK! DRINK!!").addClass('blink');
            $('#result-img').attr('src', 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExZGVmNnFtNjZta2hjYzByaGV4ZjM0ZWQ2MXZqbjNrOXM4dGx3aW16dyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/2ePBOQ0LzXv4k/giphy.webp').show();
            $('#result-img')
            $('#user-num').val(''); 
            }            
        }

        if(gameOver){
            $('#go-btn').prop('disabled', true);
        }
    });//go-btn

    //리셋 버튼 눌렀을 때 
    $('#reset-btn').click(function(){
        randomNum();
        console.log(computerNum);
        $('#answer').text(`정답: ${computerNum}`);
        gameOver=false;
        chances = 3;
        userNumHistory = [];
        $('#go-btn').prop('disabled', false);
        $('#chance-num').text(`남은기회: 3번`);
        $('#result-area').text('');
        $('#user-num').val('');
        $('#result-img').attr('src', '').hide();
    }); //reset-btn

    //input 창에 포커스 갈 때마다 입력된 내용 리셋
    $('#user-num').focus(function(){
        $(this).val('');
    });//input focus
}); //ready