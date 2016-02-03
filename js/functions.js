$( document ).ready(function() {
    console.log('doc ready');

    var checkboxFill = $('.checkbox-fill');
    var time = 300;
    var mapdialog = $('.map-dialog');
    var phonefill = $('.phone-fill');


    function fillCheckboxes() {
        checkboxFill.each(function(index){
            var delayTime = time*index;
            //console.log(delayTime);
            $(this).delay( delayTime ).queue(function() { $(this).addClass('fill').dequeue(); });
        });
    }


    function formCircles() {
        $('.chart-men').easyPieChart({
            easing: 'easeIn',
            delay: 2000,
            barColor: '#2cbdcb',
            trackColor: '#d6eff3',
            scaleColor: false,
            size: '129',
            lineWidth: 17,
            trackWidth: 17,
            lineCap: 'butt',
            onStep: function(from, to, percent) {
                $(this.el).find('.percent').text(Math.round(percent));
            }
        });
        
        setTimeout(function(){
            $('.chart-women').easyPieChart({
                easing: 'easeIn',
                delay: 2000,
                barColor: '#f5bc1c',
                trackColor: '#faefd6',
                scaleColor: false,
                size: '181',
                lineWidth: 27,
                trackWidth: 27,
                lineCap: 'butt',
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