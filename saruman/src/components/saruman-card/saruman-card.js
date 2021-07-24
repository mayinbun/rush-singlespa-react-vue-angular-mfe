import React, { Fragment } from 'react';
import saruman from './saruman.jpeg';

export class SarumanCard extends React.Component {
    render() {
        return (
            <Fragment>
                <h3>Saruman the Evil Wizard (aka the opposite of Gandalf)</h3>
                <img alt="saruman" src={saruman}/>
            </Fragment>
        )
    }
}
