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
    counterRedHorizontal=0;
    counterRedVertical=0;
    counterYellowHorizontal=0;
    counterYellowVertical=0;
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
                counterRedVertical=0;
                counterYellowVertical=0;
                //If there's a white token, then means that the previous combo is broken
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
            }
            if(counterRedVertical==4){
                //means win of Red by columns
                return 2;
            }
            if(counterYellowVertical==4){
                //means win of Yellow by columns
                return 1;
            }
        }
        //Reset the counter for Yellow and Red Columns in order not to outreach on others columns.
        counterYellowVertical=0;
        counterRedVertical=0;
    }
    return 0;
};



var checkIfRowIsWinning = function(){

    for(var row =6; row >= 1; row--){
        for(var col = 1; col <8; col++){
            if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenWhite){
                //If there's a white token, then means that the previous combo is broken
                counterRedHorizontal=0;
                counterYellowHorizontal=0;
            }
            if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenRed){
                //If there's a red, then red put a token out of 4, so we increment the counter of red
                //and reset yellow's one to 0.
                counterRedHorizontal++;
                counterYellowHorizontal=0;
            }
            if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenYellow){
                //If there's a yellow, then yellow put a token out of 4, so we increment the counter of yellow
                //and reset red's one to 0.
                counterRedHorizontal=0;
                counterYellowHorizontal++;
            }
            if(counterRedHorizontal==4){
                //means win of Red by rows
                return 2;
            }
            if(counterYellowHorizontal==4){
                //means win of Yellow by rows
                return 1;
            }
        }
        //Reset the counter for Yellow and Red Columns in order not to outreach on others columns.
        counterYellowHorizontal=0;
        counterRedVertical=0;
    }
    return 0;
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
