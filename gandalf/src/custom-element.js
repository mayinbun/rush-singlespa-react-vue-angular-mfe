import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

export class GandalfApp extends HTMLElement {
    connectedCallback() {
        ReactDOM.render(<App/>, this);
    }
}

customElements.define('gandalf-app', GandalfApp)
