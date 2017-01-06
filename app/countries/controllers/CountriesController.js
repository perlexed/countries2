'use strict';

const Controller = require('jii/base/Controller'); //TODO: что-то не так в jii, должно быть так: 'jii.base.Controller'

class SiteController extends Controller{

    /**
     *
     * @param {Jii/base/Context} context
     * @return {Promise}
     */
    actionIndex(context) {
        return new Promise(resolve => {
            require.ensure([], () => {
                resolve(
                    this.render(
                        require('../views/countries/index'),
                        context
                    )
                );
            });
        });
    }
}

module.exports = SiteController;