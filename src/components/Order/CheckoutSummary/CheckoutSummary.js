import React from 'react';
import Aux from '../../../hoc/Aux';
import Burger from '../../Burger/Burger';
//import classes from './CheckoutSummary.css';

const checkoutSummary = (props) => {
    return (
        <Aux>
            <div className="row">
                <h1>We hope it tastes good !</h1>
                <Burger ingridients={props.ingridients} />
            </div>
            <div className="row">
                <div className="panel panel-default">
                    <div className="panel-body">
                        <div className="col-lg-1">
                            <button onClick={props.onCheckoutCancelled} className="btn btn-danger">Cancel</button>
                        </div>
                        <div className="col-lg-1">
                            <button onClick={props.onCheckoutContinued} className="btn btn-success">Continue</button>
                        </div>
                    </div>
                </div>
            </div>
        </Aux>
    )
};

export default checkoutSummary;
