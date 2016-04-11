import React from 'react';
import ReactDOM from 'react-dom';

import CubeVizApp from './components/CubeVizApp.jsx';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// Can go away when react 1.0 release
// Check this repo:
// https://github.com/zilverline/react-tap-event-plugin
injectTapEventPlugin();
ReactDOM.render(<CubeVizApp />, document.getElementById('react'));
