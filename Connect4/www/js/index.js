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


  //   $('.myTable tr td').on("click",function() {
  //         $(this).css('background-color', 'red');
  //         $(this).text("2");
  //   });
  // }





$('.myTable tr td').on("click",function() {
    tour++;

                var col=$(this).closest("td").index();
                var col=col+1;
                for(var row = 6; row >= 1; row--){
                     if($('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html()==tokenWhite) {
                         if(tour%2==0){
                             $('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html(tokenRed);
                             break;
                         } else {
                             $('.myTable tr:nth-child('+ row +') td:nth-child('+ col +')').html(tokenYellow);
                             break;
                         }

                     }
                }
          });




    var _deviceReadyCallback = function () {
        initElement();
    };

    document.addEventListener('deviceready', _deviceReadyCallback, false);
