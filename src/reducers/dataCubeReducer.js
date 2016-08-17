/*eslint func-style: 0*/
/*eslint complexity: 0*/

import {List, Map} from 'immutable';
import {
    NEW_DATA_CUBE,
    NEW_SELECTABLE_COMPONENTS,
    SELECTED_COMPONENTS_CHANGED,
    NEW_SLICE,
    NEW_CUBEVIZ_CHARTS,
    NEW_CUBEVIZ_CHART_NAMES,
    CHANGED_SELECTED_CHART_IDX,
    CHANGED_SELECTED_CHART,
    CHANGED_SELECTED_CHART_REACT
} from '../actions/dataCubeActions.js';

const initialState = Map({
    dataCube: null,
    selectableComponents: null,
    selectedComponents: Map(), //Maps {dim1: dimEls, dim2: dimEls}
    slice: null, //Could easy be changed to store sliceS
    cubeVizCharts: List(),
    selectableChartsNames: List(), //Array of strings
    selectedChart: null,
    selectedChartIdx: 0,
    selectedChartReact: null
});

function dataCubeReducer(state = initialState, action) {
    switch (action.type) {
    case NEW_DATA_CUBE:
        return state.set('dataCube', action.payload);
    case NEW_SELECTABLE_COMPONENTS:
        return state.set('selectableComponents', action.payload);
    case SELECTED_COMPONENTS_CHANGED:
        return state.set('selectedComponents', action.payload);
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
    case CHANGED_SELECTED_CHART_REACT:
        return state.set('selectedChartReact', action.payload);
    default:
        return state;
    }
}

export default dataCubeReducer;
