
try {

$(window).on("resize", resize);

$(document).ready(function () {
	try {
		resize();

		$("#homepage").animate({opacity: 1});
		$("#nav > a.item").on("click", function () {
			$("#nav > a.item.active").removeClass("active");
			$(this).addClass("active");
			var panel = $(this).data("panel");
			showpanel(panel);
		});

		$("#logo").on("click", function () {
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

					$("#content").css({display: "flex", "flex-direction": "column"});

					setTimeout(function () {
						var panel = $("#nav > a.item.active").data("panel");
						console.log("timeout");
						showpanel(panel);
					}, 100);
					
				});
			});
		});

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

	} catch (e) {
		console.log(e);
	}	
});


var SLIDE = [];

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
					};

					SLIDE[i].slideshow = $(slideshows[i]);
					SLIDE[i].image = SLIDE[i].slideshow.find(".image");
					SLIDE[i].slides = SLIDE[i].image.find(".slide");
					// console.log(SLIDE);
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
				// console.log(SLIDE);
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