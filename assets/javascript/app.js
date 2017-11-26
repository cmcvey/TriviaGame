
var questions = [{
	question: "Who killed Albus Dumbledore?",
	answer: "Snape",
	choices: ["Snape", "Voldemort", "Harry", "Bellatrix"]
}, {
	question: "What is Voldemort's final horcrux?",
	answer: "Nagini",
	choices: ["Locket", "Cup", "Nagini", "Diary"]
}, {
	question: "Which of the following is not an unforgivable curse?",
	answer: "Sectumsempra",
	choices: ["Avada Kedavra", "Imperio", "Sectumsempra", "Crucio"]
}, {
	question: "Who was Harry's first Defense Against the Dark Arts teacher?",
	answer: "Professor Quirrel",
	choices: ["Professor McGonnagal", "Professor Lupin", "Professor Snape", "Professor Quirrel"]
}, {
	question: "What did Harry use to destroy Tom Riddle's diary?",
	answer: "basilisk fang",
	choices: ["Sword of Gryffindor", "basilisk fang", "his wand", "his fist"]
}, {
	question: "What kind of creature was Professor Lupin?",
	answer: "Werewolf",
	choices: ["Ghost", "Vampire", "Shapeshifter", "Werewolf"]
}, {
	question: "What animal is on the Gryffindor sheild?",
	answer: "Lion",
	choices: ["Lion", "Snake", "Phoenix", "Dragon"]
}, {
	question: "What is the name of the creature guarding the Chamber of Secrets?",
	answer: "Fluffy",
	choices: ["Ginger", "Fluffy", "Wormtail", "Crookshanks"]
}, {
	question: "Who dies in the Tri-Wizard Tournament?",
	answer: "Cedric",
	choices: ["Fleur", "Ginny", "Cedric", "Neville"]
}, {
	question: "What kind of wood is Harry's wand made from?",
	answer: "Holly",
	choices: ["Rowan", "Holly", "Oak", "Ash"]
}]

var questionIndex = 0

var score = 0

var time = null

var interval = null

function timer () {
	time = 10;
	clearInterval(interval);
	decrement();
	interval = setInterval(decrement, 1000);
}

function advanceGame() {
	questionIndex++;
	gameplay();
}

function decrement () {
	$("#timer").text(time);
	if (time === 0) {
		clearInterval(interval);
		$("li.answer").hide();
		$("#incorrect").show();
		setTimeout(advanceGame, 3000);
	}
	time--;
}

$("#play-game, #play-again").on("click", function() {
	$("#section-start").hide();
	$("#section-play").show();
	$("#section-gameover").hide();
	score = 0;
	questionIndex = 0;
	gameplay();
})

$("li.answer").on("click", function(event) {
	var clicked = $(this).text();
	var correct = questions[questionIndex].answer;
	var selector = "#incorrect";
	$("li.answer").hide();
	clearInterval(interval);
	if (clicked === correct) {
		score++;
		selector = "#correct";
	}

	$(selector).show();
	setTimeout(advanceGame, 3000);
	
})

function gameplay() {
	$("li.answer").show();
	$("#correct, #incorrect").hide();
	if (questionIndex === questions.length) {
		$("#score").text(((score / questions.length) * 100) + "%");
		$("#section-gameover").show();
		$("#section-play").hide();

	} else {
		timer();
		var current = questions[questionIndex];
		$("#incorrect").text(current.answer);
		$("#question").text(current.question);
		$("li.answer").each(function(i) {
			$(this).text(current.choices[i]);	
		})
	}	
}
