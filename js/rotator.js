
      function slideShow(){
        // '*' to work with any element, not only 'li's
        this.slides = $('#slideshow > *'); 
        this.count = this.slides.length-1;
        this.initslide = 0;
        this.auto = null; 

        this.selectTitles();
        this.ActivateAuto();
      };

      slideShow.prototype.selectTitles = function(){
      	var that = this;
        $('#slideshow-wrapper').append('<select></select>');
        $('#slideshow > * > img').each(function(i) {
            $('select').append('<option val="'+i+'">'+ $( this ).attr('alt') +'</option>');
          }); 
        $('select').change(this.onChange.bind(this));
      };

      slideShow.prototype.nextSlide = function(){
        this.initslide = (this.initslide++ >= this.count) ? 0 : this.initslide++;
        this.animateSlide();
        //console.log(this.initslide);
      };

      slideShow.prototype.animateSlide = function(){ 
        var currentSlide = this.initslide; 
        var nextSlide = ((currentSlide+1) > this.count) ? 0 : currentSlide+1;
        var prevSlide = ((currentSlide-1) < 0) ? this.count - 1 : currentSlide-1;  

        $('#slideshow > *').removeClass().not($('#slideshow > *').filter(function( index ) {
                  return index === currentSlide || index === nextSlide || index === prevSlide;
                })).addClass('left');  
        $('#slideshow > *:eq('+prevSlide+')').addClass('left');
        $('#slideshow > *:eq('+nextSlide+')').addClass('right');
        $('#slideshow > *:eq('+currentSlide+')').addClass('front');

        //Animate Dropdown menu
        $('select option').removeAttr("selected");
        $('select option:eq('+currentSlide+')').prop('selected',true);
      };

      slideShow.prototype.ActivateAuto = function(){
        var that = this;
        this.animateSlide();
        this.auto = window.setInterval(function () {
            that.nextSlide();
        }, 4000);
      };

      slideShow.prototype.onChange = function(e){
      	window.clearInterval(this.auto);
      	var that = this;
      	var s = $('select option:selected').index();
      	var jump = this.initslide - s;

      	if(Math.abs(jump) > 1){
          if (jump < 0){
            this.initslide++;
            this.animateSlide();

            var rep = setInterval(function () {
              that.initslide++;
              that.animateSlide();
              if(that.initslide === s){
              window.clearInterval(rep);
              that.ActivateAuto();
              }
            }, 500);
          }else{
            this.initslide--;
            this.animateSlide();

            var rep = setInterval(function () {
              that.initslide--;
              that.animateSlide();
              if(that.initslide === s){
              window.clearInterval(rep);
              that.ActivateAuto();
              }
            }, 500);
          }

        }else{
        	this.initslide = s;
      		this.ActivateAuto();
        }

      	
      };
