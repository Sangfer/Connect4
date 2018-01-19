var tour=0;
var tokenWhite='<img src="../img/token_white.png" style="width:50px; height:auto;">';
var tokenRed='<img src="../img/token_red.png" style="width:50px; height:auto;">';
var tokenYellow='<img src="../img/token_yellow.png" style="width:50px; height:auto;">';

    var initElement = function () {
      $('.myTable tr').each(function() {
          $.each(this.cells, function(){
            $(this).css('background-color', 'white');

          });
      });
    };

    var checkIfGameIsNull = function() {
        var x
        for(var col = 1; col <8; col++){
            console.log($('.myTable tr:nth-child(1) td:nth-child('+col+')').html());
            if( $('.myTable tr:nth-child(1) td:nth-child('+col+')').html()==tokenWhite){
                x=0;
                return x;
            } else {
                x=1;
            }
        }
        return x;
    };




    $('.myTable tr td').on("click",function() {
        tour++;
            var col=$(this).closest("td").index();
            var col=col+1;
            for(var row = 6; row >= 1; row--){
                 if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenWhite) {
                     if(tour%2==0){
                         $('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html(tokenRed);
                         var endOfTheGame= checkIfGameIsNull();
                         if (endOfTheGame==1){
                             alert('end');
                         }
                         break;
                     } else {
                         $('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html(tokenYellow);
                         var endOfTheGame= checkIfGameIsNull();
                         if (endOfTheGame==1){
                             alert('end');
                         }
                         break;
                     }

                 }
            }
      });




    var _deviceReadyCallback = function () {
        initElement();
    };

    document.addEventListener('deviceready', _deviceReadyCallback, false);
