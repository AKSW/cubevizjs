import React from 'react';
import ReactDOM from 'react-dom';

import Root from './containers/Root.jsx';

class CubeViz {

    constructor(config) {
        this.config = config;
    }

    run() {

        if (this.config
            && 'ui_configuration' in this.config
            && 'ui_container' in this.config.ui_configuration) {
            ReactDOM.render(<Root config={this.config}/>, document.getElementById(
                this.config.ui_configuration.ui_container
            ));
        }
        else {
            throw new Error('Configuration error.');
        }
    }
}

export default CubeViz;
