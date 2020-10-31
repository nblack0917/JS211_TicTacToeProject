'use strict';

// brings in the assert module for unit testing
const assert = require('assert');
// brings in the readline module to access the command line
const readline = require('readline');
// use the readline module to print out to the command line
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// creates and empty "board" for the user to see where marks can be placed.
// using let because the variable is expected to change with more 'X's and 'O's to add
let board = [
  [' ', ' ', ' '],
  [' ', ' ', ' '],
  [' ', ' ', ' ']
];

// assigns the first mark as 'X'
// using let because the variable is expected to change from 'X' to 'O' and back
let currentMarker = 'X';

// is a function that print the current status of the board using the variable - board
const printBoard = () => {
  console.log('   0  1  2');
  console.log('0 ' + board[0].join(' | '));
  console.log('  ---------');
  console.log('1 ' + board[1].join(' | '));
  console.log('  ---------');
  console.log('2 ' + board[2].join(' | '));
}

const resetBoard = () => {
  console.log("Let's play again")
  currentMarker = "X"
  board = [[" "," "," "], [" "," "," "], [" "," "," "]]
}  

const changeMarker = () => {
  if(currentMarker === "X"){
    currentMarker = "O"
    } else {
    currentMarker = "X"
  }
}

const horizontalWin = () => {
  if(board[0][0] == currentMarker && board[0][1] == currentMarker && board[0][2] == currentMarker) {
    console.log(currentMarker + " wins in first row")
    return true
  } else if (board[1][0] == currentMarker && board[1][1] == currentMarker && board[1][2] == currentMarker){
    console.log(currentMarker + " wins in second row")
    return true
  } else if (board[2][0] == currentMarker && board[2][1] == currentMarker && board[2][2] == currentMarker){
    console.log(currentMarker + " wins in third row")
    return true
  }
}

const verticalWin = () => {
  if (board[0][0] == currentMarker && board[1][0] == currentMarker && board[2][0] == currentMarker){
    console.log(currentMarker + " wins in first column")
    return true
  } else if (board[0][1] == currentMarker && board[1][1] == currentMarker && board[2][1] == currentMarker){
    console.log(currentMarker + " wins in second column")
    return true
  } else if (board[0][2] == currentMarker && board[1][2] == currentMarker && board[2][2] == currentMarker){
    console.log(currentMarker + " wins in third column")
    return true
  }
}

const diagonalWin = () => {
  if (board[0][0] == currentMarker && board[1][1] == currentMarker && board[2][2] == currentMarker){
    console.log(currentMarker + " wins in right diagnal")
    return true
  } else if (board[0][2] == currentMarker && board[1][1] == currentMarker && board[2][0] == currentMarker){
    console.log(currentMarker + " wins in left diagnal")
    return true
  }
  
}

const checkForTie = () => {
  let tie = true;
  for (let i = 0; i < 3; i++) {
    for (let x = 0; x < 3; x++) {
      // console.log(board[i][x])
      if (board[i][x] == " ") {
        tie = false;
        // console.log(board[i][x], i, x)
      }
    }
  } 
  // console.log({tie})
  if (tie) {
    console.log(`It's a Tie!`)
  }
}

const checkForWin = () => {
  if(horizontalWin() || verticalWin() || diagonalWin()) {
    console.log(`Player ${currentMarker} won!`)
    resetBoard();
    return true;
  } else {
    changeMarker()
    checkForTie();
  }
}

const ticTacToe = (row, column) => {
  board[row][column] = currentMarker;
  checkForWin();
}

const getPrompt = () => {
  printBoard();
  console.log("It's Player " + currentMarker + "'s turn.");
  rl.question('row: ', (row) => {
    rl.question('column: ', (column) => {
      ticTacToe(row, column);
      getPrompt();
    });
  });
}


// Unit Tests
// You use them run the command: npm test main.js
// to close them ctrl + C
if (typeof describe === 'function') {

  describe('#ticTacToe()', () => {
    it('should place mark on the board', () => {
      ticTacToe(1, 1);
      assert.deepEqual(board, [ [' ', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should alternate between players', () => {
      ticTacToe(0, 0);
      assert.deepEqual(board, [ ['O', ' ', ' '], [' ', 'X', ' '], [' ', ' ', ' '] ]);
    });
    it('should check for vertical wins', () => {
      board = [ [' ', 'X', ' '], [' ', 'X', ' '], [' ', 'X', ' '] ];
      assert.equal(verticalWin(), true);
    });
    it('should check for horizontal wins', () => {
      board = [ ['X', 'X', 'X'], [' ', ' ', ' '], [' ', ' ', ' '] ];
      assert.equal(horizontalWin(), true);
    });
    it('should check for diagonal wins', () => {
      board = [ ['X', ' ', ' '], [' ', 'X', ' '], [' ', ' ', 'X'] ];
      assert.equal(diagonalWin(), true);
    });
    it('should detect a win', () => {
      ticTacToe(0, 0)
      ticTacToe(0, 1)
      ticTacToe(1, 1)
      ticTacToe(0, 2)
      ticTacToe(2, 2)
      assert.equal(checkForWin(), true);
    });
  });
} else {

  getPrompt();

}
