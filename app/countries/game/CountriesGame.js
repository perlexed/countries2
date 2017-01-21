'use strict';

const Timer = require('./Timer');
const View = require('./View');
const _each = require('lodash/each');
const $ = require('jquery');

class CountriesGame {

    constructor(config) {

        this.countriesMatched = [];
        this.countriesTotal = 0;

        this.timer = null;
        this.view = null;
        this.routerUrl = null;

        this.$input = null;

        this.init(config);
    }


    init(config) {
        this.countriesTotal = config['countriesTotal'] || 0;
        this.countriesMatched = config['countriesMatched'] || [];
        this.routerUrl = config['routerUrl'] || null;

        this.timer = new Timer({
            timeLimit: 10 * 60 * 1000,
            context: this,
            startTime:  config['startTime'] || 0,
            startCallback: this.onStart,
            tickCallback: this.updateTimer,
            stopCallback: this.onTimerStop
        });

        this.view = new View();
    }

    run() {
        $('.totalCount').html(this.countriesTotal);

        this.$input = $('input.countryInputField');

        // this.$input.keypress((event) => {
        //     if(event.keyCode == 13) {
        //         const countryName = this.$input.val().trim();
        //         if(countryName) {
        //             this.checkCountry(countryName);
        //         }
        //     }
        // });

        $('.countryInput button').on('click', () => {
            const countryName = this.$input.val().trim();
            if(countryName) {
                this.checkCountry(countryName);
            }
        });

        $('.resetButton').on('click', () => {
            if(window.confirm('Вы хотите сбросить прогресс и начать с начала?')) {
                this.resetProgress();
            }
        });

        _each(this.countriesMatched, (countryName) => {
            this.addMatchedCountry(countryName);
        });

        $('.matchedCount').html(this.countriesMatched.length);


        this.timer.checkAutostart();
    }

    onStart() {
        this.updateTimer();

        $('.gameStatus').show();
    }

    updateTimer() {
        let remainingTime = this.timer.getRemainingTime();

        if(!remainingTime) {
            remainingTime = {
                seconds: 0,
                minutes: 0
            };
        }

        $('.minutesRemaining').html(remainingTime.minutes);
        $('.secondsRemaining').html(remainingTime.seconds);
    }

    checkCountry(country) {
        if(!country) {
            return;
        }

        this.timer.start();

        $.ajax({
            url: this.routerUrl + '?action=checkCountry',
            data: {
                countryName: country
            }
        }).done((data) => {
            const response = window.JSON.parse(data);
            if(!response) {
                this.processErrors({'serverResponseParseError': 'Не удается прочитать ответ сервера'});
            } else if(response['errors'] && response['errors'].length) {
                this.processErrors(response['errors']);
            } else {
                this.checkMatch(!!response['compareResult'], response['sourceName'] || country);
            }
        });
    }

    processErrors(errors) {
        if(errors['alreadyMatched']) {
            const countryName = errors['alreadyMatched'];
            $('.countriesMatched').children().each(() => {
                if(countryName === $(this).text()) {
                    this.view.flashMatchedCountry($(this));
                }
            });
        } else {
            console.error('request error', errors);
        }
    }

    checkMatch(isMatched, countryName) {
        if(isMatched) {

            $('input.countryInputField').animate({
                'background-color': '#7f7'
            }, 250).val('').animate({
                'background-color': '#fff'
            }, 250).focus();

            this.countriesMatched.push(countryName);
            this.addMatchedCountry(countryName);
            $('.matchedCount').html(this.countriesMatched.length);

        } else {
            $('input.countryInputField').animate({
                'background-color': '#f77'
            }, 250).animate({
                'background-color': '#fff'
            }, 250).focus();
        }
    }

    addMatchedCountry(countryName) {
        if(countryName) {
            $('.countriesMatched').prepend('<div>' + countryName + '</div>');
        }
    }

    onTimerStop() {
        this.updateTimer();
        $('.gameStatus').show();

        $.ajax({
            url: this.routerUrl + '?action=getNonmatchedCountries'
        }).done((data) => {
            // @todo replace window.JSON with require()
            const response = window.JSON.parse(data);
            const matched = response && response['matched'] ? response['matched'] : [];

            const nonmatchedCountries = $('.nonmatchedCountries');
            _each(matched.sort(), (matchedCountry) => {
                nonmatchedCountries.append('<div>' + matchedCountry + '</div>');
            });

            $('.nonmatchedCountriesCount').html(matched.length);

        });


        $('.countryInput button').prop('disabled', true);
        this.$input.prop('disabled', true).val('');

        $('.results').show();
    }

    resetProgress() {
        this.timer.reset();
        this.view.reset();

        this.countriesMatched = [];
        $.ajax({ url: this.routerUrl + '?action=reset' });
    }

}

module.exports = CountriesGame;