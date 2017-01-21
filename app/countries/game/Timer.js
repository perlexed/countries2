'use strict';

const _noop = require('lodash/noop');

class Timer {

    constructor(config) {
        this.timeLimit = 0;
        this.timerTimeout = null;
        this.tickInterval = null;
        this.startTime = 0;
        this.elapsedTime = 0;

        this.isRunning = false;

        this.callbacksContext = null;
        this.stopCallback = _noop;
        this.tickCallback = _noop;
        this.startCallback = _noop;

        this.init(config);
    }

    init(config) {
        // Default time is 10 minutes
        this.timeLimit = config['timeLimit'] || 10 * 60 * 1000;
        this.callbacksContext = config['context'] || this;
        this.stopCallback = config['stopCallback'] || _noop;
        this.tickCallback = config['tickCallback'] || _noop;
        this.startCallback = config['startCallback'] || _noop;

        if(config['startTime']) {
            this.elapsedTime = new Date().getTime() - config['startTime'] * 1000;
        }
    }

    checkAutostart() {
        if(!this.elapsedTime) {
            return;
        }

        if(this.elapsedTime > this.timeLimit) {
            this.stopCallback.call(this.callbacksContext);
        } else {
            this.timeLimit -= this.elapsedTime;
            this.start();
        }
    }

    start() {
        if(this.isRunning) {
            return;
        }

        this.timerTimeout = setTimeout(this.stop.bind(this), this.timeLimit);
        this.startTime = new Date().getTime();
        this.tickInterval = setInterval(this.tick.bind(this), 1000);

        this.isRunning = true;

        this.startCallback.call(this.callbacksContext);
    }

    stop() {

        if(!this.isRunning) {
            return;
        }

        this._stopTimer();

        this.stopCallback.call(this.callbacksContext);
    }

    tick() {
        if(Math.floor(new Date().getTime() - this.startTime) >= this.timeLimit) {
            this.stop();
        }

        this.tickCallback.call(this.callbacksContext);
    }

    getRemainingTime() {
        const elapsedTime = Math.floor((new Date().getTime() - this.startTime)/1000);
        const remainingTime = Math.floor(this.timeLimit/1000) - elapsedTime;

        if(remainingTime < 0) {
            return null;
        }

        const remainingMinutes = Math.floor(remainingTime/60);
        const remainingSeconds = remainingTime - remainingMinutes * 60;

        return {
            minutes: remainingMinutes,
            seconds: remainingSeconds
        };
    }

    _stopTimer() {
        clearInterval(this.tickInterval);
        clearTimeout(this.timerTimeout);

        this.isRunning = false;
    }

    reset() {
        this._stopTimer();
        this.startTime = 0;
        this.elapsedTime = 0;
    }
}

module.exports = Timer;