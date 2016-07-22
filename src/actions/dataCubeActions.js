/*eslint func-style: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
import {createAction} from 'redux-actions';
import {Map, List, fromJS} from 'immutable';

import * as cubeViz from '../api/cubeViz.js';
import DataCube from '../api/DataCube.js';

export const NEW_DATA_CUBE = 'NEW_DATA_CUBE';
export const NEW_SELECTABLE_COMPONENTS = 'NEW_SELECTABLE_COMPONENTS';
export const SELECT_COMPONENTS = 'SELECT_COMPONENTS';
export const NEW_SLICE = 'NEW_SLICE';
export const NEW_CUBEVIZ_CHARTS = 'NEW_CUBEVIZ_CHARTS';
export const NEW_CUBEVIZ_CHART_NAMES = 'NEW_CUBEVIZ_CHART_NAMES';

export const newDataCube = createAction(NEW_DATA_CUBE);
export const newSelectableComponents = createAction(NEW_SELECTABLE_COMPONENTS);
export const selectComponents = createAction(SELECT_COMPONENTS);
export const newSlice = createAction(NEW_SLICE);
export const newCubeVizCharts = createAction(NEW_CUBEVIZ_CHARTS);
export const newCubeVizChartNames = createAction(NEW_CUBEVIZ_CHART_NAMES);

function createSelectableComponents(dc) {
    return dc.assignedDimEls.map((dimEls, dimUri) => {
        const dim = dc.getDimensionFromUri(dimUri);
        return Map({
            header: DataCube.getValue(dc.getLabel(dim)),
            elements: dimEls.map(dimEl => DataCube.getValue(dc.getLabel(dimEl)))
        });
    }).toList().toJS();
}

function getAllComponents(dataCube) {
    return dataCube.assignedDimEls.map((dimEls, dimUri) => {
        const dim = dataCube.getDimensionFromUri(dimUri);
        return Map({dim, dimEls});
    }).toList();
}

// String indexes ["0" "1"]
function getSelections(sel, indexes) {
    return indexes.reduce((list, i) => list.push(sel.get(i)), List());
}

function getComponentsFromSelection(selection, allComponents) {
    return fromJS(selection).map((indexes, identifier) => {
        const obj = allComponents.get(identifier);
        const dimEls = getSelections(obj.get('dimEls'), indexes);
        return dimEls;
    }).toList().flatten(1);
}

function getNamesforCharts(charts) {
    return charts.map(chart => chart.get('name'));
}

export function createNewDataCube(data) {
    return dispatch => {
        const dataCube = new DataCube(data);
        const components = createSelectableComponents(dataCube);
        dispatch(newDataCube(dataCube));
        dispatch(newSelectableComponents(components));
    };
}

export function changeSelectedComponents(selection) {
    return (dispatch, getState) => {
        const {dataCubeReducer} = getState();
        const dataCube = dataCubeReducer.get('dataCube');
        const selectedComponents = getComponentsFromSelection(selection, getAllComponents(dataCube));
        const slice = cubeViz.createDataCube(selectedComponents, dataCube);
        const charts = cubeViz.determineCharts(null, slice);

        dispatch(selectComponents(selectedComponents));
        dispatch(newSlice(slice));
        dispatch(newCubeVizCharts(charts));
        dispatch(newCubeVizChartNames(getNamesforCharts(charts)));
    };
}
