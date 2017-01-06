'use strict';

module.exports = {
    application: {
        basePath: '/',
        defaultRoute: 'countries/countries/index',
        components: {
            /**
             * @name Jii.app.db
             * @type {Jii.sql.remote.Connection}
             */
            db: {
                className: require('jii/data/http/Connection'),
                route: 'search/search/ar',
                schema: {
                    className: require('jii/data/http/Schema')
                }
            },

            bundleLoader: {
                className: require('../core/components/BundleLoader'),
            },

            rpc: {
                className: require('../jsonRpc/components/JsonRpcClient')
            },

            /**
             * @name Jii.app.urlManager
             * @type {Jii.request.UrlManager}
             */
            urlManager: {
                className: require('jii/request/UrlManager'),
                suffix: '/',
            },

            /**
             * @name Jii.app.router
             * @type {Jii.clientRouter.Router}
             */
            clientRouter: {
                className: require('jii/request/client/Router'),
            },

            /**
             * @name Jii.app.view
             * @type {Jii.view.ClientWebView}
             */
            view: {
                className: require('jii/view/ClientWebView'),
                renderers: {
                    react: require('jii-react/ReactRenderer')
                }
            }
        }
    }
};
