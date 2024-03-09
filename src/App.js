import { useState } from 'react';

// The whole TicTacToe board
export default function TicBoard(){
  // Instantiate the number of rows and squares on a single row
  let rowsNumber = 3;
  let squaresNumber = 3;

  // Instantiate the values of each square as state
  const [squareValues, setSquares] = useState(Array((rowsNumber * squaresNumber)).fill(null));

  // Turn of X or O
  const [isXTurn, setIsXTurn] = useState(true);

  // Lifted the click handler on each square to board component
  /*
  Use of the function : 
  if empty and X turn, fill the square with 'X',
  if empty and NOT X turn, fill the square with 'O' 
  */
  function squareClick(squareId){
    console.log(squareId);
    if ((squareValues[squareId] == null) && isXTurn) {
      const newSquareValues = squareValues.slice();
      newSquareValues[squareId] = 'X';

      // Update the square values state and gives turn to 'O'
      setSquares(newSquareValues);
      setIsXTurn(false);

    }else if((squareValues[squareId] == null) && !isXTurn){
      const newSquareValues = squareValues.slice();
      newSquareValues[squareId] = 'O';

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
