export default class Loggable {

    setLogger({logFct, dispatch}) {
        this.dispatch = dispatch;
        this.logFct = logFct;
    }

    log(text) {
        if (!this.logFct || !this.dispatch)
            return;
        this.dispatch(this.logFct(text));
    }
}
