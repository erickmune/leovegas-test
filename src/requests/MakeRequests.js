import baseCTS from './Requests_CTS';

const toQueryString = function (object) {
    let result = '';
    let names = Object.keys(object);
    for (let i = 0; i < names.length; i++) {
        result += names[i] + '=' + encodeURIComponent(object[names[i]]);
        if (i < (names.length - 1)) result += '&';
    }
    return result;
};

const get = (parameters, callback) => {
    parameters = toQueryString(parameters);
    let myHeaders = new Headers();
    let url = baseCTS.baseURL + baseCTS.searchAPI.searchMoviesURL + parameters;
    let myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    };
    fetch(url, myInit)
    .then( res => {
        res.json().then(body => {
            console.log(res.body);
            return callback(body);
        }).catch( err => {
            console.log('there is something wrong :/', err.message);

        })

    }).catch( err => {
        alert('Houve um erro na resposta da sua solicitação. Por favor comunique à um Administrador para conferir o log.');//2.00
        console.log('Vide o restlet controller.js. Erro no get: ', err);
    });
    
};

export default {get: get}