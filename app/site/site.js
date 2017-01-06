'use strict';

const Jii = require('jii');

Jii.app.setModules({
    'countries': require('../countries/CountriesModule'),
});

Jii.app.urlManager._compileRules(); // TODO Add to jii method addRules()
