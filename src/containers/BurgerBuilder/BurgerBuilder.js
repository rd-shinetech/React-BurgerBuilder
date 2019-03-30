import React, {Component} from 'react';
import Aux from '../../hoc/Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index'; // index.js
import axios from '../../axios-orders';

export class BurgerBuilder extends Component {
    state = {
        purchasing: false,
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    render() {
        const disabledInfo = {
            ...this.props.ingredients
        };
        for( let key in disabledInfo ) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded</p> : <Spinner />;
        if( this.props.ingredients ) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients}/>
                    <BuildControls
                        price={this.props.totalPrice}
                        disabled={disabledInfo}
                        ingredientAdded={this.props.onIngredientAdded}
                        ingredientRemoved={this.props.onIngredientRemoved}
                        purchaseHandler={this.purchaseHandler}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        isAuth={this.props.isAuthenticated}/>
                </Aux>
            );
            orderSummary = <OrderSummary ingredients={this.props.ingredients}
                                         price={this.props.totalPrice}
                                         cancelHandler={this.purchaseCancelHandler}
                                         continueHandler={this.purchaseContinueHandler}/>;
        }

        return (
            <div>
                <Aux>
                    <Modal show={this.state.purchasing} closeHandler={this.purchaseCancelHandler}>
                        { orderSummary }
                    </Modal>
                    { burger }
                </Aux>
            </div>
        );
    }

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({purchasing: true});
        } else {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        }
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    };

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients) // good sample of map + reduce
            .map( key => {
                return ingredients[key];
            })
            .reduce((sum,value) => {
                return sum + value;
            },0);
        return (sum > 0)
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
        onIngredientRemoved : (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
        onInitIngredients : () => dispatch(actions.asyncFetchIngredient()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    };
};

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(BurgerBuilder,axios));