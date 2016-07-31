/*eslint func-style: 0*/
/*eslint complexity: 0*/

import {fromJS, List} from 'immutable';
import {
    NEW_DATA_CUBE,
    NEW_SELECTABLE_COMPONENTS,
    NEW_SLICE,
    NEW_CUBEVIZ_CHARTS,
    NEW_CUBEVIZ_CHART_NAMES,
    CHANGED_SELECTED_CHART_IDX,
    CHANGED_SELECTED_CHART
} from '../actions/dataCubeActions.js';

const initialState = fromJS({
    dataCube: null,
    selectableComponents: null,
    slice: null, //Could easy be changed to store sliceS
    cubeVizCharts: List(),
    selectableChartsNames: List(), //Array of strings
    selectedChart: null,
    selectedChartIdx: 0
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
    case CHANGED_SELECTED_CHART_IDX:
        return state.set('selectedChartIdx', action.payload);
    case CHANGED_SELECTED_CHART:
        return state.set('selectedChart', action.payload);
    default:
        return state;
    }
}

export default dataCubeReducer;
