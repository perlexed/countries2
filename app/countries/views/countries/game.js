'use strict';

const React = require('react');
const ReactView = require('jii-react/ReactView');
const Jii = require('jii');

class GameView extends ReactView {

    preInit() {
        super.preInit();

        this.state = {
            countryInputValue: ''
        };
    }

    init() {
        this.checkCountry = this.checkCountry.bind(this);
        this.onCountryInputChange = this.onCountryInputChange.bind(this);
        this.onResetClick = this.onResetClick.bind(this);
    }


    checkCountry() {

        console.log('checking country');
    }

    onCountryInputChange(event) {
        this.setState({
            countryInputValue: event.target.value
        });
    }

    onResetClick() {
        console.log('resetting');
    }

    render() {
        return (
            <div className='container'>

                <h2>Странограф</h2>

                <p>Проверьте, сколько стран вы вспомните за 10 минут.</p>

                <div className='countryInput'>
                    <p>Регистр значения не имеет.</p>

                    <form onSubmit={(event) => {
                        event.preventDefault();
                        this.checkCountry();
                    }}>
                        <button className='btn btn-primary sendButton' >Отправить</button>
                        <div className='inputContainer'>
                            <input
                                value={this.state.countryInputValue}
                                type='text'
                                placeholder='Введите название страны'
                                className='form-control countryInputField'
                                onChange={this.onCountryInputChange}
                            />
                        </div>
                    </form>

                </div>

                <div className='gameStatus'>
                    <div className='infoPanel'>
                        <div className='timeRemaining'>Осталось <span className='minutesRemaining'>5</span> мин <span className='secondsRemaining'>0</span> сек</div>
                        <button className='btn btn-default resetButton' onClick={this.onResetClick}>Начать с начала</button>
                    </div>

                    <div className='matchedRatio'>Перечисленные страны: <span className='matchedCount'>0</span>/<span className='totalCount'>0</span></div>
                </div>

                <div className='countriesMatched'></div>

                <div className='results'>
                    <p>Стран не указано: <span className='nonmatchedCountriesCount'></span></p>
                    <div className='nonmatchedCountries'></div>
                </div>

            </div>
        );
    }

}
module.exports = GameView;