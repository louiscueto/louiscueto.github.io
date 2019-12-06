

var width = 100, // width of a progress bar in percentage
	perfData = window.performance.timing, // The PerformanceTiming interface
	EstimatedTime = -(perfData.loadEventEnd - perfData.navigationStart), // Calculated Estimated Time of Page Load which returns negative value.
	time = parseInt((EstimatedTime/1000)%60)*100; //Converting EstimatedTime from miliseconds to seconds.

var PercentageID = $("#percentage"),
	start = 0,
	end = 100,
	duration = time;

var reeling = false;

function animateProgressBar(id, start, end, duration) {

	var range = end - start,
		current = start,
		increment = end > start ? 1 : -1,
		stepTime = Math.abs(Math.floor(duration / range)),
		obj = id;

	var timer = setInterval(function() {

		current += increment;

		if (current >= 99) {
			if (loadedimages < totalimages) {
				current = 99;
				$("#percentage").html("???");
			} else {
				$("#percentage").text(current+"%");
				$("#bar").css({width: current+"%"});
			}
		} else {
			$("#percentage").text(current+"%");
			$("#bar").css({width: current+"%"});
		}

		if (current == end) {

			if (loadedimages >= totalimages) {

				console.log("interval", "all images have been loaded");
				$("#loadingscreen").animate({opacity: 0}, 500, function () {

					initContainers();
					
					$("#loadingscreen").css({
						"z-index": -99,
					});
				});
				clearInterval(timer);
			}			
		}
	}, stepTime);
}

var images = {};
var totalimages = 0;
var loadedimages = 0;

var lastPosition = -100;

$(document).ready(function() {

	document.fonts.ready.then(function () {
		console.log("All fonts in use by visible text have loaded.");
		console.log("Raleway loaded? " + document.fonts.check("1em Raleway"));  // true
		console.log("Poppins loaded? " + document.fonts.check("1em Poppins"));  // true
		console.log(document.fonts);
		animateProgressBar($("#percentage"), start, end, duration);
		$("#loadingscreen > .content").animate({opacity: 1}, function () {
			
		});
		
	});

	console.log("document ready!!");
	
	$("[data-bg]").each(function (i, elem) {
		var bg = $(this).data("bg");
		if (!images[bg]) {
			images[bg] = {};
			images[bg]["loaded"] = false;
			images[bg]["elem"] = $(this);
			images[bg]["elem"] = [];
			images[bg]["type"] = "bg";
		}
		images[bg]["elem"].push($(this));
	});

	$("img").each(function (i, elem) {
		var src = this.getAttribute("src");
		if (!images[src]) {
			images[src] = {};
			images[src]["loaded"] = false;
			images[src]["elem"] = $(this);
			images[src]["elem"] = [];
			images[src]["type"] = "img";
		}
	});

	totalimages = Object.keys(images).length;

	// console.log("images", images);
	$.each(images, function(i, obj){

		$("<img/>").attr("src", i).on("load", function() {
			$(this).remove(); // prevent memory leaks as @benweet suggested
			// $('body').css('background-image', 'url(http://picture.de/image.png)');

			if (obj.type == "bg") {
				for (var a = 0; a < obj.elem.length; a++) {
					obj.elem[a].css("background-image", "url("+i+")");
				}
			}
			imageChecker();
		});
	});

});

function imageChecker() {
	loadedimages++;

	if (loadedimages >= totalimages) {
		console.log("ALL IMAGES LOADED");
		loadWindow();		
	}
}



function scrollLoop() {

	console.log("lastPosition: " + lastPosition + " // window.pageYOffset: " + window.pageYOffset + " // window.scrollTop: " + window.scrollTop);

	// Avoid calculations if not needed
	if (lastPosition == window.pageYOffset) {
		scroll(scrollLoop);
		return false;
	} else lastPosition = window.pageYOffset;

	var transform 		= "translate3d(0px, -" + lastPosition + "px, 0px)";
	var smoothScoll 	= $("#smoothscroll")[0];

	smoothScoll.style.webkitTransform 	= transform;
	smoothScoll.style.mozTransform 		= transform;
	smoothScoll.style.transform 		= transform;
}

var nicescroll = false;

function getTranslate3d (el) {
	var values = el.style.transform.split(/\w+\(|\);?/);
	if (!values[1] || !values[1].length) {
		return [];
	}
	return values[1].split(/,\s?/g);
}

// var setscroll = true;
function loadWindow() {
	
	if (nicescroll) {
		$("body").css({"overflow": "hidden"});
		$("#scrollhere").height($(window).height());
		$("#scrollhere").niceScroll({
			touchemulate: true,
			cursorcolor: "#b3b3b3",
			railpadding: { top: 2, right: 3, left: 0, bottom: 2 },
			autohidemode: false,
			horizrailenabled: false
		});
	} else {
		// resizeWrapper();
	}

	$(window).resize(function() {
		if (nicescroll) {
			setTimeout(function(){
				$(":nicescroll").getNiceScroll().resize();
			}, 100);
		} else {
			$("#mainwrapper").height($("#smoothscroll").height());
		}
	});

	$(".scrolldown").on("click", function () {

		var scroll = $("#mainheader").next().offset().top;

		var transform 		= "translate3d(0px, -" + scroll + "px, 0px)";
		var smoothScoll 	= $("#smoothscroll")[0];

		


		$("#smoothscroll").animate({
			"opacity": scroll
		}, {
			step: function (now, fx) {
				// var shift = (isRight) ? tx-now : tx+now;
				console.log("now > " + now);
				// window.scrollTop = now;
				$("#smoothscroll").css({"transform": "translate3d(0px, -" + now + "px, 0px)"});
				// smoothScoll.style.webkitTransform 	= transform;
				// smoothScoll.style.mozTransform 		= transform;
				// smoothScoll.style.transform 		= transform;		
			},
			duration: 300,
			easing: "linear",
			queue: false,
			complete: function () {


				lastPosition = scroll;
				console.log("LASTPOSITION IS " + lastPosition);
			}
		}, "linear");

	});

	$("#navbar .item").on("click", function (e) {

		$("#navbar .item").removeClass("active");

		if ($(this).hasClass("dropdown")) {
			var icon = $(this).children("span").children("i");
			var isdown = icon.hasClass("down");
			if (isdown) {
				icon.prop("class", "angle up icon");
				$(this).addClass("active");
			} else {
				icon.prop("class", "angle down icon");
			}
		} else {
			$(this).addClass("active");
		}
	});

	$("body").click(function(evt) { 

		if (!$(evt.target).closest('#dropdown-nav').length) {
			$("#dropdown-nav").removeClass("active");
			$("#dropdown-nav").children("span").children("i").prop("class", "angle down icon");
		}
	});

	if (!nicescroll) {

		$(window).on("scroll", function () {
			scrollLoop();
		});
	}

	$("input, textarea").on("input", function(){
		if ($(this).val().trim() == "") {
			$(this).removeClass("not-empty");
		} else {
			$(this).addClass("not-empty");
		}
	});

	$(".reel-controls").on("click", function () {

		// console.clear();

		if (reeling) {
			return true;
		} else {
			reeling = true;
		}

		var click = false;
		var $this = $(this);
		var isRight = $this.hasClass("right");
		var reel = $this.siblings(".reel-list")[0];
		var increment = $(".reel-item:not(.clone)").width();
		var matrix = getTranslate3d(reel);
		var tx = parseFloat(matrix[0]);
		var ty = parseFloat(matrix[1]);
		var tz = parseFloat(matrix[2]);

		var pager = $(this).parent(".reel-wrapper").siblings(".reel-pager");

		// console.log("matrix", matrix);
		// console.log("tx", tx);
		// console.log("increment", increment);

		// console.log("--------");

		var current = pager.find("i.active");
		var next = current.next();
		var prev = current.prev();

		current.removeClass("active");

		if ($(this).hasClass("right")) {
			increment = increment * -1;
			if (next.length) {
				if (click) { next.trigger("click"); }
				else { next.addClass("active"); }				
			} else {
				if (click) { pager.find("i:first-child").trigger("click"); }
				else { pager.find("i:first-child").addClass("active"); }
			}			
		} else {
			if (prev.length) {
				if (click) { prev.trigger("click"); }
				else { prev.addClass("active"); }				
			} else {
				if (click) { pager.find("i:last-child").trigger("click"); }
				else { pager.find("i:last-child").addClass("active"); }
			}
		}


		var transform 		= "translate3d("+(tx+increment)+"px, 0px, 0px)";

		// console.log("increment", increment);

		var wrapper_offset = $this.parent().offset().left
		var cloneright = $(reel).find(".reel-item.clone.right");
		$(reel).animate({
			"opacity": Math.abs(increment)
		}, {
			step: function (now, fx) {
				var shift = (isRight) ? tx-now : tx+now;
				$(reel).css({"transform": "translate3d("+shift+"px, 0px, 0px)"});
			},
			duration: 300,
			easing: "linear",
			queue: false,
			complete: function () {
				// console.log("tx + increment", tx+increment);

				if (tx+increment == 0) {
					console.log(" ---- DULO ---- ");
					$(reel).css({"transform": "translate3d("+(pager.find("i:first-child").data("tx"))+"px, 0px, 0px)"});
				} else {

					if (wrapper_offset == cloneright.offset().left) {
						console.log(" ---- DULO ---- ");
						$(reel).css({"transform": "translate3d("+(pager.find("i:first-child").data("tx"))+"px, 0px, 0px)"});
					}
					// console.log("--- wrapper_offset", wrapper_offset);
					// console.log("--- cloneright offset", cloneright.offset().left);
				}
				// console.log("tx + increment", tx+increment);
				console.log("Reeling animation is done");
				reeling = false;
			}
		}, "linear");

		// $(reel).animate({transform: transform});
		// reel.style.webkitTransform 		= transform;
		// reel.style.mozTransform 		= transform;
		// reel.style.transform 			= transform;
	});
}

function initContainers() {
	
	var windowH = $(window).height();
	var navH = $("#navbar").outerHeight();
	var headerH = windowH - navH + 0; // why da fuck 28 huuuhhh
	$("#mainheader").css({height: headerH});

	// console.log("#mainheader resized!!", $("#mainheader").height());

	if (!nicescroll) {
		$("body").css({"overflow-y": "scroll"});
		setTimeout(resizeWrapper, 100);
	}
	$("#mainwrapper").animate({opacity: 1}, 500);

	$(".reel-list").each(function(i, e) {

		var list = $(this);
		var items = list.children(".reel-item");

		var leftclones = items.clone();
		leftclones.addClass("clone left").prependTo(list);

		var rightclones = items.clone();
		rightclones.addClass("clone right").appendTo(list);

		items.addClass("main");

		var showing = 4;
		var width = $(this).parent(".reel-wrapper").width();
		var images = items.children(".reel-image");
		// list.css({width: (items.width() * items.length)});

		// console.log("images length", $(this).children(".reel-item"));
		var sq = width / showing;
		images.css({width: sq, height: sq});

		leftclones.children(".reel-image").css({width: sq, height: sq});
		rightclones.children(".reel-image").css({width: sq, height: sq});

		list.css({width: (sq * items.length) * showing});


		var pager = list.parent(".reel-wrapper").siblings(".reel-pager");
		
		for (var i = 0; i < images.length; i++) {

			// var tx = $(images[i]).offset().left - list.offset().left;
			var tx = list.offset().left - $(images[i]).offset().left;

			$("<i>").addClass("circle icon").data("tx", tx).prop("title", tx).on("click", function () {

				var $pageritem = $(this);
				pager.find("i").removeClass("active");
				$pageritem.addClass("active");

				var transform 					= "translate3d("+($pageritem.data("tx"))+"px, 0px, 0px)";

				list[0].style.webkitTransform 	= transform;
				list[0].style.mozTransform 		= transform;
				list[0].style.transform 		= transform;

			}).appendTo(pager);
			
		}
		pager.find("i:first-child").trigger("click");

		list.children(".reel-item").hover(function () {
			var item = $(this);
			items.children(".overlay").css({opacity: 1});
			item.children(".overlay").css({opacity: 0});
		}, function () {
			items.children(".overlay").css({opacity: 0});
		});

	});
}


$(window).on("load", function () {
	console.log("window loaded!!");
});

function resizeWrapper () {
	$("#mainwrapper").css({
		height: $("#smoothscroll").height()
	});
}

