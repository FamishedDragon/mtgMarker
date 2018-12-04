import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Tabs, Tag} from 'antd';
import {fetchSets} from "./setsActions";
import Loading from "../../components/Loading/Loading";
import manaSymbolX from '../../svg/manaSymbols/X.svg'
import mtg from 'mtgsdk' // TODO: This wrapper is pretty inefficient in API pings, so should use sparingly if we get close to 5000/hour cap

class SetsContainer extends Component {
    //region Setup
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentWillMount() {
        // TODO: make it so that we dont fetch sets if data already exists since this data is invalidated only one per month
        this.props.dispatch(fetchSets())
    }
    //endregion

    render() {
        let {mtgSets} = this.props
        return (
            <div>
                {(!this.props.mtgSets || this.props.mtgSets.length < 1)
                    ? (<Loading />)
                    : (
                        <div>
                            <img src={manaSymbolX} style={{height: '5vmin'}} alt="X" />
                            {mtgSets
                                .sort((a,b) => {
                                    return new Date(b.releaseDate) - new Date(a.releaseDate)
                                })
                                .map((set, index) => {
                                    return set.type ==='expansion'
                                    ? (<p key={index}>{`${set.name} ${set.releaseDate}`}</p>)
                                    : null
                            })}
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