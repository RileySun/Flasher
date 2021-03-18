import { h, Component, render} from 'https://unpkg.com/preact@latest?module';
import {useState, useCallback} from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';

import Card from "./Components/Card.js";
import Course from "./Components/Course.js";
import ProgressBar from "./Components/ProgressBar.js";
import getDB from "./Components/DB.js";

const html = htm.bind(h);
window.DB = getDB();

function App(props) {
	const [state, setState] = useState();
	const [reversed, setReversed] = useState(false);
	const [finished, setFinished] = useState(false);
	const [course, setCourse] = useState(0);
	const [cardNumber, setCardNumber] = useState(0);
	const [score, setScore] = useState(0);
	let progress = ((Math.floor((cardNumber/DB[course].content.length)* 1000))/10);
	
	const party = Party();
	let confettiActive = false;
	
	function getNextCard() {
		const totalCards = DB[course].content.length;
		if (cardNumber < totalCards - 1) {
			const newCardNumber = cardNumber + 1;
			setCardNumber(newCardNumber);
		}
		else {
			setFinished(true);
			setState([]);
		}
	}
	function updateScore(correct) {
		const newScore = (correct) ? score + 1 : score;
		setScore(newScore);
	}
	function showCourses() {
		document.getElementById('Course-List').style.display = 'block';
	}
	function changeCourse(id) {
		setCardNumber(0);
		setScore(0);
		setFinished(false);
		setCourse(id);
		setState([]);
		document.getElementById('Course-List').style.display = 'none';
	}
	function loadImportDialog() {
		document.getElementById('IO-Import-Hidden').click();
	}
	function importData(e) {
		e.preventDefault;
		const file = e.target.files[0];
		if (file) {
			const reader = new FileReader();
			reader.readAsText(file, "UTF-8");
			reader.onload = (evt) => {
				window.DB = JSON.parse(evt.target.result);
				setCardNumber(0);
				setFinished(false);
				setState([]);
			}
			reader.onerror = (evt) => {alert('Invalid Data');}
		}
	}
	function confetti() {
		if (confettiActive) {
			party.stop();
			confettiActive = false;
		}
		else {
			party.start();
			confettiActive = true;
		}
	}
	
	const currentCard = DB[course].content[cardNumber];
	const courseList = DB.map(course => (
		html`<${Course} icon=${course.icon} name=${course.name} difficulty=${course.difficulty} changeCourse=${() => changeCourse(DB.indexOf(course))} />`
	));
	const scoreDisplay = 'Score ' + ((Math.floor((score/DB[course].content.length)* 1000))/10) + '%';
	
	const forwardCard = html`<${Card} id="0" question=${currentCard.question} answer=${currentCard.answer} getNextCard=${getNextCard} updateScore=${updateScore} />`;
	const backwardsCard = html`<${Card} id="0" question=${currentCard.answer} answer=${currentCard.question} getNextCard=${getNextCard} updateScore=${updateScore} />`;
	const finishedCard = html`<div class="Card Card-Finished"><div class="Card-Text">Complete: ${scoreDisplay}</div></div>`;
	const scoreCorner = html`<div class="Course-Score">${scoreDisplay}</div>`;
	
	return html`
		<div class="Controls">
			<IMG class="Controls-Icon" src="" alt="Choose Course" title="Choose Course" src="Assets/New.svg" onClick="${showCourses}" /><!--
		 --><IMG class="Controls-Icon" src="" alt="Choose Course" title="Choose Course" src="Assets/Upload.svg" onClick="${loadImportDialog}" />
		 	<form class="Hidden"><input id="IO-Import-Hidden" type="file" onchange="${importData}" /></form>
		</div>
		<div id="Course-List" class="Course-List">${courseList}</div>
		<h1 class="Course-Title">${DB[course].name}</h1>
		${finished ? '' : scoreCorner}
		${finished ? finishedCard : reversed ? backwardsCard : forwardCard}
		<${ProgressBar} progress=${finished ? 100 : progress} />
		<IMG class="Confetti" src="Assets/Confetti.svg" onClick=${confetti} />
		<div class="Footer">© 2021 - Sunshine</div>
	`;
}

render(html`<${App} />`, document.body);