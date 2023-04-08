var animating = false;
var duration = 500;

var footeroffset = 0;
var footer, sidebar;

var lastPosition = -100;

var scroll =
  window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.msRequestAnimationFrame ||
  window.oRequestAnimationFrame ||
  // IE Fallback, you can even fallback to onscroll
  function (callback) {
    window.setTimeout(callback, 1000 / 60);
  };

$(window).on("load", function () {
  console.log("window loaded 123");

  $(".crawler").each(function () {
    var text = $(this).text().trim();
    console.log(text);
    console.log(text.length);
    // $(this).text("123");
  });
  footer = $("#footer");
  sidebar = $("#sidebar");

  $(".content").hover(
    function () {
      $(".content").find(".overlay").css({ opacity: 0.5 });
      $(this).find(".overlay").css({ opacity: 0 });
    },
    function () {
      $(".content").find(".overlay").css({ opacity: 0 });
    }
  );

  var svg = d3
    .selectAll(".pattern")
    .append("svg")
    .attr("width", "100%")
    .attr("height", "100%")
    .style("position", "absolute")
    .style("top", "0")
    .style("left", "0");
  // .style("background-color", "lightpink")
  // .style("z-index", "1");

  var t = textures.circles().heavier(1);

  svg.call(t);

  svg
    .append("rect")
    .attr("x", "0")
    .attr("y", "0")
    .attr("width", "100%")
    .attr("height", "100%")
    .style("fill", t.url());

  setTimeout(function () {
    $(".contact-1, .contact-2").hide();
    $("#loader").fadeOut("fast", function () {
      if (true) {
        $(".contact-1").show();
      } else {
        $(".contact-2").show();
      }

      var weed = $(window).width();

      $(".panel").css({
        "padding-left": sidebar.outerWidth() + 0,
        // width: $(window).width() - sidebar.outerWidth(),
      });
      footer.css({ left: sidebar.outerWidth() + 20 });

      footer.animate({ opacity: 1 });
      sidebar.animate({ left: 0, opacity: 1 }, 800);

      if (weed <= 999) {
        $("#showmenu").addClass("visible");
      }

      if (!!location.hash) {
        $(".sidebar-nav.active").removeClass("active");

        $(location.hash + "-nav").addClass("active");
        $(location.hash + "-nav-mobile").addClass("active");
      }

      togglepanel();

      // console.log($("#hidemenu").offset());
      // barleft = $("#hidemenu").offset().left;
      $("#hidemenu").on("click", function () {
        return false;

        // sidebar.animate({left: "-100px"}, function(){
        // 	$("#showmenu").animate({opacity: 1});
        // });

        // $(".panel").animate({"padding-left": 0});
        // // footer.animate({"padding-left": 20});

        // var top = $(this).offset().top + 5;
        // var left = $(this).offset().left;
        // console.log(top + "/" + left);
        // footeroffset = footer.offset();

        // top = "30px";
        // left = "30px";

        // $("#showmenu").css({left: left, top: top});
      });

      $("#showmenu").on("click", function () {
        $("#mobile-sidebar").toggleClass("visible");

        return false;

        // $(this).animate({opacity: 0}, 200, function(){
        // 	$(".panel").animate({"padding-left": sidebar.outerWidth() + 0}, function(){

        // 	});

        // 	footer.animate({"left": sidebar.outerWidth() + 20});
        // 		sidebar.animate({left: 0, opacity: 1})
        // });
      });

      $(".sidebar-nav").on("click", function () {
        if (!$(this).hasClass("active") && animating == false) {
          $(".sidebar-nav.active").removeClass("active");
          $(this).addClass("active");
          location.hash = $(this).data("panel");
          togglepanel();
        }
      });
    });
  }, 200);

  $(window).trigger("resize");
});

$(window).on("resize", function () {
  $(".panel").height($(window).height());
  console.log("test");
  var weed = $(window).width();
  if (weed < 999) {
    $("#showmenu").addClass("visible");
  } else {
    $("#showmenu").removeClass("visible");
  }

  const $aboutme = $("#about-me");
  const $footer = $("#footer");
  console.log("$aboutme", $aboutme.height());
  console.log("$footer", $footer.height());

  $aboutme.height($aboutme.parent().height() - ($footer.height() + 120));
  //   $("#about-me").on("resize", (e) => {
  //     let $this = $(this);
  //     console.log($this.height());
  //   });
});

var grid_interval = 0;
$.fn.extend({
  hidepanel: function (callback) {
    // console.log()
    // console.clear();
    // console.log($(this).attr("id"));
    if ($(this).attr("id") == "portfolio") {
      // console.log(grid_interval);
      clearInterval(grid_interval);
      // console.log($(this).find(".content"));
      $(".panel.active").find(".content").css({ opacity: 0 });
    } else {
      $(this).find("img").css({ opacity: 0 });
    }

    $(".panel.active")
      .removeClass("active")
      .animate(
        { top: "-100px", opacity: 0, height: "120%" },
        duration - 100,
        callback
      );
  },
  showpanel: function () {
    var $this = $(this);
    var $content = $this.find(".content");
    var $id = $this.attr("id");

    if ($id == "portfolio") {
      // $content.css({opacity: 0});
    }

    $this.addClass("active").animate(
      {
        top: 0,
        opacity: 1,
        height: $(window).height(),
      },
      duration,
      function () {
        if ($id == "portfolio") {
          // var gridctr = 0;
          // clearInterval(grid_interval);
          // gridarr = [];
          // elems = [];
          // console.log($content.length)
          // var limit = $content.length // 6
          // while (gridarr.length < limit) {
          // 	var r = Math.floor(Math.random()*limit);
          // 	if (gridarr.indexOf(r) === -1) {
          // 		elems.push($("#portfolio .content")[r]);
          // 		gridarr.push(r);
          // 	}
          // }
          // grid_interval = setInterval(function(){
          // 	if (gridctr >= gridarr.length) {
          // 		clearInterval(grid_interval);
          // 	} else {
          // 		$(elems[gridctr]).animate({opacity: 1}, duration);
          // 	}
          // 	gridctr++;
          // }, 120);
        } else {
          // $this.find("img").animate({opacity: 0.9}, duration);
        }

        animating = false;
      }
    );
  },
});

function loop() {
  // Avoid calculations if not needed
  console.log("lastPosition", lastPosition);
  console.log("window.pageYOffset", window.pageYOffset);

  if (lastPosition == window.pageYOffset) {
    scroll(loop);
    return false;
  } else lastPosition = window.pageYOffset;

  var transform = "translate3d(0px, -" + lastPosition + "px, 0px)";
  var smoothScoll = $(".panel.active")[0];
  console.log("smoothScoll", smoothScoll);
  if (!!smoothScoll) {
    smoothScoll.style.webkitTransform = transform;
    smoothScoll.style.mozTransform = transform;
    smoothScoll.style.transform = transform;

    scroll(loop);
  }
}

function togglepanel() {
  if (!animating) {
    animating = true;
    var id = $(".sidebar-nav.active").data("panel");
    if ($(".panel.active").length) {
      $(".panel.active").hidepanel(function () {
        if ($("#mobile-sidebar").hasClass("visible")) {
          $("#mobile-sidebar").toggleClass("visible");
        }

        $(".panel").css({ height: "120%" });
        $("#" + id).showpanel();
      });
    } else {
      $("#" + id).showpanel();
    }
  }
}

Number.prototype.pad = function () {
  var num = this.valueOf();
  return num > 9 ? num : "0" + num;
};

$(".panel").on("scroll", function () {
  console.log("scrolling!!");
});
