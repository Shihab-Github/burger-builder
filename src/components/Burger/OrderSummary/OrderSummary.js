import React from 'react';
import Aux from '../../../hoc/Aux';

const orderSummary = (props) => {
    let transformedIngridients = [];
    let counter = 1;
    for (const key in props.ingridients) {
        if (props.ingridients.hasOwnProperty(key)) {
            let li = <li className="list-group-item" key={counter}>{key} * {props.ingridients[key]}</li>
            transformedIngridients.push(li);
            counter++;
        }
    }
    return (
        <Aux>
            <p>A declicious burger with following ingridients: </p>
            <ul className="list-group">
                {transformedIngridients}
            </ul>
        </Aux>
    )
    
};

export default orderSummary;