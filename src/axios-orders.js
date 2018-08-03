import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://react-my-burger-33e2e.firebaseio.com/'
});

export default instance;