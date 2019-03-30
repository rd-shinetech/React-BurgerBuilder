import React,{Component} from 'react';
import { connect } from 'react-redux';
import Aux from '../Aux/Aux';
import classes from './Layout.css';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    state = {
        showSideDrawer: false
    };

    sideDrawerCloseHandler = () => {
        this.setState({showSideDrawer: false});
    };

    sideDrawerToggledHandler = () => {
        this.setState((prevState) => { // thread-safe state switching
            return {showSideDrawer: ! prevState.showSideDrawer};
        });
    };

    render () {
        return (
            <Aux>
                <Toolbar isAuth={this.props.isAuthenticated} drawerToggledClicked={this.sideDrawerToggledHandler}/>
                <SideDrawer isAuth={this.props.isAuthenticated} show={this.state.showSideDrawer} closeHandler={this.sideDrawerCloseHandler}/>
                <main className={classes.Content}>
                    {this.props.children}
                </main>
            </Aux>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);