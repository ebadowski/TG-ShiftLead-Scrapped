import React, { Component } from 'react';
import './style.css';

class FPHeader extends Component {
    constructor(props) {
        //console.log(props)
        super(props);
        this.state = {
            shift: props.shift
        };


    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            shift: nextProps.shift
        });
    }

    render() {
        return (
            <div className="row">
                <div className='col s3 left'>

                    {
                        this.state.shift
                            ? (<span>
                                <a
                                    className="btn-floating btn waves-effect waves-light red"
                                    onClick={() => this.props.switchView()}
                                >
                                    <i className="material-icons">timelapse</i>
                                </a> PM
                            </span>)
                            : (<span>
                                <a
                                    className="btn-floating btn waves-effect waves-light red"
                                    onClick={() => this.props.switchView()}
                                >
                                    <i className="material-icons">access_time</i>
                                </a> AM
                            </span>)

                    }

                </div>
            </div>
        );
    }
}

export default FPHeader;
