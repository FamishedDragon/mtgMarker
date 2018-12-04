import React, { Component } from 'react';
import {Icon} from "antd";

class Loading extends Component {

    render() {
        return (
            <div>
                <p>LOADING...</p>
                <Icon type="loading" spin={true} />
            </div>
        )
    }
}

export default Loading;