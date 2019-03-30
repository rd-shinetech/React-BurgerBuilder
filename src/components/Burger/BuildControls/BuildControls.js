import React from 'react';
import classes from './BuildControls.css';
import BuildControl from './BuildControl/BuildControl';

const controls = [
    { label : 'Salad', type: 'salad'},
    { label : 'Bacon', type: 'bacon'},
    { label : 'Cheese', type: 'cheese'},
    { label : 'Meat', type: 'meat'}
];

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price: <strong>{props.price.toFixed(2)}</strong></p>
        {controls.map( ctl => (
            <BuildControl disabled={props.disabled[ctl.type]} added={() => props.ingredientAdded(ctl.type)} removed={() => props.ingredientRemoved(ctl.type)} key={ctl.label} label={ctl.label}/>
        ))}
        <button
            disabled={!props.purchasable}
            onClick={props.purchaseHandler}
            className={classes.OrderButton}>{ props.isAuth ? 'ORDER NOW' : 'SIGN UP TO ORDER'}</button>
    </div>
);

export default buildControls;