
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