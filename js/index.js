var i = 0;


var game = {
	counter : 0,
	colors : ["blue", "red", "yellow", "green"],
	memory : [],
	turn : [],
	resetColors : {
		blue: "#0a8484", 
		red: "#910f25", 
		yellow: "#995b0c", 
		green: "#208e0f"
	},
	activeColors : {
		blue: "#08BDBD", 
		red: "#F21B3F", 
		yellow: "#FF9914", 
		green: "#29BF12"
	},
	strict : false
}


function newGame() {
	gameReset();
}

function gameReset() {
	game.memory = [];
	game.turn = [];
	game.counter = 0;
	i = 0;
	document.getElementById("counter").innerHTML = game.counter;
	round();
}

function round() {
	setTimeout(
		function(){
			move();
			i++;
			console.log("i = " + i);
			if (i <= game.counter){
				round();
			}
		}				
	,700);

	console.log("your turn");
	game.turn = [];
}

function move() {
	var tones = {
		blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'), 
		red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'), 
		yellow:new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'), 
		green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
	};

	var select = game.colors[Math.floor(Math.random() * 4)]; // returns string "blue", "red", "yellow", or "green"
	game.memory.push(select);
	
	var elem = document.getElementById(select);
	elem.style.backgroundColor = game.activeColors[select];
	console.log("added " + select + "to class");
	
	var audio = tones[select];
	console.log("playing audio for " + select);
	audio.play();
	
	setTimeout(function(){
		elem.style.backgroundColor = game.resetColors[select];
		audio.load();
		audio.src = "";
	}, 300);
}


function addToTurn(x) {
	
	game.turn.push(x);
	var elem = document.getElementById(x);
	elem.style.backgroundColor = game.activeColors[x];
	console.log("added " + x);
	setTimeout(function(){
		elem.style.backgroundColor = game.resetColors[x];
	}, 100);
	check();
}

function playerTurn() {
	
}

function check() {
	if (game.memory[game.turn.length - 1] !== game.turn[game.turn.length - 1]) {
		console.log("wrong");
		game.turn = [];
	}
	else {
		if (game.turn.length == game.memory.length) {
			if (game.counter == 10) {
				document.getElementById("counter").innerHTML = "You win!";
			}
			else {
				game.counter++;
				document.getElementById("counter").innerHTML = game.counter;
				game.memory = [];
				i = 0;
				round();
			}
		}
	}
	
}

