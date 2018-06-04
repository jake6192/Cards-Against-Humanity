<?php

?>


<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title></title>
    <style media="screen">
      body{margin: 0;padding: 0;overflow: hidden;}
      div.container {
        width: 100%;
        height: 100%;
        border: 2px solid #000;
        margin: 0;
        padding: 0;
      }

      div.cell {
        position: absolute;
        border: 1px solid #000;
        background-color: #fff;
        margin: 0;
        padding: 0;
      }

      div.cell.selected {
        background-color: #444 !important;
        border-color: #fff !important;
      }
    </style>
  </head>
  <body>
    <div class="container"></div>

    <script type="text/javascript" src="js/libs/jquery-3.3.1.js"></script>
    <script type="text/javascript">
      $(document).ready(function() {
        const w = 15, h = 15;
        let height, width;

        fillCells();
        function fillCells() {
          width = $(window).width()
          height = $(window).height();
          $('.container').html('');

          for(var x = 0; x < w; x++) for(var y = 0; y < h; y++) {
            $('.container').append('<div class="cell" x="'+x+'" y ="'+y+'"></div>');
          }

          var cells = $('.cell');
          for(var i in cells) {
            var x = $(cells[i]).attr('x'), y = $(cells[i]).attr('y');
            var cellWidth = width/w, cellHeight = height/h;
            $(cells[i]).css({ 'left': cellWidth*x, 'top': cellHeight*y, 'width': cellWidth, 'height': cellHeight });
          }
        }


        $('.cell').click(function(e) { $(this).toggleClass('selected'); });

        setInterval(function() {
          if($(window).width() != width) fillCells();
          if($(window).height() != height) fillCells();
        }, 1000);
      });
    </script>
  </body>
</html>
