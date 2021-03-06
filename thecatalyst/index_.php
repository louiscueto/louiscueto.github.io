<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	
	<!-- Imporant meta information to make the page as rigid as possible on mobiles, to avoid unintentional zooming on the page itself  -->
	<meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<meta http-equiv="X-UA-Compatible" content="ie=edge">
	<title>The Catalyst Advisory Group</title>


	<link rel="preconnect" href="https://fonts.gstatic.com">
	<link href="https://fonts.googleapis.com/css2?family=Fjalla+One&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">

	
	<link href="https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap" rel="stylesheet">
	<link href="https://fonts.googleapis.com/css2?family=Noto+Serif&display=swap" rel="stylesheet">

	<!-- <script src="https://code.jquery.com/jquery-3.5.1.min.js" integrity="sha256-9/aliU8dGd2tb6OSsuzixeV4y/faTqgFtohetphbbj0=" crossorigin="anonymous"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js" integrity="sha512-dqw6X88iGgZlTsONxZK9ePmJEFrmHwpuMrsUChjAw1mRUhUITE5QU9pkcSox+ynfLhL15Sv2al5A0LVyDCmtUw==" crossorigin="anonymous"></script>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css" integrity="sha512-8bHTC73gkZ7rZ7vpqUQThUDhqcNFyYi2xgDgPDHc+GXVGHXq+xPjynxIopALmOPqzo9JZj0k6OqqewdGO3EsrQ==" crossorigin="anonymous" / media="all"> -->

	<link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

	<!-- <div class="debugger" id="debugger" style="top: 0;"></div> -->
	<!-- <div class="debugger" id="debugger2" style="top: 80px;"></div> -->
	<!-- <div class="debugger" id="debugger3" style="top: 160px;"></div> -->

	<div class="modal" id="modal2">
		<div class="modal-content noto" style="height: 80%;">
			<button class="close">X</button>
			<object width="100%" height="100%" type="application/pdf" data="assets/MG_Bio.pdf#toolbar=0&navpanes=0&scrollbar=0">
			    <p>Insert your error message here, if the PDF cannot be displayed.</p>
			</object>
		</div>
	</div>

	<?php include "modal.php"; ?>

	<div class="guide" id="guide-x" style=""></div>
	<div class="guide" id="guide-y" style=""></div>
	
	<div id="main">
		<div id="header">
			<div class="menu">
				<div class="header item">
					<img src="assets/TCA_Logo_FA_Layered.png" style="width: 200px; height: auto; margin: auto;">
				</div>
				<div class="right">
					<div class="item"><span>HOME</span></div>
					<div class="item"><span>ABOUT</span></div>
					<div class="item"><span>PORTFOLIO</span></div>
					<div class="item"><span>CONTACT</span></div>
				</div>
			</div>
			<div id="menu-border"></div>
		</div>
		<div id="content">
			<div id="dragger"></div>
			<div id="tooltip"><h1 id="text">Patrick Reyes</h1></div>
		</div>
		<div id="footer">
			<div style="display: flex; width: 80%; margin: auto;">
				<div style="display: flex; margin-left: auto; color: black; font-size: 1rem;">
					<div class="poppins" style="margin-left: 2em; cursor: pointer;">FACEBOOK</div>
					<div class="poppins" style="margin-left: 2em; cursor: pointer;">TWITTER</div>
					<div class="poppins" style="margin-left: 2em; cursor: pointer;">INSTAGRAM</div>
				</div>
			</div>
		</div>
	</div>
	<!-- The loading element overlays all else until the model is loaded, at which point we remove this element from the DOM -->  
	<div class="loading" id="js-loader"><div class="loader"></div></div>
	<div class="wrapper">
		<!-- The canvas element is used to draw the 3D scene -->
		<canvas id="c"></canvas>
	</div>
</body>
</html>

<!-- The main Three.js file -->
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/108/three.js"></script> -->
<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r122/three.js" integrity="sha512-iaZ8D6RzguOWQ+B5SLJCHPid3/2UaVIFnsNJHy068pv3r5G6kYOe+XufLqd6qNrQmaHeYR0iVyu2xkXB2llnMg==" crossorigin="anonymous"></script> -->
<!-- <script src="assets/three.js-master/build/three.js"></script> -->
<script src="https://threejs.org/build/three.js"></script>



<!-- This brings in the ability to load custom 3D objects in the .obj file format. -->
<!-- <script src="https://cdn.jsdelivr.net/gh/mrdoob/Three.js@r92/examples/js/loaders/OBJLoader.js"></script> -->
<!-- <script src="https://cdn.jsdelivr.net/npm/three@0.122.0/examples/js/loaders/OBJLoader.js"></script> -->
<script src="https://threejs.org/examples/js/loaders/OBJLoader.js"></script>

<!-- <script src="https://cdnjs.cloudflare.com/ajax/libs/tween.js/16.7.0/Tween.js"></script> -->

<script type="text/javascript" src="assets/tween.js-master/src/Tween.js"></script>
<script type="text/javascript" src="assets/pdfjs/build/pdf.js"></script>
<script type="text/javascript" src="biodata.js"></script>



<!-- low_poly_sphere.obj -->
<script type="module">

	(function() {

		let scene,  
		renderer,
		camera,
		model,                              // Our character
		neck,                               // Reference to the neck bone in the skeleton
		waist,                               // Reference to the waist bone in the skeleton
		possibleAnims,                      // Animations found in our file
		mixer,                              // THREE.js animations mixer
		idle,                               // Idle, the default state our character returns to
		clock = new THREE.Clock(),          // Used for anims, which run to a clock instead of frame rate 
		currentlyAnimating = false,         // Used to check whether characters neck is being used in another anim
		raycaster = new THREE.Raycaster(),  // Used to detect the click on our character
		loaderAnim = document.getElementById("js-loader");
		var $x = document.getElementById("x");
		var prevX, prevY;


		// var mouse = new THREE.Vector2();
		var raycaster2 = new THREE.Raycaster();
		// raycaster2.linePrecision = 3; // deprecated
		raycaster2.params.Line.threshold = 1;

		var idleMode = false;
		var idleTimer;
		// var $debugger = document.getElementById("debugger");
		// var $debugger2 = document.getElementById("debugger2");
		// var $debugger3 = document.getElementById("debugger3");
		// idle sequence: 3/20/*15*/19/18/11/14/1/3 | word: Sphere_fracturepart[n]

		var container 	= window.innerHeight;
		var menu 		= document.getElementById("header").clientHeight;
		document.getElementById("dragger").style.height = (container-menu)+"px";

		var $modal = document.getElementById("modal");

		var modalvisible = false;
		var dragmode = false;
		var dragging = false;
		var slice;
		var slices = [];
		var size = 1.05;
		var target = new THREE.Vector3(size, size, size); // create on init
		var $tooltip = document.getElementById("tooltip");
		var $text = document.getElementById("text");
		var popupTimer;
		var materials = {};

		document.querySelector("#modal .close").addEventListener("click", function (e) {
			MODAL.hide();
		});
		document.querySelector("#modal2 .close").addEventListener("click", function (e) {
			this.parentElement.parentElement.classList.remove("visible");
			this.parentElement.parentElement.style.opacity = 0;
		});

		$modal.addEventListener("click", function (e) {
			if (e.target.id == "modal") {
				MODAL.hide();
			}
		});

		function idlePop () {

			let x = document.body.offsetWidth/2;
			let y = document.body.offsetHeight/2;

			raycaster2.setFromCamera({x: 0, y: 0.051}, camera);
			var intersects = raycaster2.intersectObjects(scene.children, true);

			if (intersects[0] && intersects[0].distance < 100) {

				var object 		= intersects[0].object;
				var name 		= object.name;

				if (!BIODATA[name]) {
					$tooltip.style.display 		= "none";
					$tooltip.style.opacity 		= 0;
				}

				try {

					$tooltip.style.top 			= "15%";
					$tooltip.style.left 		= (x-($tooltip.offsetWidth/2))+ "px";

					if (object.name == hovered.name) {
						// do nothing
					} else {

						if (!!BIODATA[name]) {
							$tooltip.innerHTML 			= '<img src="'+BIODATA[name].idtag+'">';
							$tooltip.style.display 		= "block";
							$tooltip.style.opacity 		= 1;
						}

						for (var key in slices) {
							let slice = slices[key];
							tween(slice.scale, {x: 1, y: 1, z: 1}, {
								duration: 300, 
								easing : TWEEN.Easing.Quadratic.InOut,
							});
							slice.material = materials[slice.name];
						}

						if (!!BIODATA[name]) {

							hovered.slice 		= object;
							hovered.name 		= object.name;

							tween(object.scale, target, {
								duration: 300, 
								easing : TWEEN.Easing.Quadratic.InOut
							});

							var col = new THREE.MeshPhongMaterial({color: new THREE.Color("rgb(0, 17, 83)")});

							object.material = col;
						}

					}

				} catch (e) {
					console.log(e.message);
				}

			}
		}


		document.onkeydown = function (e) {

			if (e.keyCode == 27) { // esc

				hovered.name = "Sphere_fracturepart20";
				MODAL.show();

			} else if (e.keyCode == 192) { // `
				// idlePop2();
				hovered.name = "Sphere_fracturepart20";
				MODAL.show();
			} else if (e.keyCode == 49) { // 1

				console.log($tooltip.offsetWidth);
				console.log($tooltip.offsetHeight);
			} else if (e.keyCode == 50) { // 2

				model.rotation.y += Math.PI;

				// Math.PI * 2 = 6.28;
			} else if (e.keyCode == 51) { // 3
			}
		};

		var MODAL = {
			classes: [],
			visible: false,
			show: function () {
				MODAL.visible = true;

				let name = hovered.name;
				let biodata = BIODATA[name];

				let headerbg = biodata.headerbg;
				let someone = biodata.someone;
				let last_letter_fname = biodata.first_name.slice(-1);
				let caps = biodata.capabilities;
				let q2 = biodata.qualifications.column2;
				let cap1 = [], cap2 = [];

				// header
				document.getElementById("modal-title").innerHTML = biodata.title;
				document.getElementById("modal-subtitle").innerHTML = biodata.subtitle;
				// image
				document.getElementById("modal-header").style.backgroundImage = "url('"+headerbg+"')";
				// person is someone who...
				document.getElementById("modal-someone-header").innerHTML = (biodata.first_name+" is someone who...").toUpperCase();
				document.getElementById("someone-who").innerHTML = '\
					<tr>\
						<td><ul><li>'+someone.column1.join('</li><li>')+'</li></ul></td>\
						<td><ul><li>'+someone.column2.join('</li><li>')+'</li</ul></td>\
					</tr>\
				';

				// person's wish for the future
				if (["S", "s"].indexOf(last_letter_fname) > -1) {
					document.getElementById("modal-wish-header").innerHTML = (biodata.first_name+"' wish for the future").toUpperCase();
				} else {
					document.getElementById("modal-wish-header").innerHTML = (biodata.first_name+"'s wish for the future").toUpperCase();
				}
				document.getElementById("wish").innerHTML = (biodata.wish);

				// capabilities
				for (let i = 0; i < caps.length; i++) {
					let cap = caps[i];
					if ((caps.length%2 == 0) && i == caps.length -1) {
						continue;
					}
					if (i%2 == 0) {
						cap1.push(cap);
					} else {
						cap2.push(cap);
					}
				}
				document.getElementById("capabilities").innerHTML = '\
					<div id="capability-grid" class="flex">\
						<div id="capability-col-1"><ul><li>'+cap1.join('</li><li>')+'</li></ul></div>\
						<div id="capability-col-2"><ul><li>'+cap2.join('</li><li>')+'</li></ul></div>\
					</div>\
					<div id="odd-one-out">\
						<ul><li>'+caps[caps.length-1]+'</li></ul>\
					</div>';


				// qualifications
				document.getElementById("qualifications-1").innerHTML = biodata.qualifications.column1.join("<br>");
				if (Array.isArray(q2)) {
					document.getElementById("qualifications-2").innerHTML = q2.join("<br>");
				} else {
					document.getElementById("qualifications-2").innerHTML = '<b><i>'+q2.title+'</i></b><ul style="padding-left: 0; margin-left: 1.25em;"><li>'+q2.certifications.join("</li><li>")+'</li></ul>';
				}

				// extras
				document.getElementById("career_history").innerHTML = biodata.career_history;
				document.getElementById("modal-email").innerHTML = biodata.email;
				document.getElementById("modal-contact").innerHTML = biodata.contact;
				$modal.scrollTo(0, 0);
				$modal.classList.add("visible");
				// $modal.classList.add("chever");
				// $modal.classList.add("asd");
			},
			hide: function () {
				
				$modal.classList.remove("visible");
				setTimeout(function () {
					MODAL.visible = false;
				}, 550);
			}
		}

		window.addEventListener("mousedown", function (e) {

			if (e.target.id == "dragger") {
				dragmode = true;
				var mousecoords = getMousePos(e);
				prevX = mousecoords.x;
				prevY = mousecoords.y;
				// console.log("add grab");
				// document.body.classList.add("grab");
			}
		});

		var dragTimeout;
		window.addEventListener("mouseup", function (e) {
			dragmode = false;
			if (dragging == false) {
				// clearTImeout(dragTimeout);
				// dragTimeout = setTimeout(function () {
					raycast(e, false, true);
				// }, 500);
				
			}
		});


		window.addEventListener("focus", function (e) {

			dragmode = false;
			
			clearTimeout(popupTimer);
			popupTimer = null;
			hovered.slice = null;
			hovered.name = null;

			idleMode = false;
			clearTimeout(idleTimer);
			idleTimer = null;

			raycast(e, false);
		});

		window.addEventListener("blur", function (e) {
			dragmode = false;
			clearTimeout(popupTimer);
			popupTimer = null;
			hovered.slice = null;
			hovered.name = null;

			idleMode = false;
			clearTimeout(idleTimer);
			idleTimer = null;
		});

		document.addEventListener("mousemove", function(e) {

			// if (document.body.classList.contains("grab")) {
			// 	document.body.classList.add("grabbing");
			// } else {
			// 	document.body.classList.remove("grabbing");
			// }

			idleMode = false;
			clearTimeout(idleTimer);
			idleTimer = null;

			var mousecoords = getMousePos(e);
			var x = mousecoords.x;
			var y = mousecoords.y;
			var max = window.innerWidth;
			var diffX, diffY;

			dragging = dragmode;

			var speed = 0.003;
			if (typeof prevX !== undefined && typeof prevY !== undefined && model && dragmode == true) {
				if (prevX > x) { // turn left
					diffX = (prevX-x) * speed;
					diffX = diffX/2;
					model.rotation.y -= diffX;
				} else if (prevX < x) { // turn right
					diffX = (x-prevX) * speed;
					diffX = diffX/2;
					model.rotation.y += diffX;
				}
				if (prevY > y) { // turn up
					diffY = (prevY-y) * speed;
					diffY = diffY/2;
					if ((model.rotation.x-diffY) > -0.4) {
						model.rotation.x -= diffY;
					}
				} else if (prevY < y) { // turn down
					diffY = (y-prevY) * speed;
					diffY = diffY/2;
					if ((model.rotation.x+diffY) < 0.4) {
						model.rotation.x += diffY;
					}
				}
			}

			prevX = x;
			prevY = y;

			if (dragmode == false && MODAL.visible == false) {
				raycast(e, false);
			}

			if (!idleTimer) {
				idleTimer = setTimeout(function () {
					idleMode = true;
					clearTimeout(idleTimer);
					idleTimer = null;
				}, 1500); 
			}

		});


		function getMousePos (e) {
			return {x: e.clientX, y: e.clientY};
		}

		function tween (vectorToAnimate, target, options) {
			options = options || {};
			// get targets from options or set to defaults
			var to = target || THREE.Vector3(1.05, 1.05, 1.05),
			easing = options.easing || TWEEN.Easing.Quadratic.In,
			duration = options.duration || 2000;
			// create the tween
			var tweenVector3 = new TWEEN.Tween(vectorToAnimate)
				.to({ x: to.x, y: to.y, z: to.z}, duration)
				.easing(easing)
				.onUpdate(function (d) {
					if (options.update) { 
						options.update(d);
					}
				})
				.onComplete(function () {
					if(options.callback) options.callback();
				});
			// start the tween
			tweenVector3.start();
			// return the tween in case we want to manipulate it later on
			return tweenVector3;
		}

		var hovered = {
			slice: null,
			name: null,
			time: null,
			animated: false,
			animating: false,
		};


		var renderctr = 0;



		function raycast (e, touch = false, click = false) {

			var mouse = {};
			if (touch) {
				mouse.x = 2 * (e.changedTouches[0].clientX / window.innerWidth) - 1;
				mouse.y = 1 - 2 * (e.changedTouches[0].clientY / window.innerHeight);
			} else {
				mouse.x = 2 * (e.clientX / window.innerWidth) - 1;
				mouse.y = 1 - 2 * (e.clientY / window.innerHeight);
			}

			// update the picking ray with the camera and mouse position
			raycaster.setFromCamera(mouse, camera);

			// calculate objects intersecting the picking ray
			var intersects = raycaster.intersectObjects(scene.children, true);

			if (intersects[0] && intersects[0].distance < 100) {

				// document.getElementsByTagName("canvas")[0].style.cursor = "pointer";
				var object = intersects[0].object;
				var name = object.name;


				if (click == true) {

					if (hovered.name == object.name) {

						if (!!BIODATA[name]) {
							MODAL.show();
						}
					}
					
				} else {

					try {

						var coords = getMousePos(e);

						if (!!BIODATA[name]) {
							// $tooltip.innerHTML 			= '<img src="'+BIODATA[name].idtag+'">';
							$tooltip.style.display 		= "block";
							$tooltip.style.opacity 		= 1;
						} else {
							$tooltip.style.display 		= "none";
							$tooltip.style.opacity 		= 0;
						}

						if (idleMode == false) {

							// if (name == "Sphere_fracturepart20") {
								// $tooltip.style.top 			= (coords.y - 180)+ "px";
							// } else {
								// $tooltip.style.top 			= (coords.y - 150)+ "px";
								$tooltip.style.top 			= (coords.y - ($tooltip.offsetHeight+20))+ "px";
							// }
							$tooltip.style.left 		= (coords.x - ($tooltip.offsetWidth/2))+ "px";
						}
						
						if (name == hovered.name) {
							// console.log("dont change");
						} else {
							// console.log("change");
							
							// $text.innerHTML 			= BIODATA[name].title+"<span class=position>"+BIODATA[name].position+"</span>";

							if (!!BIODATA[name]) {
								$tooltip.innerHTML 			= '<img src="'+BIODATA[name].idtag+'">';
								$tooltip.style.display 		= "block";
								$tooltip.style.opacity 		= 1;
							}
							
							
							for (var key in slices) {


								let slice = slices[key];
								let scale = slice.scale;

								if (scale.x != 1 || scale.y != 1 || scale.z != 1) {
									tween(slice.scale, {x: 1, y: 1, z: 1}, {
										duration: 300, 
										easing : TWEEN.Easing.Quadratic.InOut,
									});
									slice.material = materials[slice.name];
								}
							}

							hovered.slice 		= object;
							hovered.name 		= object.name;

							tween(object.scale, target, {
								duration: 300, 
								easing : TWEEN.Easing.Quadratic.InOut
							});

							if (!!BIODATA[name]) {
								var col = new THREE.MeshPhongMaterial({color: new THREE.Color("rgb(0, 17, 83)")});
							} else {
								var col = new THREE.MeshPhongMaterial({color: new THREE.Color("rgb(240, 117, 57)")});
							}
							object.material = col;


							// add this to tween params to log 
							/* 
								update: function(d) {
									// console.log("Updating: " + d);
								},
								callback : function(){
									// console.log("Completed");
								}
							*/
						}

					} catch (e) {
						console.log(e.message);
					}
				}

			} else {
				// if (hovered.slice) {
					// clearTimeout(popupTimer);
					hovered.slice = null;
					hovered.name = null;
				// }
			}
		}

		var updatectr = 1;
		var neutral = false;
		function update() { // called on model load

			requestAnimationFrame(update);
			if (mixer) {
				mixer.update(clock.getDelta());
			}
			if (resizeRendererToDisplaySize(renderer)) {
				const canvas = renderer.domElement;
				camera.aspect = canvas.clientWidth / canvas.clientHeight;
				camera.updateProjectionMatrix();
			}

			// $debugger.innerHTML = idleMode ? "true" : "false";

			if (idleMode == true) {
				idlePop();
			}

			if (hovered.slice) {

				clearTimeout(popupTimer);
				$tooltip.style.opacity = 1;
				neutral = false;

			} else {

				if (neutral == false) {
					$tooltip.style.opacity 		= 0;

					for (var key in slices) {
						let slice = slices[key];
						tween(slice.scale, {x: 1, y: 1, z: 1}, {
							duration: 300, 
							easing : TWEEN.Easing.Quadratic.InOut,
						});
						slice.material = materials[slice.name];
					}

					// updatectr++;
					neutral = true;
				}

			}
			TWEEN.update();

			if (MODAL.visible == false) {
				model.rotation.y += 0.0008;
			} else {
				// model.rotation.y += 0.0002;
			}

			// $debugger.innerHTML = hovered.name;
			// $debugger2.innerHTML = popupTimer;

			renderer.render(scene, camera);
		}

		init(); 
		function init() {

			const MODEL_PATH = "low_poly_sphere_20_v2.obj";
			const canvas = document.querySelector("#c");
			let backgroundColor = 0xf1f1f1;
			// backgroundColor = 0x4c4c4c;

			// Init the scene
			scene 				= new THREE.Scene();
			scene.background 	= new THREE.Color(backgroundColor);
			// scene.fog 			= new THREE.Fog(backgroundColor, 60, 100);

			// Init the renderer
			renderer 			= new THREE.WebGLRenderer({canvas, antialias: true});
			renderer.shadowMap.enabled = true;
			renderer.setPixelRatio(window.devicePixelRatio);
			document.body.appendChild(renderer.domElement);


			// Add a camera
			camera = new THREE.PerspectiveCamera (
				50,
				window.innerWidth / window.innerHeight,
				0.1,
				1000
			);
			camera.position.z = 80; 
			camera.position.x = 0;
			camera.position.y = 0;

			const ship_material 	= new THREE.MeshBasicMaterial({color: "red"});
			const loader 			= new THREE.OBJLoader(); // instantiate a loader

			var ctr = 1;
			loader.load( // load a resource
				MODEL_PATH, // resource URL
				function (object) { // called when resource is loaded
					
					model = object;
					model.traverse(function (child) {

						if (child instanceof THREE.Mesh) {
							child.castShadow = true;
							child.receiveShadow = true;
							if (ctr == 2) {
								// child.material = new THREE.MeshPhongMaterial({
								// 	color: "orange",
								// });

								slice = child;
							}
							ctr++;
							slices.push(child);
							materials[child.name] = child.material;
						}
					});

					// model.scale.set(0.25, 0.25, 0.25);
					model.scale.set(0.55, 0.55, 0.55);
					
					model.position.z 	= (!true) ? -30 : -30; 
					model.position.x 	= (!true) ? -10 : 0;
					model.position.y 	= (!true) ? -3 : 0;
					model.name 			= "MOWDEL";
					if (!true) {
						model.rotation.y    = Math.random() * Math.PI;
					}
					model.rotation.y -= 0.5;

					loaderAnim.remove();
					mixer = new THREE.AnimationMixer(model);

					let hemiLight = new THREE.HemisphereLight(0xffffff, 0xffffff, 0.61); // Add lights
					hemiLight.position.set(1000, 5000, 0);
					scene.add(hemiLight); // Add hemisphere light to scene

					let d = 8.25;
					let dirLight = new THREE.DirectionalLight(0xffffff, 0.54);
					dirLight.position.set(-8, 12, 8);
					dirLight.castShadow = true;
					dirLight.shadow.mapSize = new THREE.Vector2(1024, 1024);
					dirLight.shadow.camera.near = 0.1;
					dirLight.shadow.camera.far = 1500;
					dirLight.shadow.camera.left = d * -1;
					dirLight.shadow.camera.right = d;
					dirLight.shadow.camera.top = d;
					dirLight.shadow.camera.bottom = d * -1;
					scene.add(dirLight); // Add directional Light to scene


					// Floor
					let floorGeometry = new THREE.PlaneGeometry(5000, 5000, 1, 1);
					let floorMaterial = new THREE.MeshPhongMaterial({
						color: 0xeeeeee,
						shininess: 1,
					});

					let floor = new THREE.Mesh(floorGeometry, floorMaterial);
					floor.rotation.x = -0.5 * Math.PI;
					floor.rotation.x = -0.5 * Math.PI;
					floor.receiveShadow = true;
					floor.position.y = -31;
					floor.name = "floor";
					floor.wireframe = true;
					// scene.add(floor); 


					let geometry 	= new THREE.SphereGeometry(50, 40, 40);
					let material 	= new THREE.MeshBasicMaterial({ color: 0xf2ce2e }); // 0xf2ce2e 
					let sphere 		= new THREE.Mesh(geometry, material);
					sphere.name 	= "GREEN SPHERE";
					sphere.position.z = (!true) ? -15 : -80;
					sphere.position.y = (!true) ? -2.5 : 0;
					sphere.position.x = (!true) ? -0.25 : 0;
					// scene.add(sphere);  

					scene.add(model);
					update();

					idleTimer = setTimeout(function () {
						idleMode = true;
						clearTimeout(idleTimer);
						idleTimer = null;
					}, 800);
					// renderer.render(scene, camera);
				},
				// called when loading is in progresses
				function (xhr) {
					console.log((xhr.loaded/xhr.total*100)+"% loaded");
				},
				// called when loading has errors
				function (error) {
					console.log("An error happened");
				}
			);

			
		}

		function resizeRendererToDisplaySize(renderer) {
			const canvas = renderer.domElement;
			let width = window.innerWidth;
			let height = window.innerHeight;
			let canvasPixelWidth = canvas.width / window.devicePixelRatio;
			let canvasPixelHeight = canvas.height / window.devicePixelRatio;

			const needResize =
			canvasPixelWidth !== width || canvasPixelHeight !== height;
			if (needResize) {
				renderer.setSize(width, height, false);
			}
			return needResize;
		}

	})();

</script>