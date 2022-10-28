const questions = [
	{
		question: "Яка мова працює в браузері?",
		answers: ["Java", "C", "Python", "JavaScript"],
		correct: 4,
	},
	{
		question: "Що означає CSS?",
		answers: [
			"Central Style Sheets",
			"Cascading Style Sheets",
			"Cascading Simple Sheets",
			"Cars SUVs Sailboats",
		],
		correct: 2,
	},
	{
		question: "Що означає HTML?",
		answers: [
			"Hypertext Markup Language",
			"Hypertext Markdown Language",
			"Hyperloop Machine Language",
			"Helicopters Terminals Motorboats Lamborginis",
		],
		correct: 1,
	},
	{
		question: "В якому році був створений JavaScript?",
		answers: ["1996", "1995", "1994", "всі відповіді не вірні"],
		correct: 2,
	},
];

const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;

function clearPage() {
	headerContainer.innerHTML = '';
	listContainer.innerHTML = '';
}

function showQuestion() {
	//question
	const headerTemplate = `<h2 class="title">%title%</h2>`;
	const title = headerTemplate.replace('%title%', questions[questionIndex]['question']);
	headerContainer.innerHTML = title;

	let answerNumber = 1;
	//variant answers
	for (answerText of questions[questionIndex]['answers']) {

		const questionTemplate =
			`<li>
		\t\t\t\t<label>
		\t\t\t\t\t<input value="%number%" type="radio" class="answer" name="answer" />
		\t\t\t\t\t<span>%answer%</span>
		\t\t\t\t</label>
		\t\t\t</li>`;

		const answerHTML = questionTemplate
			.replace('%answer%', answerText)
			.replace('%number%', answerNumber);

		listContainer.innerHTML += answerHTML;
		answerNumber++;
	}
}

function checkAnswer() {
	//find selected button
	const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

	//if answer don't find - nothing to do
	if (!checkedRadio) {
		submitBtn.blur();
		return
	}

	//find out user answer
	const userAnswer = parseInt(checkedRadio.value);

	//if answer correct - add count
	if (userAnswer === questions[questionIndex]['correct']) {
		score++;
	}
	if (questionIndex !== questions.length -1) {
		questionIndex++;
		clearPage();
		showQuestion();
		return;
	} else {
		clearPage();
		showResults();
	}
}

function showResults() {
	console.log('showResults started');

	const resultsTemplate =
		`<h2 class="title">%title%</h2>
	\t\t\t<h3 class="summary">%message%</h3>
	\t\t\t<p class="result">%result%</p>`;


	let title, message;

	if (score === questions.length) {
		title = 'Вітаємо! 🤸🏻‍';
		message = 'Ви відповіли вірно на всі запитання! 🥇';
	} else if ((score * 100) / questions.length >= 50) {
		title = 'Непоганий результат! 🤸🏻‍';
		message = 'Ви відповіли вірно на більшість запитань! 🥈';
	} else {
		title = 'Спробуте ще раз! 🤸🏻‍';
		message = 'Ви відповіли вірно на меншість запитань! 🥈';
	}

	let result = `${score} з ${questions.length}`;

	const finalMessage = resultsTemplate
		.replace('%title%', title)
		.replace('%message%', message)
		.replace('%result%', result);

	headerContainer.innerHTML = finalMessage;

	submitBtn.blur();
	submitBtn.innerText = 'Почати знову';
	submitBtn.onclick = () => history.go();
}