var body = document.body;
var table = document.createElement('table');
var rows = [];
var cols = [];
var turn = 'X';
var result = document.createElement('div');

function resultCheck(row, col) {
  // 세칸 다 채워졌나?
  var filled = false;
  // 가로줄 검사
  if(cols[row][0].textContent === turn &&
     cols[row][1].textContent === turn &&
     cols[row][2].textContent === turn)
  {
    filled = true;
  }
  // 세로줄 검사
  if(cols[0][col].textContent === turn &&
     cols[1][col].textContent === turn &&
     cols[2][col].textContent === turn)
  {
    filled = true;
  }
  // 대각선 검사

  if(cols[0][0].textContent === turn &&
    cols[1][1].textContent === turn &&
    cols[2][2].textContent === turn)
  {
    filled = true;
  }

  if(cols[0][2].textContent === turn &&
    cols[1][1].textContent === turn &&
    cols[2][0].textContent === turn)
  {
    filled = true;
  }

  return filled;
};

function reset(draw) {
  if(draw) {
    result.textContent = 'Draw!';
  } else {
    result.textContent = turn + ' Win!';
  }
  body.append(result);
  setTimeout(function () {
    result.textContent = '';
    cols.forEach(function (r) {
      r.forEach(function (c) {
        c.textContent = '';
      });
    });
    turn = 'X';
  }, 1000);
};

// 칸을 클릭했을 때
var whenClick = function(e) {
  // console.log(이벤트.target); // 칸
  // console.log(이벤트.target.parentNode); // 줄
  // console.log(이벤트.target.parentNode.parentNode); // 테이블
  if(turn === 'O') {
    return;
  }
  var row = rows.indexOf(e.target.parentNode);
  var col = cols[row].indexOf(e.target);

  if(cols[row][col].textContent !== '') { // 칸이 이미 채워져 있는가?
    console.log('빈칸 아닙니다.');
  } else {
    e.target.textContent = turn;
    console.log('빈칸입니다.');

    // if(turn === 'X') {
    //   cols[row][col].style.backgroundColor = "pink";
    // } else if (turn === 'O') {
    //   cols[row][col].style.backgroundColor = "yellow"
    // }

    var gameEnd = resultCheck(row, col);


    // 모든 칸이 다 찼는지 검사
    var possibleEmptyCell = [];
    cols.forEach(function (r) {
      r.forEach(function (c) {
        possibleEmptyCell.push(c);
      });
    });

    // 컴퓨터가 빈 칸 중 하나를 고른다
    possibleEmptyCell = possibleEmptyCell.filter(function(c) { return c.textContent === '' });
    // gameEnd
    if(gameEnd) {
      reset();
    } else if(possibleEmptyCell.length === 0) {
      reset(true);
    } else { // 다 안찼으면
      if(turn === 'X') {
        turn = 'O';
      }
      setTimeout(function () { // opponent turn
        var selectedCell = possibleEmptyCell[Math.floor(Math.random() * possibleEmptyCell.length)];
        selectedCell.textContent = turn;

        // 컴퓨터가 승리했는지 체크
        var row = rows.indexOf(selectedCell.parentNode);
        var col = cols[row].indexOf(selectedCell);
        var gameEnd = resultCheck(row, col);

        // 다 찼으면
        if(gameEnd) {
          console.log(turn + ' Win!');
          result.textContent = turn + ' Win!';
          reset();
        } else {
          // turn을 나한테 넘긴다
          turn = 'X';
        }
      }, 1000);
    }
  }
};

for(var i=0; i<3; i++)
{
  var r = document.createElement('tr');
  rows.push(r);
  cols.push([]);
  for(var j=0; j<3; j++)
  {
    var c = document.createElement('td');
    c.addEventListener('click', whenClick);
    cols[i].push(c);
    r.appendChild(c);
  }
  table.appendChild(r);
}

body.appendChild(table);
