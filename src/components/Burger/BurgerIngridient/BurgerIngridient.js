import React, { Component } from 'react';
import PropTypes from 'prop-types';

class BurgerIngridient extends Component {
    render() {
        let ingridient = null;
        switch (this.props.type) {
            case ('bread-top'):
                ingridient = (
                    <div className="BreadTop">
                        <div className="Seeds1"></div>
                        <div className="Seeds1"></div>
                    </div>
                )
                break;
            case ('meat'):
                ingridient = <div className="Meat"></div>;
                break;
            case ('cheese'):
                ingridient = <div className="Cheese"></div>;
                break;
            case ('bacon'):
                ingridient = <div className="Bacon"></div>;
                break;
            case ('salad'):
                ingridient = <div className="Salad"></div>;
                break;
            case ('bread-bottom'):
                ingridient = <div className="BreadBottom"></div>;
                break;
            default:
                ingridient = null;
                break;
        }
        return ingridient;
    }
}

BurgerIngridient.propTypes = {
    type: PropTypes.string.isRequired
};

export default BurgerIngridient;