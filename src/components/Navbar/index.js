import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Menu, Layout, Select, Button } from 'antd';
import _ from 'lodash';
import { requestSwitchServer } from '../../scenes/Home/homeActions';
import { NavBar, NavFormSandbox } from '../../styles/styles';
import { menuConfig, servers } from './constants';

// const SubMenu = Menu.SubMenu;

class Navbar extends Component {
    _switchServer(serverName, serverHeader) {
        this.props.dispatch(requestSwitchServer(serverName, serverHeader));
        this.props.history.push('/');
    }

    _onChange = val => {
         // console.log(val);
        const _val = val.split(' ');
        const prefix = _val[0].toLowerCase();
        const suffix = _val[1] || '';
        const name = prefix + suffix;
        // console.log(name);
        this._switchServer(name, val);
    };

    render() {
        return (
            <Layout.Sider>
                <NavFormSandbox>
                    <Select defaultValue={this.props.serverHeader} onChange={this._onChange}>
                        {_.map(servers, server => {
                            return <Select.Option key={`server_${server}`} value={server}>{server}</Select.Option>;
                        })}
                    </Select>
                    <Link to="/contentPush">
                        <Button type="danger">Push Content To Sandbox</Button>
                    </Link>
                </NavFormSandbox>
                <NavBar mode="vertical" theme="dark" style={{ width: '100%' }}>
                    {_.map(menuConfig, menu => {
                        return (
                            <Menu.Item key={menu.key}>
                                <Link to={menu.link}>
                                    <span style={{ background: `${menu.background}` }} />{' '}
                                    {menu.label}
                                </Link>
                            </Menu.Item>
                        );
                    })}
                </NavBar>
            </Layout.Sider>
        );
    }
}

const mapStateToProps = state => {
    return {
        serverHeader: state.homeReducer.serverHeader,
    };
};

export default withRouter(connect(mapStateToProps)(Navbar));
