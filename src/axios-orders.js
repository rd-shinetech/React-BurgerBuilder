import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-burger-25e14.firebaseio.com'
});

export default instance;