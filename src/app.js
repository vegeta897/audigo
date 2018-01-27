import FormContainer from './components/container/FormContainer';
import 'semantic-ui-less/semantic.less';

console.log(process.env.API_HOST, process.env.API_PORT);

fetch(process.env.API_HOST + ':' + process.env.API_PORT + '/api/test/devin')
.then(response => response.json().then(json => {
    if(!response.ok) return Promise.reject(json);
    console.log(json);
    return json;
}));