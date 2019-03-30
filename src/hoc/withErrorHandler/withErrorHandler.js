import React,{Component} from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Aux from '../Aux/Aux';

const withErrorHandler = (WrappedComponent,axios) => {

    return class extends Component {
        state = {
            error: null
        };

        componentWillMount() {
            this.requestInterceptor = axios.interceptors.request.use(request => {
                this.setState({error:null});
                return request;
            });
            this.responseInterceptor = axios.interceptors.response.use(null,err => {
                this.setState({error:err});
            });
        }

        errorConfirmedHandler = () => {
            this.setState({error:null});
        };

        render() {
            return (
                <Aux>
                    <Modal show={this.state.error} closeHandler={this.errorConfirmedHandler}>{this.state.error?this.state.error.message:null}</Modal>
                    <WrappedComponent {...this.props}/>
                </Aux>
            );
        }

/*
        componentWillUnmount() {
            if( axios.interceptors ) {
                axios.interceptors.eject(this.requestInterceptor);
                axios.interceptors.eject(this.responseInterceptor);
            }
        }
*/
    }
};

export default withErrorHandler;