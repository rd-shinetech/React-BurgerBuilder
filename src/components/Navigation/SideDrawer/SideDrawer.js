import React from 'react';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './SideDrawer.css';
import BackDrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Aux/Aux';

const sideDrawer = (props) => {
    let attachedClasses = [classes.SideDrawer,classes.Close];

    if( props.show ) {
        attachedClasses = [classes.SideDrawer,classes.Open];
    }

    return (
        <Aux>
            <BackDrop show={props.show} clickHandler={props.closeHandler}/>
            <div className={attachedClasses.join(' ')} onClick={props.closeHandler}>
                <div className={classes.Logo}>
                    <Logo />
                </div>
                <nav>
                    <NavigationItems isAuth={props.isAuth}/>
                </nav>
            </div>
        </Aux>
    );
};

export default sideDrawer;