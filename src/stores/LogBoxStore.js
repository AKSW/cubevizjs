/*eslint func-style: 0*/
import Rxmq from 'ecc-messagebus';
import _ from 'underscore';

export const logBoxChannel = Rxmq.channel('logbox');

export function newLog(log) {
    logBoxChannel
        .subject('logbox.newlog')
        .onNext(log);
}

export function logDimEls(dc) {
    const dimEls = _.chain(dc.dimensions).map(dim => { return dc[dim]; })
        .flatten()
        .value();
    newLog('DimEls: ' + dimEls);
}
