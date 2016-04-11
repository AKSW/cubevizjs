/*eslint func-style: 0*/
import Rxmq from 'ecc-messagebus';

export const logBoxChannel = Rxmq.channel('logbox');

export function newLog(log) {
    logBoxChannel
        .subject('logbox.newlog')
        .onNext(log);
}
