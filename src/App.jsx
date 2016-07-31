import React from 'react';
import ReactDOM from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Root from './containers/Root.jsx';

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
        ReactDOM.render(<Root config={this.config}/>, document.getElementById(this.config.ui_container));
    }
}

export default CubeViz;
