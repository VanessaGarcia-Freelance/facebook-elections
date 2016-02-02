$( document ).ready(function() {
    console.log('doc ready');

    var checkboxFill = $('.checkbox-fill');
    var time = 300;
    var graph = d3.select(document.getElementById('circle-graph-container'));
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
        console.log('form circles')
        var width = 960,
            height = 500,
            twoPi = 2 * Math.PI,
            progress = 0,
            total = 1308573, // must be hard-coded if server doesn't report Content-Length
            formatPercent = d3.format(".0%");

        var arc = d3.svg.arc()
            .startAngle(0)
            .innerRadius(180)
            .outerRadius(240);

        var svg = d3.select("body").append("svg")
            .attr("width", width)
            .attr("height", height)
          .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

        var meter = svg.append("g")
            .attr("class", "progress-meter");   

            meter.append("path")
            .attr("class", "background")
            .attr("d", arc.endAngle(twoPi));

        var foreground = meter.append("path")
            .attr("class", "foreground");

        // var text = meter.append("text")
        //     .attr("text-anchor", "middle")
        //     .attr("dy", ".35em");

        // var json = 
        var json =[
          {"size": 949609}
        ];

        d3.json([{"size": 949609}])
            .on("progress", function() {
              var i = d3.interpolate(progress, d3.event.loaded / total);
              d3.transition().tween("progress", function() {
                return function(t) {
                  progress = i(t);
                  foreground.attr("d", arc.endAngle(twoPi * progress));
                  //text.text(formatPercent(progress));
                };
              });
            })
            .get(function(error, data) {
              meter.transition();//.delay(250).attr("transform", "scale(0)");
            });
    }

    function growMap() {
        mapdialog.addClass('grow');
    }
        

    function fillPhone() {
        phonefill.addClass('fill');
    }


// Returns true if the specified element has been scrolled into the viewport.
function isElementInViewport(elem) {
    var $elem = $(elem);

    // Get the scroll position of the page.
    var scrollElem = ((navigator.userAgent.toLowerCase().indexOf('webkit') != -1) ? 'body' : 'html');
    var viewportTop = $(scrollElem).scrollTop();
    var viewportBottom = viewportTop + $(window).height();

    // Get the position of the element on the page.
    var elemTop = Math.round( $elem.offset().top );
    var elemBottom = elemTop + $elem.height();

    return ((elemTop < viewportBottom) && (elemBottom > viewportTop));
}

// Check if it's time to start the animation.
function checkAnimation() {
    var $elem = $('.checkboxes');

    // If the animation has already been started
    if ($elem.hasClass('start')) return;

    if (isElementInViewport($elem)) {
        // Start the animation
        //$elem.addClass('start');
        console.log('in view');
        //fillCheckboxes();
    }
}



    

    $(window).scroll(function(){
        checkAnimation();
    });

    setTimeout(function(){
        fillCheckboxes();
        formCircles();
        growMap();
        fillPhone();
    }, 1000);
    

});