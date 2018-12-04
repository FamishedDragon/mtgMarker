import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Tabs, Tag} from 'antd';
import {fetchSets} from "./setsActions";
import Loading from "../../components/Loading/Loading";

class SetsContainer extends Component {
    //region Setup
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        this.props.dispatch(fetchSets())
    }
    //endregion

    render() {
        return (
            <div>
                {!this.props.mtgSets || this.props.mtgSets.length < 1
                    ? (<Loading />)
                    : (
                        <div>
                           <p>SETS LOADED</p>
                        </div>
                    )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        mtgSets: state.setsReducer.mtgSets
    };
};

export default connect(mapStateToProps)(SetsContainer);