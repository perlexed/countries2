'use strict';

const Controller = require('jii/base/Controller');
const Jii = require('jii');

class SiteController extends Controller {

    /**
     *
     * @param {Jii/base/Context} context
     * @return {Promise}
     */
    actionIndex(context) {

        Jii.app.getModule('countries').game.run();

        return this.render(
            require('../views/countries/index'),
            context
        );
    }
}

module.exports = SiteController;