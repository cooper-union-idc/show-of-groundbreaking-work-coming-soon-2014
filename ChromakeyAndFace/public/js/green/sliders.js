$(function() {
    
    $( "#slider-range" ).slider({
        range: true,
        min: 0,
        max: 255,
        values: [ 0, 255 ],
        slide: function( event, ui ) {
            $( "#amount" ).val( " " + ui.values[ 0 ] + " -  " + ui.values[ 1 ]); 

            val1 = ui.values[0];
            val2 = ui.values[1];
            frameFix();
        }
    });
    $( "#amount" ).val( $( "#slider-range" ).slider( "values", 0 ) +
        " - " + $( "#slider-range" ).slider( "values", 1 ) );



$( "#slider-range2" ).slider({
        range: true,
        min: 0,
        max: 255,
        values: [ 0, 255 ],
        slide: function( event, ui ) {
            $( "#amount2" ).val( " " + ui.values[ 0 ] + " -  " + ui.values[ 1 ] );
            
            val3 = ui.values[0];
            val4 = ui.values[1];
            frameFix();
        }
    });
    $( "#amount2" ).val( $( "#slider-range" ).slider( "values", 0 ) +
        " - " + $( "#slider-range" ).slider( "values", 1 ) );


$( "#slider-range3" ).slider({
            range: true,
            min: 0,
            max: 255,
            values: [ 0, 255 ],
            slide: function( event, ui ) {
                $( "#amount3" ).val( " " + ui.values[ 0 ] + " -  " + ui.values[ 1 ] );

                val5 = ui.values[0];
                val6 = ui.values[1];
                frameFix();
            }
        });
        $( "#amount3" ).val( $( "#slider-range" ).slider( "values", 0 ) +
            " - " + $( "#slider-range" ).slider( "values", 1 ) );

});

  var val1;
  var val2;
  var val3;
  var val4;
  var val5;
  var val6;