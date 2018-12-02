import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './app';
import injectTapEventPlugin from 'react-tap-event-plugin';
import momentLocaliser from 'react-widgets';
import { Provider } from 'react-redux';
import Store from './store';
import moment from "moment";
import registerServiceWorker from './registerServiceWorker';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'react-widgets/dist/css/react-widgets.css';
// import 'react-virtualized/styles.css';
import 'antd/dist/antd.css';

const store = Store();
// injectTapEventPlugin();
// momentLocaliser(moment);

ReactDOM.render(
    <Provider store={store}>
        <MuiThemeProvider muiTheme={getMuiTheme()}>
            <App />
        </MuiThemeProvider>
    </Provider>,
    document.getElementById('root')
);

registerServiceWorker();