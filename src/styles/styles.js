import styled from 'styled-components';
import { Layout, Menu } from 'antd';

export const AppContent = styled(Layout.Content)`
    // max-width: 1170px;
    //margin: 0 auto;
    padding: 0;
    background: #fff;
    .ant-tag-has-color {
        box-shadow: 0px 0px 1px 0px #0000002e;
    }
`;

export const NavBar = styled(Menu)`
    font-size: 15px;
    padding: 9px 0;
    width: calc(100% - 500px);
    display: inline-block;
    &.ant-menu-dark .ant-menu-item-selected,
    &.ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
        background: none;
    }
    .ant-menu-item {
        a {
            &:hover {
                text-decoration: none;
            }
        }
        span {
            background: #fff;
            /* padding: 10px; */
            border-radius: 50%;
            width: 25px;
            height: 25px;
            display: inline-block;
            line-height: 40px;
            margin: 0 5px 0 0;
            //vertical-align: middle;
            vertical-align: top;
            margin-top: 7px;
        }
    }
`;

export const NavFormSandbox = styled.div`
    width: 10%;
    display: inline-block;
    vertical-align: top;
    text-align: right;
    padding: 10px 0 15px;
    .ant-select {
        width: 100%;
        font-size: 13px;
        padding: 10px;
    }
    button {
        width: calc(100% - 20px);
        margin: 0 10px;
        font-size: 13px;
    }
`;
