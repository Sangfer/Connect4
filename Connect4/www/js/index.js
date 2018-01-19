var turn=0;
var tokenWhite='<img src="../img/token_white.png" style="width:50px; height:auto;">';
var tokenRed='<img src="../img/token_red.png" style="width:50px; height:auto;">';
var tokenYellow='<img src="../img/token_yellow.png" style="width:50px; height:auto;">';

var counterRedHorizontal =0;
var counterRedVertical = 0;
var counterYellowHorizontal =0;
var counterYellowVertical = 0;

var scoreYellow = 0;
var scoreRed = 0;


var initGame = function () {
    $('.scoreYellow').html('Yellow '+scoreYellow);
    $('.scoreRed').html('Red '+scoreRed);
    $('.turn').html('Yellow\'s turn to play:').css('color', 'yellow');
    // $('.myTable tr').each(function() {
    //     $.each(this.cells, function(){
    //         $(this).css('background-color', 'white');
    //
    //     });
    // });
};


var resetGame = function() {
    for (var col = 1; col < 8; col++) {
        for (var row = 5; row >= 0; row--) {
            $('.myTable tr:nth-child(' + row + ') td:nth-child(' + col + ')').html(tokenWhite);
        }
    }
    counterRedHorizontal=0;
    counterRedVertical=0;
    counterYellowHorizontal=0;
    counterYellowVertical=0;
    $('.turn').html('Yellow\'s turn to play:').css('color', 'yellow');
};


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


var checkIfGameIsNull = function() {
    var x;
    for(var col = 1; col <8; col++){
        if( $('.myTable tr:nth-child(1) td:nth-child('+col+')').html()==tokenWhite){
            x=0;
            return x;
        } else {
            x=-1;
        }
    }
    return x;
};


var checkIfColumnIsWinning = function(){

    for(var col = 1; col <8; col++){
        for(var row =5; row >= 0; row--){
            if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenWhite){
                counterRedVertical=0;
                counterYellowVertical=0;
            }
            if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenRed){
                counterRedVertical++;
                counterYellowVertical=0;
            }
            if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenYellow){
                counterRedVertical=0;
                counterYellowVertical++;
            }
            if(counterRedVertical==4){
                return 2;
            }
            if(counterYellowVertical==4){
                return 1;
            }
        }

    }
    return 0;
};



var checkIfRowIsWinning = function(){

    for(var row =5; row >= 0; row--){
        for(var col = 1; col <8; col++){
            if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenWhite){
                counterRedHorizontal=0;
                counterYellowHorizontal=0;
            }
            if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenRed){
                counterRedHorizontal++;
                counterYellowHorizontal=0;
            }
            if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenYellow){
                counterRedHorizontal=0;
                counterYellowHorizontal++;
            }
            if(counterRedHorizontal==4){
                counterYellowHorizontal=0;
                counterRedVertical=0;
                return 2;
            }
            if(counterYellowHorizontal==4){
                counterYellowHorizontal=0;
                counterRedVertical=0;
                return 1;
            }
        }
        counterYellowHorizontal=0;
        counterRedVertical=0;
    }
    return 0;
};



$('.myTable tr td').on("click",function() {
    turn++;
    var col=$(this).closest("td").index();
    var col=col+1;
    for(var row = 6; row >= 1; row--){
        if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenWhite) {
            if(turn%2==0){
                $('.turn').html('Yellow\'s turn to play:').css('color', 'yellow');
                $('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html(tokenRed);
                checkForEndOfTheGame();
                break;
            } else {
                $('.turn').html('Red\'s turn to play:').css('color', 'red');
                $('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html(tokenYellow);
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
