// import configureStore from 'redux-mock-store'
// import thunk from 'redux-thunk'
// import {createStore, applyMiddleware} from 'redux';
// import thunkMiddleware from 'redux-thunk';
// import {assert} from 'chai';
//
// import rootReducer from '../src/reducers';
// import {handleConfiguration} from '../src/actions/index.js';
// const middlewares = [thunk]
//
//
// describe('Integration test for config file, import, selection and visualisation', function() {
//     let store;
//     const base = {
//         ui_configuration: {
//             ui_container: 'react'
//         }
//     };
//     let basicConf = base;
//
//     beforeEach(function() {
//         store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
//         basicConf = base;
//     });
//
//     it('should work well with base config file', function() {
//
//         const f = () => {
//             console.log('Change');
//         };
//         unsubscribe = store.subscribe(f);
//         return store.dispatch(handleConfiguration(basicConf))
//             .then(() => {
//                 unsubscribe
//
//
//                 //TODO test async side effect dispatches without setTimeout
//                 // setTimeout(function() {
//                 //     assert.strictEqual(store.getState().mainReducer.get('showPopover'), false);
//                 //     assert.strictEqual(store.getState().mainReducer.get('userConfiguration'), base);
//                 //     assert.strictEqual(store.getState().dataCubeReducer.get('selectedComponentsIndex').toJS(), base);
//                 //     console.log('Here');
//                 //     console.log(base);
//                 //     console.log(store.getState().dataCubeReducer.get('selectedComponentsIndex').toJS());
//                 // }, asd);
//             })
//             .catch(err => {
//                 console.log(err);
//                 assert.isTrue(false);
//             })
//     })
//
//     it('should fail because of corrupted config file', function() {
//         return store.dispatch(handleConfiguration(basicConf))
//             .then(() => {
//             }, err => {
//                 console.log(err);
//             });
//     })
//
//     // it('should fail import because of not existing link to file', function() {
//     // })
//     //
//     // it('', function() {
//     // })
// });
//
// // System tests TODO:
// // import, import fail (404, invalid, not valid cube)
// // selection (not valid selection, selection with no obs, selection with not valid chart)
