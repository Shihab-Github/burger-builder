import React from 'react';
import Aux from '../../hoc/Aux';

const order = (props) => {
    console.log("Order props: ", props);
    return (
        <Aux>
            <div className="panel panel-default">
                <div className="panel-body">
                    <h4>Ingridients: </h4>
                    <ul className="nav nav-pills"> 
                        <li className="active">Salad <span className="badge">{props.ingridients.salad}</span></li>
                        <li className="active">Meat <span className="badge">{props.ingridients.meat}</span></li>
                        <li className="active">Bacon <span className="badge">{props.ingridients.bacon}</span></li>
                        <li className="active">Cheese <span className="badge">{props.ingridients.cheese}</span></li>
                    </ul>
                    <br />
                    <div><strong>Price: </strong> $5</div>
                </div>
            </div>
        </Aux>
    )
};

export default order;