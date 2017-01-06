window.$ = window.jQuery = require('jquery');
require('bootstrap');

// Global react for Yii2 widget render
window.ReactDOM = require('react-dom');
window.React = require('react');

// Jii
var Jii = require('jii');
require('jii/base/Model');
require('jii-react/ReactRenderer');

window.Jii = Jii;
Jii.namespaceMoveContext(window);

if (window.JII_CONFIG) {
    Jii.createWebApplication(Jii.mergeConfigs(require('../config/main'), window.JII_CONFIG));
}
