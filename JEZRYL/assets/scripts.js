
try {
$(window).on("resize", resize);

$(document).ready(function () {
	try {
		resize();

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
						showpanel(panel);
					}, 100);
					
				});
			});
		});

		$(".img-row > .item > img").on("click", function () {

			var img = $(this).attr("src");
			var desc = $(this).siblings("p").text();
			$(".modal-img").css("background-image", "url("+img+")");
			$(".modal-content").html('<div class="container">'+desc+"</div>");
			$("#modal-overlay").css({"z-index": 2});
			$("#modal-overlay").animate({opacity: 1});
		});
		
		$("#modal-overlay").on("click", function (e) {

			if ($(e.target).attr("id") == "modal-overlay") {
				$(this).animate({opacity: 0}, function () {
					$(this).css({"z-index": -1});
				});
			}
		});

	} catch (e) {
		console.log(e);
	}	
});


function showpanel(id){

	if ($(".panel.active").length) {
		$(".panel.active").animate({opacity: 0}, function () {
			$(".panel.active").removeClass("active");
			$("#"+id).addClass("active").animate({opacity: 1});
		})
	} else {
		$("#"+id).addClass("active").animate({opacity: 1});
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