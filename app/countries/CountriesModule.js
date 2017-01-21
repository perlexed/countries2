'use strict';

const Jii = require('jii');
const Module = require('jii/base/Module');
const LayoutSite = require('../core/layouts/main');
const CountriesGame = require('./game/CountriesGame');

class SiteModule extends Module{

    init() {
        this.csrfToken = null;
        this.layout = LayoutSite;

        this.controllerMap = {
            CountriesController: require('./controllers/CountriesController')
        };

        this.game = new CountriesGame({});
        // this.game.run();

        Jii.app.urlManager.set({
            rules: {
                '': '/countries/countries/index',
            }
        });
    }

}

module.exports = SiteModule;