import React, { Fragment } from 'react';
import gandalf from './Gandalf.jpg';

export class GandalfCard extends React.Component {
    render() {
        return (
            <Fragment>
                <h3>Gandalf the White (aka how Saruman should be)</h3>
                <img alt="gandalf" src={gandalf}/>
            </Fragment>
        )
    }
}
