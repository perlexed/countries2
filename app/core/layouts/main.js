'use strict';

const React = require('react');
const LayoutView = require('jii-react/LayoutView');

class LayoutSite extends LayoutView{

    preInit() {
        super.preInit();
    }

    render() {
        return (
            <div>
                {this.state.content}
            </div>
        );
    }

}

module.exports = LayoutSite;
