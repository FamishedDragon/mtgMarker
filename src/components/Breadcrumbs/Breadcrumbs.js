import React from 'react';
import { Route, Link } from 'react-router-dom';
import { Breadcrumb } from 'antd';
import styled from "styled-components";
const BreadcrumbItem = Breadcrumb.Item;

const BreadcrumbWrapper = styled.div`
    width: 100%;
    color: white;
    background: #198fff;
    z-index: 5;
    padding: 10px 20px;
    box-shadow: -2px 2px 3px -1px #00000030;
    &:empty {
        display: none;
    }
    .ant-breadcrumb a, .ant-breadcrumb-separator, .ant-breadcrumb-link {
        color: #fff;
        &:hover {
            text-decoration: none;
            color: #ffffffc4;
        }
    }
`;

const routes = {
    '/': 'Home',
    '/sets': 'Sets'
    // '/mysterycrates': 'Mystery Crates',
    // '/airacer': 'AI Racer',
    // '/contentmigration': 'Content Migration',
    // '/cars': 'Cars',
    // '/customcars': 'Custom ' +
    // 'Cars',
    // '/collections': 'Collections',
    // '/collections/requirements': 'Requirements', // Formatting correct?
    // '/login' : 'Login',
    // '/contentPush': 'Push Content To Sandbox',
    // '/dailyQuests' : 'Daily Quests',
    // '/localization' : 'Localization Tool',
    // '/wheels': 'Wheels',
    // '/shop': 'Shop',
    // '/liveevents' : 'Live Events',
    // '/assets' : 'Asset Path Exporter'
};

const findRouteName = (url) => {
    var editItem = (url.substring(url.lastIndexOf('/') + 1, url.length));
    if (/^\d+$/.test(editItem)) {
        return '#' + editItem;
    }
    else {
        return routes[url];
    }
}

const getPaths = (pathname) => {
    const paths = ['/'];
    if (pathname === '/') return paths;

    pathname.split('/').reduce((prev, curr, index) => {
        const currPath = `${prev}/${curr}`;
        paths.push(currPath);
        return currPath;
    });

    return paths;
};

const BreadcrumbsItem = ({ match, ...rest }) => {
    const routeName = findRouteName(match.url);
    if (routeName) {
        return (
            match.isExact ?
                (
                    <BreadcrumbItem>{routeName}</BreadcrumbItem>
                ) :
                (
                    <BreadcrumbItem>
                        <Link to={match.url || ''}>
                            {routeName}
                        </Link>
                    </BreadcrumbItem>
                )
        );
    }
    return null;
};

const Breadcrumbs = ({ location: { pathname }, match, ...rest }) => {
    const paths = getPaths(pathname);
    return (
        <Breadcrumb>
            {paths.map(p => <Route path={p} component={BreadcrumbsItem} key={p}/>)}
        </Breadcrumb>
    );
};

class BreadcrumbsInstance extends React.Component {
    render() {
        return (
            <BreadcrumbWrapper>
                <Route path="/:path" component={Breadcrumbs} {...this.props}/>
            </BreadcrumbWrapper>
        )
    }
}

export default BreadcrumbsInstance;