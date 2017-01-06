'use strict';

const Jii = require('jii');
const Component = require('jii/base/Component');
const _each = require('lodash/each');
const _isObject = require('lodash/isObject');

/**
 * @class
 * @extends Component
 */
module.exports = Jii.defineClass('app.core.components.BundleLoader', /** @lends app.core.components.BundleLoader.prototype */{

    __extends: Component,

    /**
     * @type {string}
     */
    assetsPath: '',

    /**
     * @type {string}
     */
    bundlePrefix: 'bundle-',

    /**
     * @type {boolean}
     */
    autoStart: false,

    /**
     * @type {string[]|object}
     */
    bundles: null,

    _counter: 0,
    _isStarted: false,

    init() {
        _each(this.bundles, (value, key) => {
            if (_isObject(value)) {
                this.load(key, value);
            } else {
                this.load(value);
            }
        });
    },

    load(name, config) {
        this._counter++;

        return this._loadBundle(name)
            .then(() => {
                this._counter--;

                setTimeout(() => {
                    this._applyConfig(config);
                    this._checkToStart();
                });
            });
    },

    _applyConfig(config) {
        // TODO Use public method after create it in jii
        // Apply context config
        Jii._contextConfig = Jii.mergeConfigs(Jii._contextConfig, config.context || {});

        // Apply application config
        config.application = config.application || {};
        _each(config.application.modules || {}, (params, name) => {
            Jii.app.getModule(name).set(params);
        });

        _each(config.application.components || {}, (params, name) => {
            Jii.app.getComponent(name).set(params);
        });
        Jii.app.params = Jii.mergeConfigs(Jii.app.params, config.application.params || {});
    },

    _checkToStart() {
        if (this._counter === 0 && !this._isStarted && this.autoStart) {
            this._isStarted = true;
            Jii.app.start();
        }
    },

    _loadBundle(name) {
        return new Promise(resolve => {
            var head = document.getElementsByTagName('head')[0];
            var script = document.createElement('script');
            script.type = 'text/javascript';
            script.src = name.indexOf('/') === 0 ? name : `${this.assetsPath}/${this.bundlePrefix}${name}.js`;

            // Wait load
            const callback = () => {
                resolve();
            };
            //script.onreadystatechange = callback;
            script.onload = callback;

            // Fire the loading
            head.appendChild(script);
        });
    }

});
