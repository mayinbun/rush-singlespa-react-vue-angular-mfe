import React, { Fragment } from 'react';
import ReactDOM from 'react-dom';
import { Helmet } from 'react-helmet';
import { SarumanCard } from './components/saruman-card/saruman-card';
import singleSpaReact from 'single-spa-react';

import favicon from './favicon.ico';

export default class App extends React.Component {
    render() {
        return (
            <Fragment>
                <Helmet>
                    <title>Saruman Reacts</title>
                    <link rel="icon" type="image/x-icon" href={ favicon }/>
                </Helmet>
                <SarumanCard/>
            </Fragment>
        )
    }
}

export const { bootstrap, mount, unmount } = singleSpaReact({
    React,
    ReactDOM,
    rootComponent: App,
});
