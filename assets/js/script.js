var questions = [
    {
      title: "Commonly used data types DO NOT include:",
      choices: ["strings", "booleans", "alerts", "numbers"],
      answer: "alerts"
    },
    {
      title: "The condition in an if / else statement is enclosed within _____ ",
      choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "Arrays in JavaScript can be used to store _____",
      choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
      answer: "all of the above"
    },
    {
      title: "String values must be enclosed within _____ when being assigned to varialbles",
      choices: ["commas", "curly brakets", "quotes", "parentheses"],
      answer: "quotes"
    },
    {
      title: "The condition in an if/else statement is enclosed within _____ ",
      choices: ["quotes", "curly brakets", "parentheses", "square brackets"],
      answer: "parentheses"
    },
    {
      title: "A very useful tool used during development and debugging for printing content to the debugger is:",
      choices: ["JavaScript", "terminal/bash", "for loops", "console.log"],
      answer: "console.log"
    },
  ];

const initialTime = 75;
var time = 75;
var score = 0;
var qCount = 0;
var timeset;
var answers = document.querySelectorAll('#quizHolder button');

var recordsArray = [];
	(localStorage.getItem('recordsArray')) ? recordsArray = JSON.parse(localStorage.getItem('recordsArray')): recordsArray = [];

var queryElement = (element) => {
	return document.querySelector(element);
	}

var setQuestionData = () => {
		queryElement('#quizHolder p').innerHTML = questions[qCount].title;
		queryElement('#quizHolder button:nth-of-type(1)').innerHTML = `1. ${questions[qCount].choices[0]}`;
		queryElement('#quizHolder button:nth-of-type(2)').innerHTML = `2. ${questions[qCount].choices[1]}`;
		queryElement('#quizHolder button:nth-of-type(3)').innerHTML = `3. ${questions[qCount].choices[2]}`;
		queryElement('#quizHolder button:nth-of-type(4)').innerHTML = `4. ${questions[qCount].choices[3]}`;
	}

var onlyDisplaySection = (element) => {
		let sections = document.querySelectorAll("section");
		Array.from(sections).forEach((userItem) => {
			userItem.classList.add('hide');
		});
		queryElement(element).classList.remove('hide');
	}

var recordsHtmlReset = () => {
		queryElement('#highScores div').innerHTML = "";
		var i = 1;
		recordsArray.sort((a, b) => b.score - a.score);
		Array.from(recordsArray).forEach(check =>
		{
			var scores = document.createElement("div");
			scores.innerHTML = i + ". " + check.initialRecord + " - " + check.score;
			queryElement('#highScores div').appendChild(scores);
			i = i + 1
		});
		i = 0;
		Array.from(answers).forEach(answer => {
			answer.classList.remove('disable');
		});
	}

queryElement("#scores").addEventListener("click", (e) => {
		e.preventDefault();
		clearInterval(clock);
		queryElement('#time').innerHTML = 0;
		time = initialTime;
		score = 0;
		qCount = 0;
		onlyDisplaySection("#highScores");
		recordsHtmlReset();
		});

var scoreIndicator = () => {
		clearTimeout(timeset);
		timeset = setTimeout(() => {
		queryElement('#scoreIndicator').classList.add('invisible');
		}, 1000);
	}


var quizUpdate = (answerCopy) => {
		queryElement('#scoreIndicator p').innerHTML = answerCopy;
		queryElement('#scoreIndicator').classList.remove('invisible', scoreIndicator());
		Array.from(answers).forEach(answer =>
		{
		answer.classList.add('disable');
		});
    	setTimeout(() => {
			if (qCount === questions.length) {
				onlyDisplaySection("#finish");
				time = 0;
				queryElement('#time').innerHTML = time;
			} 
            else {
				setQuestionData();
				Array.from(answers).forEach(answer => {
					answer.classList.remove('disable');
				});
			}
		}, 1000);
	}

var myTimer = () => {
	if (time > 0) {
		time = time - 1;
		queryElement('#time').innerHTML = time;
	} else {
		clearInterval(clock);
		queryElement('#score').innerHTML = score;
		onlyDisplaySection("#finish");
	}
    }

var clock;
	queryElement("#intro button").addEventListener("click", (_e) => {
		setQuestionData();
		onlyDisplaySection("#quizHolder");
		clock = setInterval(myTimer, 1000);
	});



Array.from(answers).forEach(check => {
	check.addEventListener('click', function (_event) {
		if (this.innerHTML.substring(3, this.length) === questions[qCount].answer) {
			score = score + 1;
			qCount = qCount + 1;
			quizUpdate("Correct");
		}
        else{
			time = time - 10;
			qCount = qCount + 1;
			quizUpdate("Wrong");
			}
		});
	});

var errorIndicator = () => {
		clearTimeout(timeset);
		timeset = setTimeout(() => {
		queryElement('#errorIndicator').classList.add('invisible');
		}, 3000);
	}

queryElement("#reset").addEventListener("click", () => {
		time = initialTime;
		score = 0;
		qCount = 0;
		onlyDisplaySection("#intro");
		});

queryElement("#clearScores").addEventListener("click", () => {
		recordsArray = [];
		queryElement('#highScores div').innerHTML = "";
		localStorage.removeItem('recordsArray');
		});



queryElement("#records button").addEventListener("click", () => {
		let initialsRecord = queryElement('#initials').value;
		if (initialsRecord === ''){
			queryElement('#errorIndicator p').innerHTML = "You need at least 1 character";
			queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
		} 
		else if (initialsRecord.match(/[[A-Za-z]/) === null) {
			queryElement('#errorIndicator p').innerHTML = "Only letters for initials allowed.";
			queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
			} 
		else if (initialsRecord.length > 5) {
				queryElement('#errorIndicator p').innerHTML = "Maximum of 5 characters allowed.";
				queryElement('#errorIndicator').classList.remove('invisible', errorIndicator());
			} 
		else {
			recordsArray.push({
				"initialRecord": initialsRecord,
				"score": score
				});
				localStorage.setItem('recordsArray', JSON.stringify(recordsArray));
				queryElement('#highScores div').innerHTML = '';
				onlyDisplaySection("#highScores");
				recordsHtmlReset();
				queryElement("#initials").value = '';
			}
		});


