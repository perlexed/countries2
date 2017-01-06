'use strict';

const React = require('react');
const ReactView = require('jii-react/ReactView');

class IndexView extends ReactView {

    render() {

        console.log('sdfasdf');

        return (
            <div className='indexView'>
                Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные тексты. Вдали от всех живут они в буквенных домах на берегу
            </div>
        );
    }

}
module.exports = IndexView;