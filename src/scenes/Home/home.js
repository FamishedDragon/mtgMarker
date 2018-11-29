import React from 'react';
import { Card } from 'antd';

class Home extends React.Component {
    render() {
        return (
            <div>
                <Card>
                    Graphs about content
                </Card>
                <Card>
                    Data about users
                </Card>
                <Card>
                    Schedule of upcoming content
                </Card>
                <Card>
                    Something great
                </Card>
            </div>
        )
    }
}

export default Home;