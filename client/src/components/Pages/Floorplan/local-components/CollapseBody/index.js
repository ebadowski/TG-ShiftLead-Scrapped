import React, { Component } from 'react';
import './style.css';

class CollapseBody extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {

        };
    }

    componentWillReceiveProps(nextProps) {
        this.setState({

        });
    }

    render() {
        return (
            <div className="collapsible-body">
                <div className="row">
                    Hi
                </div>
            </div>
        );
    }
}

export default CollapseBody;
