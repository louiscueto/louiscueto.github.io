
try {

var ALBUMS = {
	"PHD" : [
		"1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg",
		"6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg",
		"11.jpg", "12.jpg", "13.jpg", "14.jpg", "15.jpg",
		"16.jpg", "17.jpg", "18.jpg", "19.jpg", "20.jpg",
		"21.jpg", "22.jpg", "23.jpg"
	],
	"FDC" : [
		"1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg",
		"6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg",
		"11.jpg", "12.jpg", "13.jpg", "14.jpg"
	],
	"BESTFRIEND": [
		"20190414_110852.jpg","20190512_084815.jpg","20190512_084817.jpg","20190624_102308.jpg","20190624_103658.jpg","20190624_104115.jpg","20190624_213301.jpg","20190810_164535.jpg","20190831_192647.jpg","20190831_200253.jpg","DSC_0003.JPG","DSC_0042.JPG","DSC_0417.JPG","FB_IMG_1481513974650.jpg","FB_IMG_1481514156574.jpg","IMG_0081.JPG","IMG_0082.JPG","IMG_0232.JPG","IMG_0315.JPG","IMG_0705.jpg","IMG_0708.jpg","IMG_0843.JPG","IMG_0898.JPG","IMG_0973.JPG","IMG_1025.JPG","IMG_1026.JPG","IMG_1592.JPG","IMG_1597.JPG","IMG_1598.JPG","IMG_1599.JPG","IMG_1610.JPG","IMG_1611.JPG","IMG_1805.JPG","IMG_1850.JPG","IMG_1851.JPG","IMG_1861.JPG","IMG_1863.JPG","IMG_1867.JPG","IMG_1879.JPG","IMG_1926.JPG","IMG_20180303_134119.jpg","IMG_20180311_051740.jpg","IMG_20180311_051747.jpg","IMG_20180413_174320.jpg","IMG_20180427_113130.jpg","IMG_20180510_200046.jpg","IMG_20181218_120458.jpg","IMG_2025.JPG","IMG_2028.JPG","IMG_2874.JPG","IMG_2885.JPG","IMG_3015.JPG","IMG_3058.JPG","IMG_3068.JPG","IMG_3080.JPG","IMG_3084.JPG","IMG_3121.JPG","IMG_3304.JPG","IMG_3511.JPG","IMG_3553.JPG","IMG_3554.JPG","IMG_3561.JPG","IMG_3592.JPG","IMG_4262.JPG","IMG_4264.JPG","IMG_4280.JPG","IMG_4290.JPG","IMG_8076.jpg"
	],
	"BOYFRIEND": [
		"20190419_144709.jpg", "20190421_205532.jpg", "20190523_165927.jpg", "20190524_125310.jpg", "20190524_172742.jpg", "20190524_173102.jpg", "20190603_151858.jpg", "20190707_201657.jpg", "20190720_100211.jpg", "FB_IMG_1527775076332.jpg", "FB_IMG_1527776630569.jpg", "FB_IMG_1527779109052.jpg", "IMG_0129.JPG", "IMG_0130.JPG", "IMG_0433.PNG", "IMG_0498.JPG", "IMG_0503.JPG", "IMG_0516.JPG", "IMG_0529.JPG", "IMG_0559.JPG", "IMG_0597.jpg", "IMG_0612.JPG", "IMG_0823.jpg", "IMG_0859.jpg", "IMG_0861.JPG", "IMG_1069.JPG", "IMG_1157.JPG", "IMG_1217.JPG", "IMG_1555.JPG", "IMG_1556.JPG", "IMG_1822.jpg", "IMG_20180222_132339.jpg", "IMG_20180224_224217.jpg", "IMG_20180225_235545.jpg", "IMG_20180226_083403.jpg", "IMG_20180320_193259.jpg", "IMG_20180402_201951.jpg", "IMG_20180409_204601.jpg", "IMG_20180421_175232.jpg", "IMG_20180427_230251.jpg", "IMG_20180505_203655_1.jpg", "IMG_20180519_210031.jpg", "IMG_20180520_103354.jpg", "IMG_2076.jpg", "IMG_3260.jpg", "IMG_3261.jpg"
	]
};

var SLIDE = [];

$(window).on("resize", resize);

$(document).ready(function () {
	try {
		resize();

		// $("#homepage").animate({opacity: 1});

		$("#nav > a.item").on("click", function () {
			$("#nav > a.item.active").removeClass("active");
			$(this).addClass("active");
			var panel = $(this).data("panel");
			showpanel(panel);
		});

		// $("#logo").on("click", function () {
			$("#homepage").animate({opacity: 0}, 100, function () {

				$("#homepage").hide();
				// $("#content").show();

				$("#content").animate({opacity: 1}, 100, function () {

					var contentH = $("#content").height();
					var contentH = $(window).height();
					var navH = $("#nav").outerHeight(true);

					console.log("contentH > " + contentH);
					console.log("navH > " + navH);

					$("#panels").css({height: (contentH - navH)});
					$("#panels > .panel").outerHeight((contentH - navH) + "px");
					$("#content").css({display: "flex", "flex-direction": "column"});

					setTimeout(function () {
						var panel = $("#nav > a.item.active").data("panel");
						console.log("timeout");
						showpanel(panel);
					}, 100);
					
				});
			});
		// });

		$(".highlight-image > img").on("click", function () {
			var img = $(this).attr("src");
			$(".modal-img").css("background-image", "url("+img+")");

			$(".modal-content").css({display: "none"});
			$("#modal-overlay").css({height: $(window).height()})

			$("#modal-overlay").addClass("active");
			$("#modal-overlay").animate({opacity: 1}, function () {
				$(".modal-img").css({
					"max-height": $("#modal-overlay > .modal").height(),
					"display": "flex",
					"background-color": "rgba(0, 0, 0, 0.6)",
				}).animate({opacity: 1});
			});
		});

		$(".img-row > .item > img").on("click", function () {

			var img = $(this).attr("src");
			var desc = $(this).siblings(".description").html();

			// var temp = $("<img>");
			// temp.attr("src", img);

			// var temp = new Image();
			// temp.onload = function(a){
			// 	console.log(this.width+' '+this.height );
			// };
			// temp.src = img;

			$(".modal-img").css("background-image", "url("+img+")");
			$(".modal-content").html('<div style="padding: 2em; width: 100%;">'+desc+"</div>");
			$("#modal-overlay").css({height: $(window).height()})
			
			$("#modal-overlay").addClass("active");
			$("#modal-overlay").animate({opacity: 1}, function () {
				$(".modal-img").css({"background-color":"black"});
				$(".modal-img, .modal-content").css({
					"max-height": $("#modal-overlay > .modal").height(),
					"display": "flex",
				}).animate({opacity: 1});
			});
		});
		
		$("#modal-overlay").on("click", function (e) {

			if ($(e.target).attr("id") == "modal-overlay") {
				$(this).animate({opacity: 0}, function () {
					$(this).removeClass("active");
					$(this).find(".modal-img, .modal-content").css({display: "none", opacity: 0});
				});
			}
		});

		$(".time").on("click", function () {
			$(".time").removeClass("active");
			$(this).addClass("active");

			var year = $(this).find(".year").html();
			var activeyear = $(".year-content.active");
			var showyear = $("#year-"+year);
			var instruction = $("#instruction");
			console.log("year > " + year);
			console.log("visible > " + instruction.is(":visible"));

			if (instruction.is(":visible")) {
				instruction.animate({opacity: 0}, function(){
					instruction.hide();
					showyear.animate({opacity: 1}, function () {
						showyear.addClass("active");
					});			
				});
			} else {
				console.log(activeyear);
				activeyear.animate({opacity: 0}, function () {
					activeyear.removeClass("active");
					showyear.animate({opacity: 1}, function () {
						showyear.addClass("active");
					});
				});

				
			}
			
		});

		$("#album-close").on("click", function () {
			$("#album-overlay").animate({opacity: 0}, function () {
				$("#album-overlay").removeClass("active");
			});
		});

		$(".album-hover").on("click", function () {

			var album = $(this).data("album");
			if (!!ALBUMS[album]) {

				$(".album-columns > .album-column:first-child").html("");
				$(".album-columns > .album-column:last-child").html("");

				$("#album-viewer").css("background-image", "");

				$("#album-overlay").css({height: $(window).height()})
				$("#album-reel").css({height: $(window).height()});	

				$("#album-overlay").addClass("active").animate({opacity: 1}, function () {
					// $(".modal-img").css({"background-color":"black"});
					// $(".modal-img, .modal-content").css({
					// 	"max-height": $("#modal-overlay > .modal").height(),
					// 	"display": "flex",
					// }).animate({opacity: 1});
					var foo 	= [];
					var foo2 	= [];
					for (var i = 0; i < ALBUMS[album].length; i++) {
						if (i % 2 == 0) {
							foo.push('<img src="assets/'+album+'/'+ALBUMS[album][i]+'">');
						} else {
							foo2.push('<img src="assets/'+album+'/'+ALBUMS[album][i]+'">');
						}
					}

					$(".album-columns > .album-column:first-child").html(foo.join(""));
					$(".album-columns > .album-column:last-child").html(foo2.join(""));

					$("#album-viewer").css("background-image", "url(assets/"+album+"/"+ALBUMS[album][0]+")");

					$(".album-columns > .album-column > img").on("click", function () {
						console.log("WEWE123123W");
						var src = $(this).attr("src")
						console.log("WEWEW");
						$("#album-viewer").css("background-image", "url("+src+")");
					});
				});
			}

			


		});

	} catch (e) {
		console.log(e);
	}	
});




function slideshow(id) { // init function

	var slideshow = SLIDE[id].slideshow;
	var image = SLIDE[id].image; // slideshow.find(".image");
	var slides = SLIDE[id].slides; // image.find(".slide");
	var slidecount = SLIDE[id].slidecount;

	SLIDE[id].ctr = 0;
	

	$(SLIDE[id].slides[SLIDE[id].ctr]).addClass("active");
	SLIDE[id].ctr++;

	SLIDE[id].slideshow.find(".nav:first-child > a.slideshow-nav-btn").off("click").on("click", function () {
		clearTimeout(SLIDE[id].timeout);
		if ((SLIDE[id].ctr - 1) == 0) {
			SLIDE[id].ctr = SLIDE[id].slidecount -1;
		} else {
			SLIDE[id].ctr = SLIDE[id].ctr - 2;
		}
		switchslide(id);
	});

	SLIDE[id].slideshow.find(".nav:last-child > a.slideshow-nav-btn").off("click").on("click", function () {
		clearTimeout(SLIDE[id].timeout);
		if (SLIDE[id].ctr >= SLIDE[id].slidecount) {
			SLIDE[id].ctr = 0;
		}
		switchslide(id);
	});

	toggleslide(id);
}

function toggleslide(id) {


	SLIDE[id].timeout = setTimeout(function() {

		if (SLIDE[id].ctr >= SLIDE[id].slidecount) {
			SLIDE[id].ctr = 0;
		}

		switchslide(id);

	}, 5000);

}

function switchslide (id) {

	SLIDE[id].image.find(".slide.active").animate({opacity: 0}, function () {

		SLIDE[id].slides.removeClass("active");
		$(SLIDE[id].slides[SLIDE[id].ctr]).addClass("active").animate({opacity: 1}, function () {
			SLIDE[id].ctr++;
			toggleslide(id);
		});
	});

}

function showpanel(id){
	console.log($(".panel.active").attr("id"))
	if ($(".panel.active").length) {
		$(".panel.active").animate({opacity: 0}, function () {
			$(".panel.active").removeClass("active");


			$("#"+id).addClass("active").animate({opacity: 1}, function () {
				var slideshows = $("#"+id).find(".slideshow");
				SLIDE = [];
				for (var i = 0; i < slideshows.length; i++) {
					SLIDE[i] = {
						ctr: 0,
						timeout: 0,
						slideshow: null,
						image: null,
						slides: null,
						slidecount: 0,
					};

					SLIDE[i].slideshow = $(slideshows[i]);
					SLIDE[i].image = SLIDE[i].slideshow.find(".image");
					SLIDE[i].slides = SLIDE[i].image.find(".slide");
					SLIDE[i].slidecount = SLIDE[i].slides.length;
					console.log(SLIDE);
					slideshow(i);				
				}				
			});
		})
	} else {
		$("#"+id).addClass("active").animate({opacity: 1}, function () {
			var slideshows = $("#"+id).find(".slideshow");
			SLIDE = [];
			for (var i = 0; i < slideshows.length; i++) {
				SLIDE[i] = {
					ctr: 0,
					timeout: 0,
					slideshow: null,
					image: null,
					slides: null,
					slidecount: 0,
				};

				SLIDE[i].slideshow = $(slideshows[i]);
				SLIDE[i].image = SLIDE[i].slideshow.find(".image");
				SLIDE[i].slides = SLIDE[i].image.find(".slide");
				SLIDE[i].slidecount = SLIDE[i].slides.length;
				console.log(SLIDE);
				slideshow(i);					
			}			
		});
	}
}

function resize () {
	// console.log("resizing..");
	// var container = $("#main-container").height();
	// var menu = $("#menu-container").outerHeight(true);
	// var work = container - menu;
	// console.log({container: container, menu: menu, work: work});
	// $("#work-container").height(work);
}




} catch (e) {
	console.log(e);
}