// var 가로 = 4;
// var 세로 = 3;
var numOfCards = 12;
var colors = ['red', 'red', 'orange', 'orange', 'green', 'green', 'yellow', 'yellow', 'white', 'white', 'pink', 'pink'];
var colorList = colors.slice();
var color = [];
var clickFlag = true;
var clickedCards = [];
var completeCards = [];
var startTime;
function shuffle() {
  for (var i=0; colorList.length > 0; i++) {
    color = color.concat(colorList.splice(Math.floor(Math.random() * colorList.length), 1));
  }
};


function cardSetting(numOfCards) {
  clickFlag = false;
  for (var i = 0; i < numOfCards; i++) {
    var card = document.createElement('div');
    card.className = 'card';
    var cardInner = document.createElement('div');
    cardInner.className = 'card-inner';
    var cardFront = document.createElement('div');
    cardFront.className = 'card-front';
    var cardBack = document.createElement('div');
    cardBack.className = 'card-back';
    cardBack.style.backgroundColor = color[i];
    cardInner.appendChild(cardFront);
    cardInner.appendChild(cardBack);
    card.appendChild(cardInner);
    (function(c) {
      card.addEventListener('click', function() {
        if(clickFlag && !completeCards.includes(c)) {
          c.classList.toggle('flipped');
          clickedCards.push(c);
            if(clickedCards.length === 2) {
              if(clickedCards[0].querySelector('.card-back').style.backgroundColor
              ===clickedCards[1].querySelector('.card-back').style.backgroundColor) {
                completeCards.push(clickedCards[0]);
                completeCards.push(clickedCards[1]);
                clickedCards = [];
                if(completeCards.length === numOfCards) {
                  var endTime = new Date();
                  alert('Congulatulation! It took ' + (endTime - startTime) / 1000 + 'seconds.');
                  document.querySelector('#wrapper').innerHTML = '';
                  colorList = colors.slice();
                  color = [];
                  completeCards = [];
                  startTime = null;
                  shuffle();
                  cardSetting(numOfCards);
                }
              } else { // 두 카드의 색깔이 다르면
                clickFlag = false;
                setTimeout(function() {
                  clickedCards[0].classList.remove('flipped');
                  clickedCards[1].classList.remove('flipped');
                  clickFlag = true;
                  clickedCards = [];
                }, 1000);
              }
            }
        }
      });
    })(card);
    document.querySelector('#wrapper').appendChild(card);
  }

  document.querySelectorAll('.card').forEach(function (card, index) {
    setTimeout(function () {
      card.classList.add('flipped');
    }, 1000 + 100 * index);
  });

  setTimeout(function () {
    document.querySelectorAll('.card').forEach(function (card, index) {
      card.classList.remove('flipped');
    });
    clickFlag = true;
    startTime = new Date();
  }, 5000);

};

shuffle();
cardSetting(numOfCards);
