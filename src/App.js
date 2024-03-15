import { useState } from 'react';
import { isPlayerWinning } from './utils'; 

 


// The whole TicTacToe board
export default function TicBoard(){
  // Instantiate the number of rows and squares on a single row
  let rowsNumber = 3;
  let squaresNumber = 3;
  

  
  // The winner display
  const [winnerDisplay, setWinnerDisplay] = useState(""); 

  const [buttonsDisabled, setButtonsDisabled] = useState(false); 

  // Wether to show the reset button or not 
  const [showResetButton, setShowResetButton] = useState(false); 


  // Instantiate the values of each square as state
  const [squareValues, setSquares] = useState(Array((rowsNumber * squaresNumber)).fill(null));

  // Squares indexes list
  let squareIndexesList = squareValues.slice();
  for (let il=0; il<squareIndexesList.length;il++){
    squareIndexesList[il] = il;
  }


  // List of winning horizontal combinations
  let horizontalCombinations = new Array();
  
  let tempHorizontalCombination = new Array();

  for(let i=0; i<squareIndexesList.length; i++){
    tempHorizontalCombination.push(squareIndexesList[i]);
    if((i+1) % squaresNumber == 0){
      horizontalCombinations.push(tempHorizontalCombination.slice());
      tempHorizontalCombination.length = 0;
    }
  }

  // List of winning vertical combinations
  let verticalCombinations = new Array();

  let horizontalCombinationsCopy = horizontalCombinations.slice();

  let tempVerticalCombinations = new Array();

  for (let i=0; i<squaresNumber; i++){
    for (let j=0; j < rowsNumber; j++){
      tempVerticalCombinations.push(horizontalCombinationsCopy[j][i]);
    }
    verticalCombinations.push(tempVerticalCombinations.slice());
    tempVerticalCombinations.length = 0;
  }

  // Turn of X or O
  const [isXTurn, setIsXTurn] = useState(true);

  // Checked squares for each player
  const [xCheckedSquares, setXCheckedSquares] = useState(Array(0));
  const [oCheckedSquares, setOCheckedSquares] = useState(Array(0));


  let rowsArray = Array(rowsNumber);
  for (let i = 0; i < rowsArray.length; i++) {
    rowsArray[i] = <TicRow key={i} squaresNumber={squaresNumber} rowId={i} squareClick={squareClick} squareValues={squareValues} buttonsDisabled={buttonsDisabled}/>;
  }

  // List first diagonal winning combination
  let firstDiagonalCombination = new Array();
  let fDiagSqCounter = 0;
  for (let i=0; i<horizontalCombinations.length; i++){
    firstDiagonalCombination.push(horizontalCombinations[i][fDiagSqCounter]);

    if(fDiagSqCounter < squaresNumber){
      fDiagSqCounter++;
    }
  }

  // List second diagonal winning combination
  let secondDiagonalCombination = new Array();
  let sDiagSqCounter = squaresNumber-1;
  for (let i=0; i<horizontalCombinations.length; i++){
    secondDiagonalCombination.push(horizontalCombinations[i][sDiagSqCounter]);

    if (sDiagSqCounter>0){
      sDiagSqCounter--;
    }
  }

  // Combine both diagonal combinations
  let diagonalCombinations = new Array();
  diagonalCombinations.push(...[firstDiagonalCombination.slice(), secondDiagonalCombination.slice()]);

  // Combine all winning combinations
  let winningCombinations = new Array();
  
  for(let i=0; i<diagonalCombinations.length; i++){
    winningCombinations.push(diagonalCombinations[i].slice());
  }

  for(let i=0; i<horizontalCombinations.length; i++){
    winningCombinations.push(horizontalCombinations[i].slice());
  }

  for(let i=0; i<verticalCombinations.length; i++){
    winningCombinations.push(verticalCombinations[i].slice());
  }

  // Resets all states
  function resetGame(rowsNb, squaresNb){
    setWinnerDisplay("");
    setButtonsDisabled(false);
    setSquares(Array((rowsNb * squaresNb)).fill(null));
    setXCheckedSquares(new Array(0));
    setOCheckedSquares(new Array(0));
    setShowResetButton(false);
  }

   // Lifted the click handler on each square to board component
  /*
  Use of the function : 
  if empty and X turn, fill the square with 'X',
  if empty and NOT X turn, fill the square with 'O' 
  */
  function squareClick(squareId){
    if ((squareValues[squareId] == null) && isXTurn) {
      const newSquareValues = squareValues.slice();
      newSquareValues[squareId] = 'X';

      // Push the 'X' player checked squares counter by the Id of the Square
      let currentXCheckedSquares = xCheckedSquares.slice();
      currentXCheckedSquares.push(squareId);
      setXCheckedSquares(currentXCheckedSquares);

      // Update the square values state and gives turn to 'O'
      setSquares(newSquareValues);
      setIsXTurn(false);

      // Check if X won
      let isXwinning = isPlayerWinning(squareId, currentXCheckedSquares, winningCombinations);
      if (isXwinning){
        setWinnerDisplay("X WON");
        setButtonsDisabled(true);
        setShowResetButton(true);
      }

    }else if((squareValues[squareId] == null) && !isXTurn){
      const newSquareValues = squareValues.slice();
      newSquareValues[squareId] = 'O';

      // Push the 'O' player checked squares counter by the Id of the Square
      let currentOCheckedSquares = oCheckedSquares.slice();
      currentOCheckedSquares.push(squareId);
      setOCheckedSquares(currentOCheckedSquares);

      // Update the square values state and gives turn back to 'X'
      setSquares(newSquareValues);
      setIsXTurn(true);

       // Check if O won
       let isOwinning = isPlayerWinning(squareId, currentOCheckedSquares, winningCombinations);
       if (isOwinning){
         setWinnerDisplay("O WON");
         setButtonsDisabled(true);
         setShowResetButton(true);
       }
    }
  }


  return(
    <>
    <b style={{fontSize: 50 +'px'}}>{winnerDisplay}</b>
      {rowsArray}
      <ResetButton resetGame={resetGame} showResetButton={showResetButton} rowsNb={rowsNumber} squaresNb={squaresNumber}/>
      <p className="log-text">Horizontal combinations : {horizontalCombinations}</p>
      <p className="log-text">Vertical combinations : {verticalCombinations}</p>
      <p className="log-text">Square values : {squareIndexesList}</p>
      <p className="log-text">X counts : {xCheckedSquares}</p>
      <p className="log-text">O counts : {oCheckedSquares}</p>
      <p className="log-text">First diagonal Combination : {firstDiagonalCombination}</p>
      <p className="log-text">Second diagonal Combination : {secondDiagonalCombination}</p>
    </>
  );
}

// Row component of the board
function TicRow({key, squaresNumber, rowId, squareClick, squareValues, buttonsDisabled}){
  let rowSquares = Array(squaresNumber);

  for (let i=0; i < rowSquares.length; i++){
    let squarePosition = (rowId * squaresNumber) + i;
    rowSquares[i] = <Square key={squarePosition} squareId={squarePosition} squareClick={squareClick} squareValue={squareValues[squarePosition]} buttonsDisabled={buttonsDisabled}/>;
  };

  return(
      <div className="board-row">
        {rowSquares}
      </div>
  );
}

// Component of a single square
function Square({key, squareId, squareClick, squareValue, buttonsDisabled}) {
  return (
        <button className="square" disabled={buttonsDisabled} onClick={() => squareClick(squareId)}>{squareValue}</button>
    );
}

// Reset button component
function ResetButton({resetGame, showResetButton, rowsNb, squaresNb}){
  
  let resetButtonDisplay = showResetButton ? {display: "block"} : {display: "none"}; 

  return(
    <button className="reset-btn" onClick={() => resetGame(rowsNb, squaresNb)} style={resetButtonDisplay}>Reset game</button>
  );
}
