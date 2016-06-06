import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import CubeVizApp from './components/CubeVizApp.jsx';


class CubeViz {

    constructor(config) {
        this.config = config;
    }

    run() {
        // Needed for onTouchTap
        // Can go away when react 1.0 release
        // Check this repo:
        // https://github.com/zilverline/react-tap-event-plugin
        injectTapEventPlugin();
        ReactDOM.render(<CubeVizApp />, document.getElementById(this.config.ui_container));
    }
}

export default CubeViz;
