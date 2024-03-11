import { useState } from 'react';

// The whole TicTacToe board
export default function TicBoard(){
  // Instantiate the number of rows and squares on a single row
  let rowsNumber = 3;
  let squaresNumber = 4;

  // Instantiate the values of each square as state
  const [squareValues, setSquares] = useState(Array((rowsNumber * squaresNumber)).fill(null));

  // Squares indexes list
  let squareIndexesList = squareValues.slice();
  for (let il=0; il<squareIndexesList.length;il++){
    squareIndexesList[il] = il;
  }


  // List of winning horizontal combinations
  let horizontalCombinations = new Array();
  
  let tempCombination = new Array();

  for(let i=0; i<squareIndexesList.length; i++){
    tempCombination.push(squareIndexesList[i]);
    if((i+1) % squaresNumber == 0){
      horizontalCombinations.push(tempCombination.slice());
      tempCombination.length = 0;
    }
  }

  

  // Turn of X or O
  const [isXTurn, setIsXTurn] = useState(true);

  // Checked squares for each player
  const [xCheckedSquares, setXCheckedSquares] = useState(Array(0));
  const [oCheckedSquares, setOCheckedSquares] = useState(Array(0));



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
    }
  }

  let rowsArray = Array(rowsNumber);
  for (let i = 0; i < rowsArray.length; i++) {
    rowsArray[i] = <TicRow squaresNumber={squaresNumber} rowId={i} squareClick={squareClick} squareValues={squareValues}/>;
  }


  return(
    <>
      {rowsArray}
      <p>Horizontal combinations : {horizontalCombinations}</p>
      <p>Square values : {squareIndexesList}</p>
      <p>X counts : {xCheckedSquares}</p>
      <p>O counts : {oCheckedSquares}</p>
    </>
  );
}

// Row component of the board
function TicRow({squaresNumber, rowId, squareClick, squareValues}){
  let rowSquares = Array(squaresNumber);

  for (let i=0; i < rowSquares.length; i++){
    let squarePosition = (rowId * squaresNumber) + i;
    rowSquares[i] = <Square squareId={squarePosition} squareClick={squareClick} squareValue={squareValues[squarePosition]}/>;
  };

  return(
      <div className="board-row">
        {rowSquares}
      </div>
  );
}

// Component of a single square
function Square({squareId, squareClick, squareValue}) {

  return (
        <button className="square" onClick={() => squareClick(squareId)}>{squareValue}</button>
    );
}
