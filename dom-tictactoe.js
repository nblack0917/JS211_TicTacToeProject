let currentMarker = 'X'
let board = [["","",""], ["","",""], ["","",""]]
let gameOver = false;
let move = false;

// this function places an X marker when the user clicks on a space
const handleClick = (element) => {
  // console.log(`The element you clicked on has an id:  ${element.id}`)

  if(!document.getElementById(element.id).innerHTML){
    addMarker(element.id)
    move = false;
    setTimeout(function() {
      computerMove()
    }, 500)
  }
}


// this function calls the computer move after the user plays
const computerMove = () => {
  if (gameOver === false) {
    computerStrategy();
    // computerStrategyRow();
    // computerStrategyCol();
    while (move === false) {
      let row = Math.floor(Math.random()*3);
      let col = Math.floor(Math.random()*3);
      if (board[row][col] === "") {
        addMarker(row + "-" + col);
        move = true;
      }
    }
  }
}

// this function places the "currentMarker" inside the HTML element that was clicked and calls the "changeMarker" function.
const addMarker = (id) => {
  // console.log(`*** The current marker is:  ${currentMarker}. ***`)
  // console.log(`Therefore, a  "${currentMarker}"  should be placed in the square with the id:  ${id}`)
  document.getElementById(id).innerHTML = currentMarker;
  const row = parseInt(id.charAt(0));
  const column = parseInt(id.charAt(2));


  board[row][column] = currentMarker;

  setTimeout(function() {
    checkForWin();
    }, 300)
}

// This "changeMarker" function changes "X" to "O" in the "currentMarker" variable or "O" to "X"
const changeMarker = () => {
  if(currentMarker === "X"){
    currentMarker = "O"
    } else {
    currentMarker = "X"
  }
}

// This "resetBoard" function is called when the user clicks on the "Restart" button.
const resetBoard = () => {
    const squares = document.getElementsByTagName("TD");
  // loops over the HTML Collection of TDs and clears out the Xs and Os
  for (i=0; i < squares.length; i++) {
    // will log out the id of each square as it loops over them.
    console.log(squares[i].id)
    // sets the innerHTML to null to replace the "X" or "O"
    squares[i].innerHTML = null
    document.getElementById('winner').innerHTML = null
    board = [["","",""], ["","",""], ["","",""]];
    gameOver = false;
  }
  currentMarker = "X"
}

//determine if there is a tie
const checkForTie = () => {
  let tie = true;
  for (let i = 0; i < 3; i++) {
    for (let x = 0; x < 3; x++) {
      // console.log(board[i][x])
      if (board[i][x] == "") {
        tie = false;
        // console.log(board[i][x], i, x)
      }
    }
  } 
  // console.log({tie})
  if (tie) {
    window.alert(`It's a Tie!`)
    winner.innerHTML = "It's a Tie! Try again."
    gameOver = true;
  }
}

//determine if there is a winner
const checkForWin = () => {
  let winner = document.getElementById('winner');
  if(horizontalWin() || verticalWin() || diagonalWin()) {
    window.alert(`Player ${currentMarker} won!`);
    gameOver = true;
  } else {
    changeMarker()
    checkForTie();
  }
}


//old function
// const horizontalWin = () => {
//   if(board[0][0] == currentMarker && board[0][1] == currentMarker && board[0][2] == currentMarker) {
//     winner.innerHTML = currentMarker + " wins in first row"
//     return true
//   } else if (board[1][0] == currentMarker && board[1][1] == currentMarker && board[1][2] == currentMarker){
//     winner.innerHTML = currentMarker + " wins in second row"
//     return true
//   } else if (board[2][0] == currentMarker && board[2][1] == currentMarker && board[2][2] == currentMarker){
//     winner.innerHTML = currentMarker + " wins in third row"
//     return true
//   }
// }

//new function
const horizontalWin = () => {
  let rowName = ["first","second","third"]
  for (let i = 0; i < 3; i++) {
    if(board[i][0] == currentMarker && board[i][1] == currentMarker && board[i][2] == currentMarker) {
      winner.innerHTML = `${currentMarker} wins in ${rowName[i]} row`
      return true
    }
  }
}

//new function
const verticalWin = () => {
  let colName = ["first","second","third"]
  for (let i = 0; i < 3; i++) {
    if(board[0][i] == currentMarker && board[1][i] == currentMarker && board[2][i] == currentMarker) {
      winner.innerHTML = `${currentMarker} wins in ${colName[i]} column`
      return true
    }
  }
}

//Old function
// const verticalWin = () => {
//   if (board[0][0] == currentMarker && board[1][0] == currentMarker && board[2][0] == currentMarker){
//     winner.innerHTML = currentMarker + " wins in first column"
//     return true
//   } else if (board[0][1] == currentMarker && board[1][1] == currentMarker && board[2][1] == currentMarker){
//     winner.innerHTML = currentMarker + " wins in second column"
//     return true
//   } else if (board[0][2] == currentMarker && board[1][2] == currentMarker && board[2][2] == currentMarker){
//     winner.innerHTML = currentMarker + " wins in third column"
//     return true
//   }
// }

const diagonalWin = () => {
  if (board[0][0] == currentMarker && board[1][1] == currentMarker && board[2][2] == currentMarker){
    winner.innerHTML = currentMarker + " wins in right diagnal"
    return true
  } else if (board[0][2] == currentMarker && board[1][1] == currentMarker && board[2][0] == currentMarker){
    winner.innerHTML = currentMarker + " wins in left diagnal"
    return true
  }
}

// const computerStrategyRow = () => {
//   if (move === false) {
//     let rowOfX = 0;
//     for(let i = 0; i < 3; i++) {
//       if ((board[i][0] === "X" && board[i][1] ==="X") || (board[i][1] === "X" && board[i][2] ==="X") || (board[i][0] === "X" && board[i][2] === "X")) {
//         rowOfX = i;
//         for(let x = 0; x < 3; x++) {
//         let row = rowOfX;
//         if (board[row][x] === "") {
//           addMarker(row + "-" + x);
//           move = true;
//           }
//         }
//       }
//     }
//   }  
// }

// const computerStrategyCol = () => {
//   if (move === false) {
//     let colOfX = 0;
//     for(let i = 0; i < 3; i++) {
//       if ((board[0][i] === "X" && board[1][i] ==="X") || (board[1][i] === "X" && board[2][i] ==="X") || (board[0][i] === "X" && board[2][i] ==="X")) {
//         colOfX = i;
//         for(let x = 0; x < 3; x++) {
//         let col = colOfX;
//         if (board[x][col] === "") {
//           addMarker(x + "-" + col);
//           move = true;
//           }
//         }
//       }
//     }
//   }  
// }

const computerStrategy = () => {
  // Winning move for columns
  if (move === false) {
    let colOfX = 0;
    for(let i = 0; i < 3; i++) {
      if ((board[0][i] === "O" && board[1][i] ==="O") || (board[1][i] === "O" && board[2][i] ==="O") || (board[0][i] === "O" && board[2][i] ==="O")) {
        colOfX = i;
        for(let x = 0; x < 3; x++) {
        let col = colOfX;
        if (board[x][col] === "") {
          addMarker(x + "-" + col);
          move = true;
          }
        }
      }
    }
  }  
  //Winning move for Rows
  if (move === false) {
    let rowOfX = 0;
    for(let i = 0; i < 3; i++) {
      if ((board[i][0] === "O" && board[i][1] ==="O") || (board[i][1] === "O" && board[i][2] ==="O") || (board[i][0] === "O" && board[i][2] === "O")) {
        rowOfX = i;
        for(let x = 0; x < 3; x++) {
        let row = rowOfX;
        if (board[row][x] === "") {
          addMarker(row + "-" + x);
          move = true;
          }
        }
      }
    }
  }  
  //Winning move for diagnals
    if (move === false) {
    if ((board[0][0] === "O" && board[1][1] ==="O") || (board[1][1] === "O" && board[2][2] ==="O") || (board[0][0] === "O" && board[2][2] ==="O")) {
      for (let i = 0; i < 3; i++) {
        if (board[i][i] === "") {
          addMarker(i + "-" + i);
          move = true;
         }
      }
    } else if ((board[2][0] === "O" && board[1][1] ==="O") || (board[1][1] === "O" && board[0][2] ==="O") || (board[2][0] === "O" && board[0][2] ==="O")) {
          let y = 2;
          for (let i = 0; i < 3; i++) {
            if (board[y][i] === "") {
            addMarker(y + "-" + i);
            move = true;
              console.log("gotcha")
          }
          y = y - 1;
        }
       }
      }
  //Blocking move for Columns
  if (move === false) {
    let colOfX = 0;
    for(let i = 0; i < 3; i++) {
      if ((board[0][i] === "X" && board[1][i] ==="X") || (board[1][i] === "X" && board[2][i] ==="X") || (board[0][i] === "X" && board[2][i] ==="X")) {
        colOfX = i;
        for(let x = 0; x < 3; x++) {
        let col = colOfX;
        if (board[x][col] === "") {
          addMarker(x + "-" + col);
          move = true;
          }
        }
      }
    }
  }  
  //Blocking move for Rows
  if (move === false) {
    let rowOfX = 0;
    for(let i = 0; i < 3; i++) {
      if ((board[i][0] === "X" && board[i][1] ==="X") || (board[i][1] === "X" && board[i][2] ==="X") || (board[i][0] === "X" && board[i][2] === "X")) {
        rowOfX = i;
        for(let x = 0; x < 3; x++) {
        let row = rowOfX;
        if (board[row][x] === "") {
          addMarker(row + "-" + x);
          move = true;
          }
        }
      }
    }
  }  
  //Blocking move for diagnals
  if (move === false) {
    if ((board[0][0] === "X" && board[1][1] ==="X") || (board[1][1] === "X" && board[2][2] ==="X") || (board[0][0] === "X" && board[2][2] ==="X")) {
      for (let i = 0; i < 3; i++) {
        if (board[i][i] === "") {
          addMarker(i + "-" + i);
          move = true;
         }
      }
    } else if ((board[2][0] === "X" && board[1][1] ==="X") || (board[1][1] === "X" && board[0][2] ==="X") || (board[2][0] === "X" && board[0][2] ==="X")) {
          let y = 2;
          for (let i = 0; i < 3; i++) {
            if (board[y][i] === "") {
            addMarker(y + "-" + i);
            move = true;
          }
          y = y - 1;
        }
       }
      }
    }
