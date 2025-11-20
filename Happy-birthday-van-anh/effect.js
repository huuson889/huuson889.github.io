
$(window).load(function(){
	$('.loading').fadeOut('slow');
	$('.container').fadeIn('slow');
});
$('document').ready(function(){
		var vw;
		const balloon = document.querySelector(".balloons");
		const style = getComputedStyle(balloon);
		const bw = parseFloat(style.width);
		$(window).resize(function(){
			 vw = $(window).width()/2;
			$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
			$('#b11').animate({top:220, left: vw-3.5*bw},500);
			$('#b22').animate({top:220, left: vw-2.5*bw},500);
			$('#b33').animate({top:220, left: vw-1.5*bw},500);
			$('#b44').animate({top:220, left: vw-0.5*bw},500);
			$('#b55').animate({top:220, left: vw+0.5*bw},500);
			$('#b66').animate({top:220, left: vw+1.5*bw},500);
			$('#b77').animate({top:220, left: vw+2.5*bw},500);
		});
	
	$('#turn_on').hide().delay(5000).fadeIn('slow');

	$('#turn_on').click(function(){
		$('#bulb_yellow').addClass('bulb-glow-yellow');
		$('#bulb_red').addClass('bulb-glow-red');
		$('#bulb_blue').addClass('bulb-glow-blue');
		$('#bulb_green').addClass('bulb-glow-green');
		$('#bulb_pink').addClass('bulb-glow-pink');
		$('#bulb_orange').addClass('bulb-glow-orange');
		$('body').addClass('peach');
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#play').fadeIn('slow');
		});
	});

function loopOne() {
		var randleft = window.innerWidth * Math.random();
		var randtop = 500*Math.random();
		$('#b1').animate({left:randleft,bottom:randtop},10000,function(){
			loopOne();
		});
	}
	function loopTwo() {
		var randleft = window.innerWidth*Math.random();
		var randtop = 500*Math.random();
		$('#b2').animate({left:randleft,bottom:randtop},10000,function(){
			loopTwo();
		});
	}
	function loopThree() {
		var randleft = window.innerWidth*Math.random();
		var randtop = 500*Math.random();
		$('#b3').animate({left:randleft,bottom:randtop},10000,function(){
			loopThree();
		});
	}
	function loopFour() {
		var randleft = window.innerWidth*Math.random();
		var randtop = 500*Math.random();
		$('#b4').animate({left:randleft,bottom:randtop},10000,function(){
			loopFour();
		});
	}
	function loopFive() {
		var randleft = window.innerWidth*Math.random();
		var randtop = 500*Math.random();
		$('#b5').animate({left:randleft,bottom:randtop},10000,function(){
			loopFive();
		});
	}

	function loopSix() {
		var randleft = window.innerWidth*Math.random();
		var randtop = 500*Math.random();
		$('#b6').animate({left:randleft,bottom:randtop},10000,function(){
			loopSix();
		});
	}
	function loopSeven() {
		var randleft = window.innerWidth*Math.random();
		var randtop = 500*Math.random();
		$('#b7').animate({left:randleft,bottom:randtop},10000,function(){
			loopSeven();
		});
	}
	
	$('#play').click(function(){
		var audio = $('.song')[0];
        audio.play();
        $('#bulb_yellow').addClass('bulb-glow-yellow-after');
		$('#bulb_red').addClass('bulb-glow-red-after');
		$('#bulb_blue').addClass('bulb-glow-blue-after');
		$('#bulb_green').addClass('bulb-glow-green-after');
		$('#bulb_pink').addClass('bulb-glow-pink-after');
		$('#bulb_orange').addClass('bulb-glow-orange-after');
		$('body').css('backgroud-color','#FFF');
		$('body').addClass('peach-after');

		loopOne();
		loopTwo();
		loopThree();
		loopFour();
		loopFive();
		loopSix();
		loopSeven();
		
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#bannar_coming').fadeIn('slow');
		});
	});

	$('#bannar_coming').click(function(){
		$('.bannar').addClass('bannar-come');
		$(this).fadeOut('slow').delay(6000).promise().done(function(){
			$('#balloons_flying').fadeIn('slow');
		});
	});

	

	$('#balloons_flying').click(function(){
		$('.balloon-border').animate({top:-500},8000);
		//$('#b1,#b4,#b5,#b7').addClass('balloons-rotate-behaviour-one');
		//$('#b2,#b3,#b6').addClass('balloons-rotate-behaviour-two');
		// $('#b3').addClass('balloons-rotate-behaviour-two');
		// $('#b4').addClass('balloons-rotate-behaviour-one');
		// $('#b5').addClass('balloons-rotate-behaviour-one');
		// $('#b6').addClass('balloons-rotate-behaviour-two');
		// $('#b7').addClass('balloons-rotate-behaviour-one');
		
		
		$(this).fadeOut('slow').delay(12000).promise().done(function(){
			$('#cake_fadein').fadeIn('slow');
		});
	});	

	$('#cake_fadein').click(function(){
		$('.cake').hide().delay(2000).fadeIn('slow');
		$(this).fadeOut('slow').delay(5000).promise().done(function(){
			$('#light_candle').fadeIn('slow');
		});
	});

	$('#light_candle').click(function(){
		$('.fuego').fadeIn('slow');
		$(this).fadeOut('slow').delay(3000).promise().done(function(){
			$('#wish_message').fadeIn('slow');
		});
	});

		
	$('#wish_message').click(function(){
		 vw = $(window).width()/2;
		
		const balloon = document.querySelector(".balloons");
		const style = getComputedStyle(balloon);
		const bw = parseFloat(style.width);
		
		$('#b1,#b2,#b3,#b4,#b5,#b6,#b7').stop();
		$('#b1').attr('id','b11');
		$('#b2').attr('id','b22')
		$('#b3').attr('id','b33')
		$('#b4').attr('id','b44')
		$('#b5').attr('id','b55')
		$('#b6').attr('id','b66')
		$('#b7').attr('id','b77')
		
		$('#b11').animate({top:220, left: vw-3.5*bw},500);
		$('#b22').animate({top:220, left: vw-2.5*bw},500);
		$('#b33').animate({top:220, left: vw-1.5*bw},500);
		$('#b44').animate({top:220, left: vw-0.5*bw},500);
		$('#b55').animate({top:220, left: vw+0.5*bw},500);
		$('#b66').animate({top:220, left: vw+1.5*bw},500);
		$('#b77').animate({top:220, left: vw+2.5*bw},500);
		
		$('.balloons').css('opacity','0.9');
		$('.balloons h2').fadeIn(3000);
		$(this).fadeOut('slow').delay(4000).promise().done(function(){
			$('#story').fadeIn('slow');
		});
	});
	
	$('#story').click(function(){
		$(this).fadeOut('slow');
		$('.cake').fadeOut('slow').promise().done(function(){
			$('.message').fadeIn('slow');
		});
		
		var i;

		function msgLoop (i) {
			$("p:nth-child("+i+")").fadeOut('slow').delay(800).promise().done(function(){
			i=i+1;
			$("p:nth-child("+i+")").fadeIn('slow').delay(5000);
			if(i==5){
				$(".message")
				    .animate(
				        { marginTop: "320px" }, // di chuyển container xuống 320px
				        800                     // thời gian animation (ms)
				    )
				    .promise()
				    .done(function () {
				        $('.cake').fadeIn('slow'); // show cake sau khi container đã di chuyển xong
				    });

				
			}
			else{
				msgLoop(i);
			}			

		});
			// body...
		}
		
		msgLoop(0);
		
	});
});




//alert('hello');
