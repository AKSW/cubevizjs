/*global window */
// check if we're inside of node or browser
var rootObject;
if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
    rootObject = module.exports;
} else {
    rootObject = window;
}
// export config
rootObject.defaultEndpointUrl = 'http://docker.local';
rootObject.rootPath = '/';
