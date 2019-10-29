
try {
$(window).on("resize", resize);

$(document).ready(function () {
	try {
		resize();
	} catch (e) {
		console.log(e);
	}	
});

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