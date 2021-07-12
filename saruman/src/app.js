import React, { Fragment } from 'react';
import { Helmet } from 'react-helmet';
import { SarumanCard } from './components/saruman-card/saruman-card';

import favicon from './favicon.ico';

export default class App extends React.Component {
    componentDidCatch(error, errorInfo) {
        console.error(error);
    }

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
