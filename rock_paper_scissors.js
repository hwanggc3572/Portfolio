document.querySelector('#computer').style.background =
  'url(https://data.ac-illust.com/data/thumbnails/4f/4f63b32d7d43ea2cb231c0724200cf8e_w.jpeg) 0 0';

var result = document.createElement('div');

var imageIndex = '0';
var rockPaperScissors = {
  rock: '0',
  scissors: '-240px',
  paper: '-480px'
};

function computerChoice(imageIndex) {
  return Object.entries(rockPaperScissors).find(function(v) {
    return v[1] === imageIndex;
  })[0];
};

var interval;
function intervalMaker() {
  interval = setInterval(function() {
    if(imageIndex===rockPaperScissors.rock) {
      imageIndex = rockPaperScissors.scissors;
    } else if (imageIndex === rockPaperScissors.scissors) {
      imageIndex = rockPaperScissors.paper;
    } else {
      imageIndex = rockPaperScissors.rock;
    }
    document.querySelector('#computer').style.background =
      'url(https://data.ac-illust.com/data/thumbnails/4f/4f63b32d7d43ea2cb231c0724200cf8e_w.jpeg) ' + imageIndex +' 0';
  }, 100);
};

intervalMaker();

var points = {
  scissors: 1,
  rock: 0,
  paper: -1
};


document.querySelectorAll('.btn').forEach(function (btn) {
  btn.addEventListener('click', function() {
    clearInterval(interval);
    setTimeout(function () {
      intervalMaker();
    }, 1000);
    var myChoice = this.textContent;
    var myPoints = points[myChoice];
    var computerPoints = points[computerChoice(imageIndex)];
    var pointsDiff = myPoints - computerPoints;
    //console.log('my points: ', myPoints, ', computer points: ', computerPoints);
    
    if(pointsDiff === 0) {
      console.log('Draw.');
      result.textContent = 'Draw';
    } else if ([-1,2].includes(pointsDiff)) {
      console.log('You Win.');
      result.textContent = 'You Win';
    } else {
      console.log('You Lose.');
      result.textContent = 'You Lose';
    }
    document.body.append(result);


    // if (myChoice === '가위') {
    //   if(컴퓨터의선택(이미지좌표) === '가위') {
    //     console.log('비겼습니다.');
    //   } else if (컴퓨터의선택(이미지좌표) === '바위') {
    //     console.log('졌습니다.');
    //   } else {
    //     console.log('이겼습니다.');
    //   }
    // } else if (myChoice === '바위') {
    //   if(컴퓨터의선택(이미지좌표) === '가위') {
    //     console.log('이겼습니다.');
    //   } else if (컴퓨터의선택(이미지좌표) === '바위') {
    //     console.log('비겼습니다.');
    //   } else {
    //     console.log('졌습니다.');
    //   }
    // } else {
    //   if(컴퓨터의선택(이미지좌표) === '가위') {
    //     console.log('졌습니다.');
    //   } else if (컴퓨터의선택(이미지좌표) === '바위') {
    //     console.log('이겼습니다.');
    //   } else {
    //     console.log('비겼습니다.');
    //   }
    // }
  });
});
