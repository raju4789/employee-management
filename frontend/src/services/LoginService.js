import axios from 'axios';

const API_BASE_URL = "/authenticate";


const authenticate = (employee) => {
    return axios.post(API_BASE_URL, employee);
}


export default { authenticate };