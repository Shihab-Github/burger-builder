import React from 'react';
import BurgerIngridient from './BurgerIngridient/BurgerIngridient';

const burger = (props) => {
    let counter = 5;
    let transformedIngridients = [];
    for (const key in props.ingridients) {
        if (props.ingridients.hasOwnProperty(key)) {
            const element = props.ingridients[key];
            for (let i = 0; i < element; i++) {
                let ing = <BurgerIngridient key={counter} type={key} />;
                transformedIngridients.push(ing);
                counter++;
            }
        }
    }
    if(transformedIngridients.length === 0)
        transformedIngridients = <h2><strong>Please add ingridients !</strong></h2>;

    return (
        <div className="panel panel-default">
            <div className="panel-body">
                <div className="Burger" style={{ overflow: 'auto' }}>
                    <BurgerIngridient type="bread-top" />
                    {transformedIngridients}
                    <BurgerIngridient type="bread-bottom" />
                </div>
            </div>
        </div>

    );
};

export default burger;