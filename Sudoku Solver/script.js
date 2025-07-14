// Array copy with no reference
Array.prototype.copyNoRef = function () {
  return JSON.parse(JSON.stringify(this));
}

// Delete similar values
Array.prototype.differ = function (arr) {
  return this.filter(x => arr.includes(x) == false);
}

// Remove repeated values from the same Array
Array.prototype.unique = function () {
  return this.filter((x, i, arr) => arr.slice(i+1).includes(x) == false)
}


function processNumsArr(arr = []) {
  return arr.flat().filter(val => val !== 0);
}


function getSquareNums(board, row, col) {
  let nums = [];

  for (i=0; i <= 2; i++) {
    let chunck = board[ (row * 3) + i ].slice( col * 3, (col * 3) + 3 ); 
    nums.push(chunck);
  };
  
  return processNumsArr(nums);
}

function getRowNums(board, pos_y) {
  let boardCopy = board.copyNoRef();
  let nums = boardCopy[pos_y];
  
  return processNumsArr(nums);
}

function getColumnNums(board, pos_x) {
  let boardCopy = board.copyNoRef();
  let nums = boardCopy.map(x => x[pos_x]);

  return processNumsArr(nums);
}


function solve(puzzle) {

  let board =  puzzle.copyNoRef();
  
  function process() {
    let blank = 0;
    for (y=0; y<9; y++) {
      let chunck = puzzle[y];
      for (x=0; x<9; x++) {
        if (chunck[x] === 0 || Array.isArray(board[y][x])) {
          
          let square = getSquareNums(puzzle, Math.floor(y/3), Math.floor(x/3));
          let row = getRowNums(puzzle, y);
          let col = getColumnNums(puzzle, x);
          let nums = [...square, ...col, ...row].unique();
          let odds = [1,2,3,4,5,6,7,8,9].differ(nums);
          
          if (odds.length == 1) {
            board[y][x] = odds[0];
            puzzle[y][x] = odds[0];
          } else {
            board[y][x] = odds;
            blank++;
          }
        }
      }
    }
    
    if (blank === 0) {
      return true;
    } else {
      process();
    }

  }
    
  process();

  return puzzle;
}
