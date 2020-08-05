/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls TWO dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1 in any one of them , all his ROUND score gets lost. After that, it's the next player's turn
- If a player rolls a 6 in both the disc at the same time then active player looses all his GLOBAL score.
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLOBAL score. After that, it's the next player's turn
- An input field is there where players can set the winning score, so that they can change the predefined score of 100.
- The first player to reach 100 points or winning score set by player wins the game

*/


var scores, roundScore, activePlayer, gamePlaying;

init();

document.querySelector('.btn-roll').addEventListener('click', function () {

   if (gamePlaying) {
      var dice1 = Math.floor(Math.random() * 6) + 1;
      var dice2 = Math.floor(Math.random() * 6) + 1;
      document.getElementById("dice1").style.display = 'block';
      document.getElementById("dice2").style.display = 'block';

      document.getElementById("dice1").src = 'dice-' + dice1 + '.png';
      document.getElementById("dice2").src = 'dice-' + dice2 + '.png';

      if (dice1 !== 1 && dice2 !== 1) {
         if (dice1 === 6 && dice2 === 6) {
            scores[activePlayer] = 0;
            document.querySelector('#score-' + activePlayer).textContent = '0';
            nextPlayer();
         } else {
            roundScore += dice1 + dice2;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
         }
      } else {
         nextPlayer();

      }
   }



});

document.querySelector('.btn-hold').addEventListener('click', function () {

   if (gamePlaying) {
      scores[activePlayer] += roundScore;

      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      var input = document.getElementById("myFinalScore").value;
      var winningScore;
      if (input) {
         winningScore = input;
      } else {
         winningScore = 100;
      }

      if (scores[activePlayer] >= winningScore) {

         document.querySelector('#name-' + activePlayer).textContent = 'WINNER!';
         document.getElementById("dice1").style.display = 'none';
         document.getElementById("dice2").style.display = 'none';
         document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
         document.querySelector('.player-' + activePlayer + '-panel').classList.add('active');
         gamePlaying = false;


      } else {
         nextPlayer();
      }
   }




})


function nextPlayer() {
   activePlayer = activePlayer === 0 ? 1 : 0;
   roundScore = 0;

   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-1').textContent = '0';

   document.querySelector('.player-0-panel').classList.toggle('active');
   document.querySelector('.player-1-panel').classList.toggle('active');

   document.getElementById("dice1").style.display = 'none';
   document.getElementById("dice2").style.display = 'none';
}


document.querySelector('.btn-new').addEventListener('click', init);


function init() {
   scores = [0, 0];
   activePlayer = 0;
   roundScore = 0;

   document.getElementById("dice1").style.display = 'none';
   document.getElementById("dice2").style.display = 'none';

   document.getElementById('score-0').textContent = '0';
   document.getElementById('score-1').textContent = '0';
   document.getElementById('current-0').textContent = '0';
   document.getElementById('current-0').textContent = '0';
   document.getElementById('name-0').textContent = 'Player 1';
   document.getElementById('name-1').textContent = 'Player 2';
   document.querySelector('.player-0-panel').classList.remove('winner');
   document.querySelector('.player-1-panel').classList.remove('winner');
   document.querySelector('.player-0-panel').classList.remove('active');
   document.querySelector('.player-1-panel').classList.remove('active');
   document.querySelector('.player-0-panel').classList.add('active');
   gamePlaying = true;
   if (document.getElementById('myFinalScore').value) {
      document.getElementById('myFinalScore').value = '';
   }
}