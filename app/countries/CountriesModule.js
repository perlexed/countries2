'use strict';

const Jii = require('jii');
const Module = require('jii/base/Module');
const LayoutSite = require('../core/layouts/main');

class SiteModule extends Module{

    init() {
        this.csrfToken = null;
        this.layout = LayoutSite;

        this.controllerMap = {
            CountriesController: require('./controllers/CountriesController')
        };

        Jii.app.urlManager.set({
            rules: {
                '': '/countries/countries/index',
            }
        });
    }

}

module.exports = SiteModule;