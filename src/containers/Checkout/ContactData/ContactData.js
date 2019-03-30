import React,{Component} from 'react';
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';
import {connect} from 'react-redux';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import * as actions from '../../../store/actions/index';
import {updateObject,checkValidity} from "../../../shared/utility";

class ContactData extends Component {
    state = {
        orderForm: { /* one field for each input element in the form */
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Your Name'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            street: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Street'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            zipCode: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'ZIP'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 5,
                    maxLength: 5
                },
                valid: false,
                touched: false
            },
            country: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Country'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Your E-mail'
                },
                value: '',
                validation: {
                    required: true
                },
                valid: false,
                touched: false
            },
            deliveryMethod: {
                elementType: 'select',
                elementConfig: {
                    options: [{value: 'fastest', displayValue: 'Fastest Delivery'},
                              {value: 'cheapest', displayValue: 'Cheapest Delivery'}]
                },
                value: 'fastest',
                valid: true
            }
        },
        formIsValid: false
    };

    orderHandler = (event) => {
        event.preventDefault(); // without will reload the page what is not good in SPA //
        const formData = {};

        for(let formElementIdentifier in this.state.orderForm) {
            formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value; // key/value pair
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        };

        this.props.onOrderBurger(order,this.props.token);
    };

    inputChangedHandler = (event,inputIdentifier) => {
        const updatedFormElement = updateObject(this.state.orderForm[inputIdentifier],
            {value: event.target.value,
                             valid: checkValidity(event.target.value,this.state.orderForm[inputIdentifier]),
                            touched: true});// need to clone deeply (all objects references to new objects)
        const updatedOrderForm = updateObject(this.state.orderForm,{
            [inputIdentifier] : updatedFormElement
        });
        let formIsValid;
        for (let inputIdentifier in updatedOrderForm) {
            formIsValid = updatedOrderForm[inputIdentifier].valid;
            if( ! formIsValid ) {
                break;
            }
        }
        this.setState({orderForm: updatedOrderForm,formIsValid: formIsValid});
    };

    render() {
        const formsElementsArray = [];

        for (let key in this.state.orderForm) {
            formsElementsArray.push({
                id: key,
                config: this.state.orderForm[key]
            });
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {
                    formsElementsArray.map(formElement => (
                        <Input key={formElement.id}
                               elementType={formElement.config.elementType}
                               elementConfig={formElement.config.elementConfig}
                               value={formElement.config.value}
                               invalid={!formElement.config.valid}
                               shouldValidate={formElement.config.validation}
                               touched={formElement.config.touched}
                               changed={(event) => this.inputChangedHandler(event,formElement.id)}/>
                    ))
                }
                <Button btnType="Success" clicked={this.orderHandler} disabled={!this.state.formIsValid}>ORDER</Button>
            </form>
        );

        if (this.props.loading) {
            form = <Spinner/>;
        }
        return (
            <div className={classes.ContactData}>
                <h4>Enter your Contact Data</h4>
                {form}
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger : (orderData,token) =>  dispatch(actions.asyncPurchaseBurger(orderData,token))
    };
};

const mapStateToProps  = state => {
     return {
         ingredients: state.burgerBuilder.ingredients,
         totalPrice: state.burgerBuilder.totalPrice,
         loading: state.order.loading,
         token: state.auth.token,
         userId: state.auth.userId
     }
};

export default connect(mapStateToProps,mapDispatchToProps)(withErrorHandler(ContactData,axios));