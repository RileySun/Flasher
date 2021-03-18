import { h, Component, render } from 'https://unpkg.com/preact@latest?module';
import {useState} from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

export default function Course(props) {
	return html`
		<div class="Course" id=${props.id} onClick=${props.changeCourse}>
			<div class="Course-Icon">${props.icon}</div>
			<div class="Course-Name">${props.name}</div>
			<span class="Course-Difficulty">${props.difficulty}</span>
		</div>
	`;
}