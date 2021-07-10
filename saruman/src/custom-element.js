import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

export class SarumanApp extends HTMLElement {
    connectedCallback() {
        ReactDOM.render(<App/>, this);
    }
}

customElements.define('saruman-app', SarumanApp)
