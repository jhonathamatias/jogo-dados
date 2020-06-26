/**
 * Telas do jogo
 */
let menu_list = document.getElementById('menu-list');
let registerPlayers = document.getElementById('register-players');
let gameArea = document.getElementById('game-area');

/**
 * Menu do jogo
 */
let menu_items = document.querySelectorAll('.menu-item');
let menu_item_jogar = document.getElementById('jogar');

menu_items.forEach(el => {
    el.onmouseenter = function () {
        let audio = new Audio('audios/efeito-click.mp3');

        audio.addEventListener('canplaythrough', event => {
            audio.play();
        });
    }
});

menu_item_jogar.onclick = function() {
    menu_list.style.display = 'none';
    registerPlayers.style.display = 'block';
}

/**
 * Registro dos jogadores
 */
let inputPlayer1 = document.getElementById('input-player1');
let inputPlayer2 = document.getElementById('input-player2');
let player1Name = document.getElementById('player1-name');
let player2Name = document.getElementById('player2-name');
let buttonRegister = document.getElementById('register');
let registerBack = document.getElementById('register-back');

buttonRegister.onclick = function() {
    if (inputPlayer1.value === "" || inputPlayer2.value === "") {
        alert('Para iniciar o jogo, por favor informe dois jogadores.');
        return;
    }

    player1Name.innerText = inputPlayer1.value;
    player2Name.innerText = inputPlayer2.value;

    registerPlayers.style.display = 'none';
    gameArea.style.display = 'flex';
}

registerBack.onclick = function () {
    registerPlayers.style.display = 'none';
    menu_list.style.display = 'flex';
}

/**
 * Lógica do Jogo
 */
let dado1Image = document.getElementById('dado1');
let dado2Image = document.getElementById('dado2');
let player1Button = document.querySelector('#player1 .lancar-dado');
let player2Button = document.querySelector('#player2 .lancar-dado');
let player1ScoreHTML = document.getElementById('player1-score');
let player2ScoreHTML = document.getElementById('player2-score');

let player1 = {
    score: 10,
    roundScore: 0,
    countClick: 0
};

let player2 = {
    score: 10,
    roundScore: 0,
    countClick: 0
};

function sorteio() {
    return Math.floor(Math.random() * 6 + 1);
}

function mudarImagemDado(point, dadoElement) {
    dadoElement.src = 'img/Dado_' + point + '.jpg';
}

function gameReset() {
    player1.score = 10;
    player2.score = 10;

    player1ScoreHTML.innerText = 10;
    player2ScoreHTML.innerText = 10;
}

function verificaVencedor() {
    if (player1.score === 0) {
        alertFinishGame(player2Name.innerText);
        return true;
    }

    if (player2.score === 0) {
        alertFinishGame(player1Name.innerText);
        return true;
    }

    return false;
}

function alertFinishGame(playerWinner) {
    swal({
        title: playerWinner + ' venceu o jogo!',
        text: "Deseja jogar novamente?",
        buttons: ['Não', 'Sim'],
        dangerMode: true,
      })
      .then((yes) => {
        if (yes) {
          swal("Prepare-se! o jogo vai começar!")
            .then(() => {
                gameReset();
            });
        } else {
          swal("Que pena!").then(() => {
              gameReset();
              menu_list.style.display = 'flex';
              gameArea.style.display = 'none';
          });
        }
      });
}

player1Button.onclick = function() {
    let point = sorteio();

    if (player1.countClick > 0) {
        swal('Ops!', 'É a vez do jogador ' + player2Name.innerText, 'warning');
        return;
    }

    if (player2.countClick > 0) {
        player2.countClick = 0;
    }

    if (player1.countClick === 0) {
        player1.countClick++;
    }

    mudarImagemDado(point, dado1Image);
    player1.roundScore = point;
};

player2Button.onclick = function() {
    let point = sorteio();

    if (player1.countClick === 0) {
        swal('Ops!', 'O jogador ' + player1Name.innerText + ' não jogou ainda!', 'warning');
        return;
    }

    if (player2.countClick > 0) {
        player1.countClick = 0;
        swal('Finish', 'Round finish!', 'success');
        return;
    }

    if (player1.countClick > 0 && player2.countClick === 0) {
        player1.countClick = 0;
        player2.countClick++;
    }

    mudarImagemDado(point, dado2Image);
    player2.roundScore = point;

    if (player1.roundScore > player2.roundScore) {
        player2.score = player2.score - 1;
        player2ScoreHTML.innerText = player2.score;

        if (verificaVencedor() === true) {
            return;
        }

        swal('Round finish ' + player1Name.innerText + ' ganhou!');
        return;
    } 
    
    if (player2.roundScore > player1.roundScore){
        player1.score = player1.score - 1;
        player1ScoreHTML.innerText = player1.score;
        
        if (verificaVencedor() === true) {
            return;
        }
        
        swal('Round finish ' + player2Name.innerText + ' ganhou!');
        return;
    }

    if (player1.score === 0) {
        swal(player2Name.innerText + ' é vencedor do jogo');
        gameReset();
        return;
    }

    if (player2.score === 0) {
        swal(player1Name.innerText + ' é vencedor do jogo');
        gameReset();
        return;
    }

    swal('Round finish, empate!');
}