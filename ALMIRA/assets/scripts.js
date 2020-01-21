
window.onscroll = function () {
	// console.log("document.body.scrollTop", document.body.scrollTop);
	// console.log("document.documentElement.scrollTop", document.documentElement.scrollTop);
	// console.log("$(window).height()", $(window).height());

	if (document.documentElement.scrollTop > $(window).height()) {
		$("#navbar-2").addClass("visible");
	} else {
		$("#navbar-2").removeClass("visible");
	}

};

$(document).ready(function () {

	$(".search-bar input[type=text]").on("blur", function () {

		var $div = $(this).parent();
		var $icon = $(this).siblings(".toggle-search");
		if ($div.hasClass("active")) {			
			$div.animate({"width": "1%"}, {
				step: function (step) {
					$div.css({"background-color": "rgba(27, 28, 29, "+(step/100)+")"})
				},
				complete: function () {
					$icon.addClass("black inverted").animate({"background": ""});
					$div.removeClass("active");
				}
			});
		}
	});

	$(".toggle-search").on("click", function () {

		var $div = $(this).parent();
		var $input = $(this).siblings("input[type=text]");
		if (!$div.hasClass("active")) {
			$(this).removeClass("black inverted").css({"background": "#03a9f4"});
			$div.animate({"width": "100%"}, {
				step: function (step) {					
					$div.css({"background-color": "rgba(27, 28, 29, "+(step/100)+")"})
				},
				complete: function () {
					$div.addClass("active");
					$input.focus();
				}
			});
		}
		
	});

});