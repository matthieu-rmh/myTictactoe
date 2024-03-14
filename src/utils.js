export  function isPlayerWinning(squareId, currentPlayerCombination, winningCombinations){
    let isWinning = false;

    // filter in all winning combinations having squareId in it
    let targetedCombinations = winningCombinations.filter(combination =>
        combination.includes(squareId));

    /* check if each of the value of the targeted combinations is 
    included inside the list of the squares the player has already clicked
    */

    for (let i=0; i<targetedCombinations.length; i++){
        
        for (let o=0; o< targetedCombinations[i].length;o++){
            /* Check each number in the combination if it is already clicked
            If not, move on to the next combination */
            if(!currentPlayerCombination.includes(targetedCombinations[i][o])){
                break;
            }else if(o == (targetedCombinations[i].length - 1)){
                return true;
            }
        }

    }

    return isWinning;
}
