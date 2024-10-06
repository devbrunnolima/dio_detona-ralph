// Estado principal do jogo, contendo referências às visualizações (view), valores dinâmicos (values) e ações do jogo (actions)
const state = {
    view: {
      squares: document.querySelectorAll(".square"),  // Seleciona todos os elementos com a classe 'square' (quadrados do jogo)
      enemy: document.querySelector(".enemy"),        // Seleciona o inimigo (elemento com a classe 'enemy')
      timeLeft: document.querySelector("#time-left"), // Seleciona o elemento que mostra o tempo restante do jogo
      score: document.querySelector("#score"),        // Seleciona o elemento que exibe a pontuação
    },
    values: {
      gameVelocity: 1000,  // Define a velocidade do jogo (tempo em milissegundos entre a aparição do inimigo)
      hitPosition: 0,      // Armazena a posição atual do inimigo (quadrado com o inimigo)
      result: 0,           // Armazena o resultado/pontuação do jogador
      curretTime: 60,      // Define o tempo restante do jogo (em segundos)
    },
    actions: {
      timerId: setInterval(randomSquare, 1000),       // Define um intervalo para mudar o quadrado com o inimigo a cada segundo
      countDownTimerId: setInterval(countDown, 1000), // Define um intervalo para a contagem regressiva do tempo de jogo
    },
  };
  
  // Função para controlar a contagem regressiva do tempo
  function countDown() {
    state.values.curretTime--;  // Diminui o tempo restante em 1
    state.view.timeLeft.textContent = state.values.curretTime;  // Atualiza o tempo restante na interface
  
    // Verifica se o tempo chegou a zero, finalizando o jogo
    if (state.values.curretTime <= 0) {
      clearInterval(state.actions.countDownTimerId);  // Para o temporizador de contagem regressiva
      clearInterval(state.actions.timerId);           // Para o temporizador de mudança de quadrados
      alert("Game Over! O seu resultado foi: " + state.values.result);  // Mostra o resultado final ao jogador
    }
  }
  
  // Função para reproduzir sons do jogo (como o som de acerto)
  function playSound(audioName) {
    let audio = new Audio(`./src/audios/${audioName}.m4a`);  // Cria um novo objeto de áudio a partir do nome do arquivo
    audio.volume = 0.2;  // Define o volume do som
    audio.play();         // Reproduz o som
  }
  
  // Função que escolhe um quadrado aleatório para colocar o inimigo
  function randomSquare() {
    // Remove a classe 'enemy' de todos os quadrados
    state.view.squares.forEach((square) => {
      square.classList.remove("enemy");
    });
  
    // Escolhe um quadrado aleatório
    let randomNumber = Math.floor(Math.random() * 9);  // Gera um número aleatório entre 0 e 8 (assumindo que há 9 quadrados)
    let randomSquare = state.view.squares[randomNumber];  // Seleciona o quadrado correspondente ao número aleatório
    randomSquare.classList.add("enemy");  // Adiciona a classe 'enemy' ao quadrado selecionado
    state.values.hitPosition = randomSquare.id;  // Armazena a posição atual do inimigo (o id do quadrado)
  }
  
  // Função para adicionar o evento de clique aos quadrados
  function addListenerHitBox() {
    // Para cada quadrado, adiciona um evento de clique
    state.view.squares.forEach((square) => {
      square.addEventListener("mousedown", () => {
        // Verifica se o quadrado clicado é aquele onde está o inimigo
        if (square.id === state.values.hitPosition) {
          state.values.result++;  // Aumenta a pontuação do jogador
          state.view.score.textContent = state.values.result;  // Atualiza a pontuação na interface
          state.values.hitPosition = null;  // Reseta a posição do inimigo
          playSound("hit");  // Reproduz o som de acerto
        }
      });
    });
  }
  
  // Função de inicialização do jogo
  function init() {
    addListenerHitBox();  // Adiciona os eventos de clique aos quadrados
  }
  
  // Chama a função init para iniciar o jogo
  init();
  