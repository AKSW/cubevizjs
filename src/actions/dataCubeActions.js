/*eslint func-style: 0*/
/*eslint no-console: 0*/
/*eslint no-debugger: 0*/
/*eslint complexity: 0*/

import {createAction} from 'redux-actions';
import {Map, List, fromJS} from 'immutable';

import * as cubeViz from '../api/cubeViz.js';
import convert from '../api/convert/convert.js';
import DataCube from '../api/DataCube.js';

import {addNewLineToLogBox} from './index.js';

export const NEW_DATA_CUBE = 'NEW_DATA_CUBE';
export const NEW_SELECTABLE_COMPONENTS = 'NEW_SELECTABLE_COMPONENTS';
export const NEW_SLICE = 'NEW_SLICE';
export const NEW_CUBEVIZ_CHARTS = 'NEW_CUBEVIZ_CHARTS';
export const NEW_CUBEVIZ_CHART_NAMES = 'NEW_CUBEVIZ_CHART_NAMES';

export const NEW_SELECTED_COMPONENTS = 'NEW_SELECTED_COMPONENTS';

export const CHANGED_SELECTED_CHART_IDX = 'CHANGED_SELECTED_CHART_IDX';
export const CHANGED_SELECTED_CHART = 'CHANGED_SELECTED_CHART';
export const CHANGED_SELECTED_CHART_REACT = 'CHANGED_SELECTED_CHART_REACT';

export const CHANGE_SELECTED_COMPONENT_INDEX = 'CHANGE_SELECTED_COMPONENT_INDEX';

export const RESET_ALL_DATA_CUBE_STATE = 'RESET_ALL_DATA_CUBE_STATE';

export const newDataCube = createAction(NEW_DATA_CUBE);
export const newSelectableComponents = createAction(NEW_SELECTABLE_COMPONENTS);
export const newSlice = createAction(NEW_SLICE);
export const newCubeVizCharts = createAction(NEW_CUBEVIZ_CHARTS);
export const newCubeVizChartNames = createAction(NEW_CUBEVIZ_CHART_NAMES);

export const newSelectedComponents = createAction(NEW_SELECTED_COMPONENTS);

export const changedSelectedChartIdx = createAction(CHANGED_SELECTED_CHART_IDX);
export const changedSelectedChart = createAction(CHANGED_SELECTED_CHART);
export const changedSelectedChartReact = createAction(CHANGED_SELECTED_CHART_REACT);

export const changeSelectedComponentIndex =
    createAction(CHANGE_SELECTED_COMPONENT_INDEX, (key, selection) => ({key, selection}));

export const resetAllDataCubeState = createAction(RESET_ALL_DATA_CUBE_STATE);

function createSelectableComponentElements(components, componentsMap, dc) {
    return componentsMap.map((compEls, compUri) => {
        const comp = dc.getComponentFromUri(components, compUri);
        return Map({
            header: DataCube.getValue(dc.getLabel(comp)),
            elements: compEls.map(compEl => DataCube.getValue(dc.getLabel(compEl)))
        });
    }).toList().toJS();
}

function createSelectableComponents(components, dc) {
    return components.map(comp => DataCube.getValue(dc.getLabel(comp))).toJS();
}

function getAllComponents(componentElements, components, dataCube) {
    return componentElements.map((compEls, compUri) => {
        const comp = dataCube.getComponentFromUri(components, compUri);
        return Map({comp, compEls});
    }).toList();
}

// String indexes ["0" "1"]
function getSelections(sel, indexes) {
    return indexes.reduce((list, i) => list.push(sel.get(i)), List());
}

function getComponentsFromSelection(selection, allComponents) {
    return fromJS(selection).map((indexes, identifier) => {
        const obj = allComponents.get(identifier);
        const compEls = getSelections(obj.get('compEls'), indexes);
        return compEls;
    }).toList().flatten(1);
}

function getNamesforCharts(charts) {
    return charts.map(chart => chart.get('name'));
}

export function createNewDataCube(data) {
    return dispatch => {
        const dataCube = new DataCube(data);
        dataCube.setLogger({logFct: addNewLineToLogBox, dispatch});

        const dimComponentElements = createSelectableComponentElements(
            dataCube.dimensions, dataCube.assignedDimEls, dataCube
        );
        const attrComponentElements = createSelectableComponentElements(
            dataCube.attributes, dataCube.attributesElements, dataCube
        );
        const measureComponents = createSelectableComponents(dataCube.measures, dataCube);

        dispatch(newDataCube(dataCube));
        dispatch(newSelectableComponents({dimComponentElements, attrComponentElements, measureComponents}));
    };
}

export function changeSelectedChart(index) {
    return (dispatch, getState) => {
        const {dataCubeReducer} = getState();
        const charts = dataCubeReducer.get('cubeVizCharts');
        const idx = parseInt(index, 10);
        const chart = charts.get(idx);
        const chartReact = convert(
            chart,
            dataCubeReducer.get('selectedComponents'),
            dataCubeReducer.get('slice'),
            dataCubeReducer.get('dataCube'));
        dispatch(changedSelectedChartReact(chartReact));
        dispatch(changedSelectedChart(chart));
        dispatch(changedSelectedChartIdx(idx));
    };
}

function getSelectedComponents(dataCubeReducer, dc) {
    const selectedAttrElements = getComponentsFromSelection(
        dataCubeReducer.getIn(['selectedComponentsIndex', 'attrComponentElements']),
        getAllComponents(dc.attributesElements, dc.attributes, dc)
    );
    const selectedDimElements = getComponentsFromSelection(
        dataCubeReducer.getIn(['selectedComponentsIndex', 'dimComponentElements']),
        getAllComponents(dc.assignedDimEls, dc.dimensions, dc)
    );

    const measureIndex = dataCubeReducer.getIn(['selectedComponentsIndex', 'measureComponents']);
    const selectedMeasure = dc.measures.get(measureIndex);

    return {selectedMeasure, selectedAttrElements, selectedDimElements};
}

function isValid(selectedMeasure, selectedAttrElements, selectedDimElements, dc) {
    if (!selectedMeasure)
        return [false, 'No measure selected'];

    if (selectedDimElements.size === 0)
        return [false, 'No dimension elements selected'];

    if (selectedAttrElements.size === 0
    && dc.attributes.size > 0)
        return [false, 'No attribute selected'];
    return [true];
}

export function handleAccept({chartIndex = 0, chartName = ''}) {
    return (dispatch, getState) => {
        const {dataCubeReducer} = getState();

        const dc = dataCubeReducer.get('dataCube');
        const {selectedMeasure, selectedAttrElements, selectedDimElements} =
            getSelectedComponents(dataCubeReducer, dc);

        const result = isValid(selectedMeasure, selectedAttrElements, selectedDimElements, dc);
        if (!result[0]) {
            dispatch(addNewLineToLogBox('Error: ' + result[1]));
            return;
        }

        const slice = cubeViz.createDataCube(
            selectedMeasure,
            (selectedAttrElements.size > 0) ? selectedAttrElements.first() : null,
            selectedDimElements,
            dc);

        const charts = cubeViz.determineCharts(null, slice);

        dispatch(addNewLineToLogBox('Selected ' + slice.observations.size + ' Observation(s)'));

        charts.forEach(c => {
            dispatch(addNewLineToLogBox(c.get('name')));
            dispatch(addNewLineToLogBox('Satisfied rules:'));
            dispatch(addNewLineToLogBox(c.get('satisfied').map(r => ' ' + r.toString() + ' ')));
            dispatch(addNewLineToLogBox('Not satisfied rules:'));
            dispatch(addNewLineToLogBox(c.get('notSatisfied').map(r => ' ' + r.toString() + ' ')));
        });

        //FIXME check if all mandetory rules are satisfied
        const satisfied = charts.filter(c => c.get('isSatisfied'));

        // if chart name is set, tries to find a roughly match from satisfied
        // chart names. If no match is found tries to select given chart index or first chart
        // if no chart index is provided.
        let index = -1;
        if (chartName !== '')
            index = satisfied.findIndex(sat => sat.get('name').match(new RegExp(chartName, 'i')) !== null);
        if (index === -1)
            index = chartIndex;

        if (satisfied.size > index) {
            dispatch(newSlice(slice));
            dispatch(newCubeVizCharts(satisfied));
            dispatch(newCubeVizChartNames(getNamesforCharts(satisfied)));
            dispatch(newSelectedComponents(Map(
                {
                    dimComponentElements: selectedDimElements,
                    attrComponentElement: (selectedAttrElements.size > 0) ? selectedAttrElements.first() : null,
                    measureComponent: selectedMeasure
                }
            )));
            dispatch(changeSelectedChart(chartIndex));
        }
    };
}
