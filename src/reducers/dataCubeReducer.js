/*eslint func-style: 0*/
/*eslint complexity: 0*/

import {fromJS, List} from 'immutable';
import {
    NEW_DATA_CUBE,
    NEW_SELECTABLE_COMPONENTS,
    NEW_SLICE,
    NEW_CUBEVIZ_CHARTS,
    NEW_CUBEVIZ_CHART_NAMES
} from '../actions/dataCubeActions.js';

const initialState = fromJS({
    dataCube: null,
    selectableComponents: null,
    slice: null, //Could easy be changed to store sliceS
    cubeVizCharts: List(),
    selectableChartsNames: List(), //Array of strings
    selectedChart: -1
});

function dataCubeReducer(state = initialState, action) {
    switch (action.type) {
    case NEW_DATA_CUBE:
        return state.set('dataCube', action.payload);
    case NEW_SELECTABLE_COMPONENTS:
        return state.set('selectableComponents', action.payload);
    case NEW_SLICE:
        return state.set('slice', action.payload);
    case NEW_CUBEVIZ_CHARTS:
        return state.set('cubeVizCharts', action.payload);
    case NEW_CUBEVIZ_CHART_NAMES:
        return state.set('selectableChartsNames', action.payload);
    default:
        return state;
    }
}

export default dataCubeReducer;
