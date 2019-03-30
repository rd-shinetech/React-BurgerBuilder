// This class is a wrapper of burger ingredients
import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import { withRouter } from 'react-router-dom';

const burger = (props) => {
    const keys = Object.keys(props.ingredients); // pick the keys of the JSON object

    let transformedIngredients = keys.map(key => {
        return [...Array(props.ingredients[key])].map((_,i) => {
            return <BurgerIngredient key={key + i} type={key}/>;
        });
    }).reduce((arr,el) => {
        return arr.concat(el)
    },[]); // if the array is empty it is cut off

    if( transformedIngredients.length === 0 ) {
        transformedIngredients = <p>Please start adding ingredients!</p>
    }


    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default withRouter(burger); // insert router info in props for this component
// It uses curly braces to insert some Javascript logic before returning the JSX