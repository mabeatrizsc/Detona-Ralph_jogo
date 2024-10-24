// Define o estado do jogo, contendo as views (elementos da interface), values do jogo e as actions em andamento
const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result:0,
        currentTime: 60,
    },
    actions: {
        timeId: setInterval(randomSquare, 1000),
        countDownTimerId:setInterval(countDown, 1000),
    }
};

// Função para contar o tempo restante
function countDown(){
    state.values.currentTime--;
    state.view.timeLeft.textContent = state.values.currentTime;

    if (state.values.currentTime < 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.timeId);
        alert("Game Over! O seu resultado foi: " + state.values.result);
    }
}

// Função para reproduzir um som quando o jogador acerta um quadrado
function playSound(audioName){
    let audio = new Audio(`./src/audios/${audioName}.m4a`);
    audio.volume = 0.2;
    audio.play();
}

// Função que seleciona um quadrado aleatório para ser o "inimigo"
function randomSquare(){
    state.view.squares.forEach((square) =>{
        square.classList.remove("enemy");
    });
    let randomNumber = Math.floor(Math.random() * 9);
    let randomSquare = state.view.squares[randomNumber];
    randomSquare.classList.add("enemy");
    state.values.hitPosition = randomSquare.id;
}


// Função para adicionar um ouvinte de eventos a cada quadrado
function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=> {
            // Verifica se o quadrado clicado é o que tem a classe enemy
            if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result;
                state.values.hitPosition = null;
                playSound("hit");
            }
        })
    });
}

function Initialize() {
    addListenerHitBox();
}
// Chama a função para começar o jogo
Initialize();
