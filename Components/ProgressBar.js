import { h, Component, render } from 'https://unpkg.com/preact@latest?module';
import {useState} from 'https://unpkg.com/preact@latest/hooks/dist/hooks.module.js?module';
import htm from 'https://unpkg.com/htm?module';

const html = htm.bind(h);

export default function ProgressBar(props) {
	return html`
		<div class="Progress-Display">
			<div class="Progress-Bar" id="Progress-Bar" style="width:${props.progress}%"></div>
		</div>
	`;
}