"use strict"

var Memory = {

	clicks: 0,

	totalClicks: 0,

	winLimit: 4,

	points: 0,

	// Get all .box, and add class "unflipped"
	boxes: document.getElementsByClassName('box'),

	// Run on page load
	init: function() {
		var boxes = Memory.boxes;
		for (var i = boxes.length - 1; i >= 0; i--) {
			boxes[i].className += ' unflipped incorrect';

			// Add event listner for "click"
			boxes[i].addEventListener('click', function(){
				Memory.clickFunction(this);
			}, false);
		};

		resize();

		Memory.shuffle();
	},

	// Click function
	clickFunction: function(element) {

		// @todo – count number of "corrects"
		if(Memory.clicks < 2 && hasClass(element, 'active') == false) {
			// @todo – check if has class inactve or not

			// Get old
			var oldBox = document.querySelectorAll('.box.active.incorrect');

			element.className = element.className.replace('unflipped', 'active');

			if(oldBox.length > 0) {
				oldBox = oldBox[0];
				if (oldBox.className == element.className) {

					// Set classes
					oldBox = Memory.setCorrectClass(oldBox);
					element = Memory.setCorrectClass(element);

					// Give points
					Memory.points ++;
				}
			}

			Memory.clicks ++;
			Memory.totalClicks ++;

			// Check if win
			if(Memory.points == Memory.winLimit) {
				setTimeout("Memory.win();", 1100);


			}
		}

		if(Memory.clicks >= 2) {
			// fetch matched classes
			// classes stay flipped
			setTimeout("Memory.hideIncorrectBoxes()", 1000);
		}
	},

	// Shuffle
	shuffle: function() {
		var clonedBoxes = [];

		for (var i = Memory.boxes.length - 1; i >= 0; i--) {
			clonedBoxes.push(Memory.boxes[i]);
		}

		var memoryWrapper = document.getElementById('memory-wrapper');

		var shuffledBoxes = Memory.shuffleArray(clonedBoxes);

		for (var i = shuffledBoxes.length - 1; i >= 0; i--) {
			memoryWrapper.appendChild(shuffledBoxes[i]);
		}

		Memory.boxes = [];

		Memory.boxes = shuffledBoxes;
	},

	// Shuffle the array (http://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array)
	shuffleArray: function(array) {
		var currentIndex = array.length, temporaryValue, randomIndex ;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex --;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;
	},

	// Replace incorrect with the correct class
	setCorrectClass: function(element) {
		return element.className = element.className.replace('incorrect', 'correct');
	},

	// Win!
	win: function() {

		var points = document.getElementsByClassName('points');
    	points.item(0).innerHTML = Memory.totalClicks;

		var winBox = document.getElementsByClassName('winbox');
		showBox(winBox[0]);
	},


	hideIncorrectBoxes: function() {
		// @todo hide "incorrect" boxes

		var clickedBoxes = document.querySelectorAll('.box.active.incorrect');
		for (var i = clickedBoxes.length - 1; i >= 0; i--) {
			clickedBoxes[i].className = clickedBoxes[i].className.replace('active', 'unflipped');
		}

		// Reset clicks
		Memory.clicks = 0;
	}

};

// Detects size of window/screen
window.onresize = resize;
function resize() {

	var imgs = document.getElementsByTagName('img');

	// Replace current typography images to new size when screen is < 620
	//http://stackoverflow.com/questions/16787306/how-to-change-an-image-path-based-on-screen-width
	for (var i = 0; i < imgs.length; i++) {
		if (screen.width < 620) {
			imgs[i].src = imgs[i].src.replace('img/type-big', 'img/type-small');
		} else {
			imgs[i].src = imgs[i].src.replace('img/type-small', 'img/type-big');
		}
	}
}

window.onload = Memory.init;

// Check if element has class
// http://stackoverflow.com/questions/5898656/test-if-an-element-contains-a-class
function hasClass(element, className) {
    return ((' ' + element.className + ' ').indexOf(' ' + className + ' ') > -1);
};

var msgBxs = document.getElementsByClassName('msgbx');
var msgBtn = document.getElementsByClassName('js-font-click');
var clsBtn = document.querySelectorAll('.closebutton a');

for (var i = msgBtn.length - 1; i >= 0; i--) {
	msgBtn[i].addEventListener('click', function(e){
		e.preventDefault();

		// Show appropriate box
		var bx = document.querySelectorAll('.msgbx' + '.' + this.dataset.target);
		showBox(bx[0]);
		return false;
	});
};

for (var i = clsBtn.length - 1; i >= 0; i--) {
	clsBtn[i].addEventListener('click', function(e){
		e.preventDefault();
		document.getElementById('shim').style.display = 'none';

		var bxs = document.getElementsByClassName('msgbx');
		for (var i = bxs.length - 1; i >= 0; i--) {
			bxs[i].style.display = 'none';
		};
	});
};

function showBox(box){
	box.style.display = 'block';
	// Show "shim"
	document.getElementById('shim').style.display = 'block';
}
