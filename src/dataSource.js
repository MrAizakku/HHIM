//npm install axios --save
import axios from 'axios'; 

export default axios.create({
    baseURL: 'https://hhim-rest.herokuapp.com'
});
