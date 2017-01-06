'use strict';

var axios = require('axios');
var Jii = require('jii');
var Component = require('jii/base/Component');
var ApplicationException = require('jii/exceptions/ApplicationException');

/**
 * @class app.core.components.JsonRpcClient
 * @extends Jii.base.Component
 */
var JsonRpcClient = Jii.defineClass('app.core.components.JsonRpcClient', /** @lends app.core.components.JsonRpcClient.prototype */{

    __extends: Component,

    /**
     * @type {string}
     */
    csrfToken: null,

    /**
     * @type {number}
     */
    _nextId: 0,

    send(method, params) {
        return axios.post(
            '/api/',
            {
                id: ++this._nextId,
                jsonrpc: '2.0',
                method: method,
                params: params,
            },
            {
                headers: {
                    'X-Csrf-Token': this.csrfToken
                }
            })
            .then(function (response) {
                if (!response || !response.data) {
                    throw new ApplicationException('No AJAX response or wrong JSON-RPC response: ' + JSON.stringify(response));
                }
                if (response.data.error) {
                    throw new Error(response.data.error);
                }

                return response.data.result || null;
            });
    }

});

module.exports = JsonRpcClient;