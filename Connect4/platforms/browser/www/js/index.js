var turn=0;
var tokenWhite='<img src="../img/token_white.png" class="myCell">';
var tokenRed='<img src="../img/token_red.png" class="myCell">';
var tokenYellow='<img src="../img/token_yellow.png" class="myCell">';

var counterRedHorizontal =0;
var counterRedVertical = 0;
var counterYellowHorizontal =0;
var counterYellowVertical = 0;
var scoreYellow = 0;
var scoreRed = 0;
var counterDiag=0;
var winnerRow=0;
var winnerCol=0;
var resultDiagoL=0;


/***
 * Is Called when the app is launched
 * Set the score for Yellow and Red and give Yellow's the first move
 */
var initGame = function () {
    $('.scoreYellow').html('Yellow '+scoreYellow);
    $('.scoreRed').html('Red '+scoreRed);
    $('.turn').html('Yellow\'s turn to play:').css('color', 'yellow');
};

/**
 * Reset the game to the Original step. Turn all cells into blank, and save the score.
 */
var resetGame = function() {
    for (var col = 1; col < 8; col++) {
        for (var row = 6; row >= 1; row--) {
            $('.myTable tr:nth-child(' + row + ') td:nth-child(' + col + ')').html(tokenWhite);
        }
    }
    counterRedHorizontal =0;
    counterRedVertical = 0;
    counterYellowHorizontal =0;
    counterYellowVertical = 0;
    counterDiag=0;
    winnerRow=0;
    winnerCol=0;
    resultDiagoL=0;
    turn=0;

    $('.turn').html('Yellow\'s turn to play:').css('color', 'yellow');
};

/**Check if the game is over. Means multiple things as the function's name suggest:
 * - if the game is a draw
 * - if yellow wins with rows or cells
 * - if red wins with rows or cell.
 * Upgrade the score and reset the game.
 */

var checkForEndOfTheGame = function(){

    if (checkIfGameIsNull()==-1){
        alert('Draw Match');
        resetGame();
    }
    if(checkIfRowIsWinning()==2){
        alert("Red wins with rows");
        resetGame();
        scoreRed++;
        $('.scoreRed').html('Red '+scoreRed);

    }
    if(checkIfRowIsWinning()==1){
        alert("Yellow wins with rows");
        resetGame();
        scoreYellow++;
        $('.scoreYellow').html('Yellow '+scoreYellow);
    }
    if(checkIfColumnIsWinning()==2){
        alert("Red wins with columns");
        resetGame();
        scoreRed++;
        $('.scoreRed').html('Red '+scoreRed);

    }

    if(checkIfColumnIsWinning()==1){
        alert("Yellow wins with columns");
        resetGame();
        scoreYellow++;
        $('.scoreYellow').html('Yellow '+scoreYellow);

    }

    if(checkIfDiagonalIsWinning(2, tokenRed, counterDiag)==2){
        alert("Red wins with diagonal");
        resetGame();
        scoreRed++;
        $('.scoreYellow').html('Red '+scoreRed);
    }


    if(checkIfDiagonalIsWinning(1, tokenYellow, counterDiag)==1){
        alert("Yellow wins with diagonal");
        resetGame();
        scoreYellow++;
        $('.scoreYellow').html('Yellow '+scoreYellow);
    }
};


/**
 * This function is checking if 4 tokens with the same colors are aligned on a diag
 *
 * @param identifierColor the function is generic, it allows to remember which color is asking for the verification
 * @param token for changing the color of the token
 * @param counter number for knowing if 4 tokens are aligned
 * @returns {number} 1 if yellow wins, 2 if it's red, 0 if nothing
 */
var checkIfDiagonalIsWinning = function(identifierColor, token, counter) {
    console.log(token+ ' '+ counter);
    for (var row = 6; row >= 1; row--) {
        for (var col = 1; col < 5; col++) {

            /**
             * The function below is called 4 times, cause we need to have 4 tokens aligned.
             * */
            //This for has a parameter 'Left' meaning diagonal from bottom left to top right
            for (i = 0; i < 3; ++i) {
                checkCellDependingOnRowColumn(row, col, token, counter, 'Left');
            }
            if (resultDiagoL==1) {
                if(identifierColor==1)
                    return 1;
                else return 2;
            }
        }
    }


    for (var row = 6; row >= 1; row--) {
        for (var col = 8; col > 4; col--) {
            /**
             * The function below is called 4 times, cause we need to have 4 tokens aligned.
             * */
            //This for has a parameter 'Right' meaning diagonal from bottom right  to top left.
            for (i = 0; i < 3; ++i) {
                checkCellDependingOnRowColumn(row, col, token, counter, 'Right');
            }
            if (resultDiagoL==1) {
                if(identifierColor==1)
                    return 1;
                else return 2;
            }
        }
    }
    return 0;
};


/**
 *This function is recursive. If it find a token from the good color, then it calls itself on the token
 * situated 1 row above and column left or right depending of the orientation. Everytime it match a token from the same color, the counter is incremented.
 * Else, it goes back to 0.
 *
 *
 * @param row the row number to check
 * @param column the column number to check
 * @param token the identifier for getting the color
 * @param counter the counter for knowing if 4 tokens are aligned
 * @returns {number}
 */
var checkCellDependingOnRowColumn = function(row, column, token, counter, orientation){
    tmprow=row-1;
    if (orientation == 'Left') tmpCol = column + 1;
    if (orientation == 'Right')tmpCol=  column - 1;

    if ($('.myTable tr:nth-child('+row+') td:nth-child('+column+')').html() == token) {
        counter++;
        if (counter == 4) {
            resultDiagoL=1;
            return 0;
        }
        checkCellDependingOnRowColumn(tmprow, tmpCol, token, counter, orientation);
    }
    else {
        counter=0;
        return -1;
    }
};





/**
 * Check if the game is a draw, means if the first row does not include blank tokens
 * @returns {*-1 if the game is a draw, else 0}
 */
var checkIfGameIsNull = function() {
    var x;
    for(var col = 1; col <8; col++){
        if( $('.myTable tr:nth-child(1) td:nth-child('+col+')').html()==tokenWhite){
            //Check for the top row if therer's a white token, means there's still one move minimum to be played.
            x=0;
            return x;
        } else {
            //Means the row is full of color, so the game is a draw
            x=-1;
        }
    }
    return x;
};

/**
 * Check Column by Column if there is a win, means:
 * If a token isn't white
 * If there's 4 successive token from a same color
 * @returns {number}
 */
var checkIfColumnIsWinning = function(){

    for(var col = 1; col <8; col++){
        for(var row =6; row >= 1; row--){
            if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenWhite){
                //If there's a white token, then means that the previous combo is broken
                counterRedVertical=0;
                counterYellowVertical=0;

            }
            if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenRed){
                //If there's a red, then red put a token out of 4, so we increment the counter of red
                //and reset yellow's one to 0.
                counterRedVertical++;
                counterYellowVertical=0;

            }
            if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenYellow){
                //If there's a yellow, then yellow put a token out of 4, so we increment the counter of yellow
                //and reset red's one to 0.
                counterRedVertical=0;
                counterYellowVertical++;
                // console.log("red: "+counterRedVertical);
                // console.log("yellow: "+counterYellowVertical);
            }
            if(counterRedVertical==4){
                winnerCol=2;
                //means win of Red by columns
            }
            if(counterYellowVertical==4){
                winnerCol=1;
                //means win of Yellow by columns
            }
        }
        //Reset the counter for Yellow and Red Columns in order not to outreach on others columns.
        counterYellowVertical=0;
        counterRedVertical=0;
    }
    return winnerCol;
};


var checkIfRowIsWinning = function(){

    for(var row =6; row >= 1; row--){
        console.log('Row: '+row);
        for(var col = 1; col <8; col++){
            if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenWhite){
                //If there's a white token, then means that the previous combo is broken
                counterRedHorizontal=0;
                counterYellowHorizontal=0;
                console.log("BLANC"+col);
                console.log("red: "+counterRedHorizontal);
                console.log("yellow: "+counterYellowHorizontal);
            }
            if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenRed){
                //If there's a red, then red put a token out of 4, so we increment the counter of red
                //and reset yellow's one to 0.
                counterRedHorizontal++;
                counterYellowHorizontal=0;
                console.log("RED"+col);
                console.log("red: "+counterRedHorizontal);
                console.log("yellow: "+counterYellowHorizontal);
            }
            if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenYellow){
                //If there's a yellow, then yellow put a token out of 4, so we increment the counter of yellow
                //and reset red's one to 0.
                counterRedHorizontal=0;
                counterYellowHorizontal++;
                console.log("YELLOW"+col);
                console.log("red: "+counterRedHorizontal);
                console.log("yellow: "+counterYellowHorizontal);
            }
            if(counterRedHorizontal==4){
                winnerRow=2;
                break;
                //means win of Red by columns
            }
            if(counterYellowHorizontal==4){
                winnerRow=1;
                break;
                //means win of Yellow by columns
            }
        }//Reset the counter for Yellow and Red Columns in order not to outreach on others columns.
        counterYellowHorizontal=0;
        counterRedHorizontal=0;
    }
    return winnerRow;
};



$('.myTable tr td').on("click",function() {
    var col=$(this).closest("td").index();
    var col=col+1;
    //Get the Columns number
    for(var row = 6; row >= 1; row--){
        //for each row beginning by the last one
        if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenWhite) {
            //if my token is White, then I can play, in the other case, we are going to the same column but on the row upper.
            turn++;
            if(turn%2==0){
                //Checker for knowing which turn it is to play.
                $('.turn').html('Yellow\'s turn to play:').css('color', 'yellow');
                //Set the token to red
                $('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html(tokenRed);
                //check for all possible results
                checkForEndOfTheGame();
                break;
            } else {
                $('.turn').html('Red\'s turn to play:').css('color', 'red');
                //set the token to yellow
                $('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html(tokenYellow);
                //check for all possible results
                checkForEndOfTheGame();
                break;
            }

        }
    }
});




var _deviceReadyCallback = function () {
    initGame();
};

document.addEventListener('deviceready', _deviceReadyCallback, false);
