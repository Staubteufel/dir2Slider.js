//****************************************
// dir2Slider | MIT License (MIT)
// ------------------------------
// >!!! jQuery is required !!!<
//
// Example usage:
//		dir2Slider("http://www.example.com/img", ".jpg", 600, 800);
//****************************************
(function($) {
window.dir2Slider=dir2Slider;

	//********************
	// dir2Slider
	// --------------------
	// parameter | example
	// --------------------
	// path 			: "img/", "http://example.com/img/"
	// fileExtension 	: ".jpg", ".gif", ".png" [...]
	// height 			: 400
	// width 			: 600
	// slideNumbers		: "true", "false"
	// arrowKeyControl	: "true", "false"
	// boxControl		: "true", "false"
	// autoSlideTime	: 2
	//********************
	function dir2Slider(path, fileExtension, height, width, slideNumbers, arrowKeyControl, boxControl, autoSlideTime) {
		// Parameter
		if(typeof(path)==='undefined') path = "img/";
		if(typeof(fileExtension)==='undefined') fileExtension = ".jpg";
		if(typeof(height)==='undefined') height = 400;
		if(typeof(width)==='undefined') width = 600;
		if(typeof(slideNumbers)==='undefined') slideNumbers = false;
		if(typeof(arrowKeyControl)==='undefined') arrowKeyControl = true;
		if(typeof(boxControl)==='undefined') boxControl = true;
		if(typeof(autoSlideTime)==='undefined') autoSlideTime = false;
		
		// Global
		var imgNum = 1;
		var currentImgNum = 1;
		
		// Init
		addMainBox(height, width);
		searchImages(path, fileExtension, height, width);
		
		// Options
		if(boxControl)
			addBoxes(height, width);
		
		if(slideNumbers)
			showSlideNumbers(height);
			
		if(arrowKeyControl)
			addArrowKeyControl();
		
		if(autoSlideTime)		
			autoSlide(autoSlideTime);
		
		
		//********************
		// Add the main background box
		//********************
		function addMainBox(height, width, color) {
			$("#dir2Slider").css({
				"width" : width,
				"height" : height,
				"background-color" : "#E6E6E6"
			});
		}
		
		//********************
		// Search images (Recursion)
		//********************
		function searchImages(path, fileExtension, height, width) {
			var url = path + imgNum + fileExtension;
			var img = new Image();
			img.onload = function() {
				addImages(url, height, width);
				imgNum++;
				searchImages(path, fileExtension, height, width);
			}

			// Only if not IE6, IE7, IE8
			if((navigator.appVersion.indexOf("MSIE 6.")==-1) && (navigator.appVersion.indexOf("MSIE 7.")==-1) && (navigator.appVersion.indexOf("MSIE 8.")==-1))
				img.onerror = changeSlideNumbers();
			
			img.src = url;
		}

		//********************
		// Add a new image to the slider
		//********************
		function addImages(url, height, width) {
			$("#dir2Slider").append('<img id="img' + imgNum + '" src="' + url + '">');
			$("#img" + imgNum).css({
				"position" : "absolute",
				"width" : width,
				"height" : height,
				"z-index" : "1",
				"user-select" : "none"
			});
			$("#img" + imgNum).hide();
			
			if(imgNum == 1)
				$("#img" + imgNum).show();
				
				
			changeSlideNumbers();
		}

		//********************
		// Add the control boxes
		//********************
		function addBoxes(height, width){
			/// Left Box
			$("#dir2Slider").append('<div id="leftBox"></div>');
			$("#leftBox").css({
				"position" : "absolute",
				"height" : height,
				"width" : width / 6,
				"background-color" : "#CCCCCC",
				"opacity" : 0,
				"color" : "#B3B3B3",
				"z-index" : "2"
			});
			$("#leftBox").hover(function() {
				$("#leftBox").css("opacity", 0.3);
			}, function() {
				$("#leftBox").css("opacity", 0);
			});

			/// Right Box
			$("#dir2Slider").append('<div id="rightBox"></div>');
			$("#rightBox").css({
				"position" : "absolute",
				"height" : height,
				"width" : width / 6,
				"margin-left" : width / 1.20,
				"background-color" : "#CCCCCC",
				"opacity" : 0,
				"color" : "#B3B3B3",
				"z-index" : "2"
			});
			$("#rightBox").hover(function() {
				$("#rightBox").css("opacity", 0.3);
			}, function() {
				$("#rightBox").css("opacity", 0);
			});
			
			// Add control events
			$("#leftBox").click(function() {
				move1Forward();
			});
			$("#rightBox").click(function() {
				move1Backward();
			});
		}

		//********************
		// Add arrow key control
		//********************
		function addArrowKeyControl() {
			$(document).keydown(function(e){
				if (e.keyCode == 37) { 
				   move1Forward();
				}
			});
			
			$(document).keydown(function(e){
				if (e.keyCode == 39) { 
				   move1Backward();
				}
			});
		}

		//********************
		// Show the next image
		//********************
		function move1Forward() {
			$("#img"+currentImgNum).fadeOut("slow");
			currentImgNum--;
			if(currentImgNum == 0){
				currentImgNum = imgNum-1;
			}
			$("#img"+currentImgNum).fadeIn("slow");
			
			changeSlideNumbers();
		}

		//********************
		// Show the last image
		//********************
		function move1Backward() {
			$("#img"+currentImgNum).fadeOut("slow");
			currentImgNum++;
			if(currentImgNum == imgNum){
				currentImgNum = 1;
			}
			$("#img"+currentImgNum).fadeIn("slow");
			
			changeSlideNumbers();
		}
		
		//********************
		// Show the number of images
		//********************
		function showSlideNumbers(height) {
			$("#dir2Slider").append('<span id="slideNumbers">' + currentImgNum + "/" + imgNum + "</span>");
			$("#slideNumbers").css({
				"position" : "absolute",
				"font-weight" : "bold",
				"margin-top" : height-25,
				"width" : width,
				"text-align" : "center",
				"color" : "#7F7F7F",
				"z-index" : 2,
				"font-size" : (800 + 1200) / 100
			});
		}
		
		//********************
		// Show the number of images
		//********************
		function changeSlideNumbers() {
			$("#slideNumbers").text(currentImgNum + "/" + (imgNum-1));
		}
		
		//********************
		// Auto slide
		//********************
		function autoSlide(seconds) {
			window.setInterval(move1Backward, (seconds * 1000));
		}
	}
})(jQuery);
