/*eslint func-style: 0*/

import Rxmq from 'ecc-messagebus';

import * as Util from '../Util.js';

export const logBoxChannel = Rxmq.channel('logbox');

export function newLog(log) {
    logBoxChannel
        .subject('logbox.newlog')
        .onNext(log);
}

export function logDimEls(dc) {
    const dimEls = Util.getAllDimensionElements(dc);
    newLog('DimEls: ' + dimEls);
}
