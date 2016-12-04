import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root.jsx';

class CubeViz {

    constructor(config) {
        this.config = config;
    }

    run() {
        ReactDOM.render(<Root config={this.config}/>, document.getElementById(this.config.ui_container));
    }
}

export default CubeViz;
