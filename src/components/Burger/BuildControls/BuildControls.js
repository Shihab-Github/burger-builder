import React from 'react';
import './BuildControls.css';
import Aux from '../../../hoc/Aux';

import BuildControl from './BuildControl/BuildControl';
const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Meat', type: 'meat' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
];

const buildControls = (props) => {
    return (
        <Aux>
            <div className="panel panel-default">
                <div className="panel-body">
                    <p>Current Price: <strong>{props.price}</strong> </p>
                    {controls.map(ctrl => (
                        <BuildControl
                            key={ctrl.label}
                            label={ctrl.label}
                            added={() => props.ingridientAdded(ctrl.type)}
                            removed={() => props.ingridientRemoved(ctrl.type)}
                            disabled={props.disabled[ctrl.type]}
                        />
                    ))}
                </div>
            </div>
        </Aux>
    );
};
export default buildControls;

