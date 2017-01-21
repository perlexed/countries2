'use strict';

const React = require('react');
const ReactView = require('jii-react/ReactView');
const GameView = require('./game.js');

class IndexView extends ReactView {

    render() {
        return (
            <div className='indexView'>
                <div>test</div>
                <GameView/>
            </div>
        );
    }

}
module.exports = IndexView;