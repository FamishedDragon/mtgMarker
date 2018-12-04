import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/app.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Layout } from 'antd';
import { AppContent } from './styles/styles';
import BreadcrumbsInstance from './components/Breadcrumbs/Breadcrumbs';
import Navbar from './components/Navbar';
import Home from "./scenes/Home/home";
import SetsContainer from "./scenes/Sets/SetsContainer";

class App extends Component {
    render() {
        return (
            <Router>
                <Layout style={{ height: '100vh' }}>
                    <Navbar />
                    <AppContent>
                        <BreadcrumbsInstance props={this.props} />
                        <div style={{ padding: 20 }}>
                            <Switch>
                                {/*HomePage*/}
                                <Route exact path="/" component={Home} />
                                <Route
                                    exact
                                    path="/index.html"
                                    component={Home}
                                />
                                {/*Sets Page*/}
                                <Route exact path="/sets" component={SetsContainer} />
                                {/* Cars Pages */}
                                {/*<Route exact path="/cars" component={CarsOverviewContainer} />*/}
                                {/*<Route exact path="/cars/:carID" component={CarTabs} />*/}
                                {/*Shop Pages*/}
                                {/*<Route exact path="/shop" component={ShopContainer} />*/}
                                {/*Turf War Pages*/}
                                {/*<Route exact path="/turfwar" component={TurfWarTabs} />*/}
                                {/*Misc*/}
                                {' '}
                            </Switch>
                        </div>
                    </AppContent>
                </Layout>
            </Router>
        );
    }
}

export default App;
