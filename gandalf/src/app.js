import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { GandalfCard } from './components/gandalf-card/gandalf-card';

import favicon from './favicon.ico';

export default class App extends React.Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Gandalf Reacts</title>
                    <link rel="icon" type="image/x-icon" href={favicon} />
                </Helmet>
                <GandalfCard/>
            </Fragment>
        )
    }
}

export class GandalfApp extends HTMLElement {
    connectedCallback() {
        ReactDOM.render(<App/>, this);
    }
}

customElements.define('gandalf-app', GandalfApp)
