import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://burger-buider.firebaseio.com/'
});

export default instance;