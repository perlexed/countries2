'use strict';

const $ = require('jquery');

class View {

    flashMatchedCountry(element) {
        element.animate({
            'background-color': '#f77'
        }, 250).animate({
            'background-color': '#fff'
        }, 250).focus();
    }

    reset() {

        $('.results').hide();
        $('.countriesMatched').html('');
        $('.matchedCount').html('0');
        $('.gameStatus').hide();


        $('.countryInput button').prop('disabled', false);
        // @todo replace with proper link
        window.App.$input.prop('disabled', false).val('');
    }
}

module.exports = View;