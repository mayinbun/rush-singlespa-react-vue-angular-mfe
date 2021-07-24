import React, { Fragment } from 'react';
import gandalf from '../../assets/gandalf.jpg'

export class GandalfCard extends React.Component {
    render() {
        return (
            <Fragment>
                <h3>Gandalf the White (aka evolved version of Gandalf)</h3>
                <img alt="gandalf" src={gandalf}/>
            </Fragment>
        )
    }
}
