import React, { Component } from 'react';
import { connect } from 'react-redux';
import {Button, Tabs, Tag} from 'antd';

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
                {!this.props.sets
                    ? (<Loading />)
                    : (
                        <div>
                            <CreateWorldTourModal
                                isShowing={showWorldTourModal}
                                closeModal={this.closeModal}
                                initialValues={{ '@class': 'WorldTour' }}
                            />
                            {/* Put a label on screen if a GET endpoint fails so designers are aware they are not seeing SQL data */}
                            {isUsingMockData ? (<Tag color="magenta">ERROR WITH GET ENDPOINT. USING MOCK DATA. WILL NOT SAVE.</Tag>) : null}
                            <Tabs defaultActiveKey="1" id={'TurfWarTabs'}>
                                <TabPane key={1} tab="World Tour" href="/worldTour">
                                    {
                                        // This tab will either show all of the world tours overview, or details of a single world tour
                                        showAllWorldTours
                                            ? (
                                            <div>
                                                <div>
                                                    <span style={{ marginRight: '10px', fontWeight: 'bold', fontSize:'150%' }}>
                                                        World Tour Overview
                                                    </span>
                                                    <Button type="primary" icon="plus" onClick={() => this.openWorldTourModal()}>Create World Tour</Button>
                                                </div>
                                                <div>
                                                    <WorldTourOverview
                                                        worldTourData={this.props.worldTourData}
                                                        openWorldTour={this.openWorldTour}
                                                        getLeaderboardGroupName={this.getLeaderboardGroupName}
                                                        getPerkName={this.getPerkName}
                                                        style={{float:'left'}}
                                                        openWorldTourModal={this.openWorldTourModal}
                                                    />
                                                </div>
                                            </div>
                                        )
                                            : (
                                            <div>
                                                <h2>{`${selectedWorldTour ? selectedWorldTour.name : 'UNKNOWN'} Details`}</h2>
                                                <WorldTourDetails
                                                    selectedWorldTour={this.state.selectedWorldTour}
                                                />
                                            </div>
                                        )
                                    }
                                </TabPane>
                                <TabPane key={2} tab="Leaderboards" href="/leaderboards">
                                    <h2>Leaderboards Overview</h2>
                                    <LeaderboardOverview
                                        leaderboardData={this.props.leaderboardData}
                                    />
                                </TabPane>
                                <TabPane key={3} tab="Rewards" href="/rewards">
                                    <p>Nothing to see here!</p>
                                </TabPane>
                            </Tabs>
                        </div>
                    )}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {

    };
};

export default connect(mapStateToProps)(SetsContainer);