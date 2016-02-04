$( document ).ready(function() {
    // console.log('doc ready');

    var checkboxFill = $('.checkbox-percentage');
    var values = [48, 24, 22];
    var time = 800;
    var mapdialog = $('.map-dialog');
    var phonefill = $('.phone-fill');


    function fillCheckboxes() {
        checkboxFill.each(function(index){
            var delayTime = time*index;
            $(this).delay( delayTime ).queue(function() { 
                $('.checkbox-fill', this).addClass('fill').dequeue(); 

                var $el = $('.percentage .num', this),
                    value = values[index];

                $({percentage: 0}).stop(true).animate({percentage: value}, {
                    duration : 500,
                    easing: "easeOutQuad",
                    step: function () {
                        // percentage with 1 decimal;
                        var percentageVal = Math.round(this.percentage * 1) / 1;
                        $el.text(percentageVal);
                    }
                }).promise().done(function () {
                    // hard set the value after animation is done to be
                    // sure the value is correct
                    $el.text(value);
                });
            });
        });
    }


    function formCircles() {
        $('.chart-men').easyPieChart({
            easing: 'easeOut',
            delay: 2000,
            barColor: '#2cbdcb',
            trackColor: '#d6eff3',
            scaleColor: false,
            size: '129',
            lineWidth: 17,
            trackWidth: 17,
            lineCap: 'butt',
            animate: 2000,
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
        
        setTimeout(function(){
            $('.chart-women').easyPieChart({
                easing: 'easeOut',
                delay: 2000,
                barColor: '#f5bc1c',
                trackColor: '#faefd6',
                scaleColor: false,
                size: '181',
                lineWidth: 27,
                trackWidth: 27,
                lineCap: 'butt',
                animate: 2000,
                onStep: function(from, to, percent) {
                    $(this.el).find('.percent').text(Math.round(percent));
                }
            });
        }, 400);
    }

    function growMap() {
        mapdialog.addClass('grow');
    }
        

    function fillPhone() {
        phonefill.addClass('fill');
    }


    var waypointCheckboxes = $('.checkboxes').waypoint({
      handler: function(direction) {
        fillCheckboxes();
      },
      offset: '50%'
    });

    var waypointCircles = $('.circle-graph').waypoint({
      handler: function(direction) {
        formCircles();
      },
      offset: '50%'
    });
    var waypointMap = $('.map').waypoint({
      handler: function(direction) {
        growMap();
      },
      offset: '50%'
    });
    var waypointPhone = $('.phone-fill').waypoint({
      handler: function(direction) {
        fillPhone();
      },
      offset: '50%'
    });

    

});