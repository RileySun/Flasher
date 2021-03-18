import { h, Component, render } from 'https://unpkg.com/preact@latest?module';
import {useState} from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

export default function Card(props) {
	const [flipped, setFlip] = useState(false);
	
	function flipCard(e) {
		const el = document.getElementById('Card-'+props.id);
		el.addEventListener('animationend', () => {
			setFlip(!flipped);
			el.style.animation = '0.5s ShowCard forwards';
		}, false);
		el.style.animation = '0.5s HideCard forwards';
	}
	function newCard(correct) {
		const el = document.getElementById('Card-'+props.id);
		props.updateScore(correct);
		el.addEventListener('animationend', () => {
			setFlip(false);
		}, false);
		//Has to do a timeout instead of above in eventListener or it fires twice... *shurgs*
		setTimeout(props.getNextCard, 500);
		el.style.animation = '0.5s HideCard forwards';
	}
	
	const unflippedTemplate = html`
		<div id="Card-${props.id}" class="Card UnFlipped" onClick="${flipCard}">
			<IMG class="Card-Icon" src="Assets/Question.svg" title="Question"/>
			<div class="Card-Text">${props.question}?</div>
		</div>
	`;
	const flippedTemplate = html`
		<div id="Card-${props.id}" class="Card Flipped" >
			<IMG class="Card-Icon" src="Assets/Answer.svg" title="Answer"/>
			<div class="Card-Text">${props.answer}</div>
			<div class="Card-Answer">
				<IMG class="Card-Answer-Icon" src="Assets/Correct.svg" onClick=${() => {newCard(true);}} />
				<IMG class="Card-Answer-Icon" src="Assets/Wrong.svg" onClick=${() => {newCard(false);}} />
			</div>
		</div>
	`;
	
	return html`${flipped ? flippedTemplate : unflippedTemplate}`;
}