var animating = false;
var duration = 500;

var footeroffset = 0;
var footer, sidebar;

$(window).on("load", function(){
	console.log("window loaded");
	footer = $("#footer");
	sidebar = $("#sidebar");

	var svg = d3.selectAll(".pattern")
				.append("svg").attr("width", "100%")
				.attr("height", "100%")
				.style("position", "absolute")
				.style("top", "0")
				.style("left", "0")
				// .style("background-color", "lightpink")
				// .style("z-index", "1");

	var t = textures.circles().heavier(1);

	svg.call(t);

		svg.append("rect")
		.attr("x", "0")
		.attr("y", "0")
		.attr("width", "100%")
		.attr("height", "100%")
		.style("fill", t.url())

	setTimeout(function() {

			$(".contact-1, .contact-2").hide();
			$("#loader").fadeOut("fast", function() {

				if (!true) {
					$(".contact-1").show();
				} else {
					$(".contact-2").show();
				}
				

				$(".panel").css({"padding-left": sidebar.outerWidth() + 0});
				footer.css({"padding-left": sidebar.outerWidth() + 20});

				footer.animate({opacity: 1});
				sidebar.animate({left: 0, opacity: 1}, 800)

				// console.log($("#hidemenu").offset());
				// barleft = $("#hidemenu").offset().left;
				$("#hidemenu").on("click", function(){

					sidebar.animate({left: "-100px"}, function(){
						$("#showmenu").animate({opacity: 1});
					});

					$(".panel").animate({"padding-left": 0});
					footer.animate({"padding-left": 20});

					var top = $(this).offset().top + 5;
					var left = $(this).offset().left;

					footeroffset = footer.offset();
					$("#showmenu").css({left: left, top: top});
					
				});

				$("#showmenu").on("click", function(){
					$(this).animate({opacity: 0}, 200, function(){
						$(".panel").animate({"padding-left": sidebar.outerWidth() + 0}, function(){
							
						});	

						footer.animate({"padding-left": sidebar.outerWidth() + 20});
							sidebar.animate({left: 0, opacity: 1})							
					});
				});

				if (!!location.hash) {
					$(".sidebar-nav.active").removeClass("active");
					$(location.hash+"-nav").addClass("active");
				}

				togglepanel();

				$(".sidebar-nav").on("click", function(){
					if (!$(this).hasClass("active") && animating == false) {
						$(".sidebar-nav.active").removeClass("active");
						$(this).addClass("active");
						location.hash = $(this).data("panel");
						togglepanel();
					}						
				});

			});

	}, 200);

});

$(window).on("resize", function(){
	$(".panel").height($(window).height());
}).trigger("resize");

$.fn.extend({
	hidepanel: function(callback) {	
		$(this).find("img, .content").css({opacity: 0})		
		$(".panel.active").removeClass("active").animate({top: "-100px", opacity: 0, height: "120%"}, duration-100, callback);
	},
	showpanel: function () {
		
		var $this = $(this);
		$this.addClass("active").animate({
			top: 0,
			opacity: 1,
			height: $(window).height(),
		}, duration, function(){

			if ($this.attr("id") == "work") {

				var gridarr = [], elems = [], gridctr = 0, grid_interval;
				while (gridarr.length < 6) {
					var r = Math.floor(Math.random()*6);
					if (gridarr.indexOf(r) === -1) {
						elems.push($("#work .content")[r]);
						gridarr.push(r);
					}
				}
				
				grid_interval = setInterval(function(){
					if (gridctr >= gridarr.length) {
						clearInterval(grid_interval);
					} else {								
						$(elems[gridctr]).animate({opacity: 1}, duration);
					}
					gridctr++;
				}, 150);

			} else {
				$this.find("img").animate({opacity: 0.04}, duration);
			}
				

			animating = false;			
		});
	}
})

function togglepanel () {
	if (!animating) {
		animating = true;
		var id = $(".sidebar-nav.active").data("panel");
		if ($(".panel.active").length) {

			$(".panel.active").hidepanel(function(){
				
				$(".panel").css({height: "120%"});
				$("#"+id).showpanel();

			});
		} else {
			$("#"+id).showpanel();
		}
	}
}


Number.prototype.pad = function (){
	var num = this.valueOf()
	return num > 9 ? num : "0" + num;
	}