// The whole TicTacToe board
export default function TictactoePlayGround(){
  // Instantiate the number of rows and squares on a single row
  let rowsNumber = 3;
  let squaresNumber = 3;

  let rowsArray = Array(rowsNumber);
  for (let i = 0; i < rowsArray.length; i++) {
    rowsArray[i] = <TicRow squaresNumber={squaresNumber} rowId={i}/>;
  }

  return(
    <>
      {rowsArray}
    </>
  );
}

// Row component of the board
function TicRow({squaresNumber, rowId}){
  let rowSquares = Array(squaresNumber);

  for (let i=0; i < rowSquares.length; i++){
    let squarePosition = (rowId * squaresNumber) + (i+1);
    console.log(squarePosition);
    rowSquares[i] = <Square squareId={squarePosition}/>;
  };

  return(
    <>
      <div className="board-row">
        {rowSquares}
      </div>
    </>
  );
}

// Component of a single square
function Square({squareId}) {

  return (
      <>
        <button className="square">{squareId}</button>
      </>
    );
}
