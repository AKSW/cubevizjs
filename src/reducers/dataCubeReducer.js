/*eslint func-style: 0*/
/*eslint complexity: 0*/

import {List, Map} from 'immutable';
import {
    NEW_DATA_CUBE,
    NEW_SELECTABLE_COMPONENTS,
    NEW_SELECTED_COMPONENTS,
    NEW_SLICE,
    NEW_CUBEVIZ_CHARTS,
    NEW_CUBEVIZ_CHART_NAMES,
    CHANGED_SELECTED_CHART_IDX,
    CHANGED_SELECTED_CHART,
    CHANGED_SELECTED_CHART_REACT,
    RESET_ALL_DATA_CUBE_STATE,
    CHANGE_SELECTED_COMPONENT_INDEX
} from '../actions/dataCubeActions.js';

const initialState = Map({
    dataCube: null,
    selectableComponents: Map({dimComponentElements: null, attrComponentElements: null, measureComponents: null}),
    selectedComponentsIndex: Map({dimComponentElements: {}, attrComponentElements: {}, measureComponents: 0}),
    selectedComponents: Map({dimComponentElements: null, attrComponentElement: null, measureComponent: null}),
    slice: null, //Could easy be changed to store sliceS
    cubeVizCharts: List(),
    selectableChartsNames: List(), //Array of strings
    selectedChart: null,
    selectedChartIdx: 0,
    selectedChartReact: null,
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
    case CHANGED_SELECTED_CHART_REACT:
        return state.set('selectedChartReact', action.payload);
    case RESET_ALL_DATA_CUBE_STATE:
        return Map({
            dataCube: null,
            selectableComponents:
                Map({dimComponentElements: null, attrComponentElements: null, measureComponents: null}),
            selectedComponentsIndex: Map({dimComponentElements: {}, attrComponentElements: {}, measureComponents: 0}),
            selectedComponents: Map({dimComponentElements: null, attrComponentElement: null, measureComponent: null}),
            slice: null, //Could easy be changed to store sliceS
            cubeVizCharts: List(),
            selectableChartsNames: List(), //Array of strings
            selectedChart: null,
            selectedChartIdx: 0,
            selectedChartReact: null,
        });
    case CHANGE_SELECTED_COMPONENT_INDEX:
        return state.setIn(['selectedComponentsIndex', action.payload.key], action.payload.selection);
    case NEW_SELECTED_COMPONENTS:
        return state.set('selectedComponents', action.payload);
    default:
        return state;
    }
}

export default dataCubeReducer;
