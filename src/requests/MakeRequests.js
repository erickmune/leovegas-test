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

const get = (parameters, endpoint, callback) => {
    parameters = toQueryString(parameters);
    let myHeaders = new Headers();
    let url = baseCTS.baseURL + endpoint + parameters;
    let myInit = {
        method: 'GET',
        headers: myHeaders,
        mode: 'cors'
    };
    fetch(url, myInit)
    .then( res => {
        res.json().then(body => {
            return callback(body);
        }).catch( err => {
            console.log('there is something wrong :/', err.message);

        })

    }).catch( err => {
        alert('Houve um erro na resposta da sua solicitação. Por favor comunique à um Administrador para conferir o log.');//2.00
        console.log('Vide o restlet controller.js. Erro no get: ', err);
    });
    
};

const post = (parameters, bodyValues, endpoint, callback) => {
    parameters = toQueryString(parameters);
    let url = baseCTS.baseURL + endpoint + parameters;
    let body = {};
    let items = Object.keys(bodyValues);
    items.forEach( key => {
        body[key] = bodyValues[key]
    })
    let init = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    };
    fetch(url, init)
        .then(res => {
            res.json().then(body => {    
                console.log('Resposta da request: ', res);        
                console.log('Body: ', body);    
                return callback(body);//2.00
            }).catch(err => {
                alert('Houve um erro na resposta da sua 2a solicitação, por favor comunique à um Administrador');//2.00
                console.log('Vide log do RESTLET controller.js. Erro no Post: '+err);
            });
        }).catch( err => {
            alert('Houve um erro na resposta da sua 1a solicitação, por favor comunique à um Administrador');//2.00
            console.log('Vide log do RESTLET controller.js. Erro no Post: '+err);
        });
}

export default {get: get, post: post}