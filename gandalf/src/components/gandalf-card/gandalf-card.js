import React, { Fragment } from 'react';
import gandalf from '../../assets/gandalf-the-grey.jpg'

export class GandalfCard extends React.Component {
    render() {
        return (
            <Fragment>
                <h3>Gandalf the Grey (aka the weaker version)</h3>
                <img alt="gandalf" src={gandalf}/>
            </Fragment>
        )
    }
}
