const http = require('http');
const url = require('url');

let { usuarios } = require('./usuarios.js');

const BaseAction = require('./BaseAction.js');
const Logar = require('./Logar.js');

const server = http.createServer((req, res)=>{
    let URL_Parse = url.parse(req.url, true);
    let { host, pathname, query } = URL_Parse;

    let Action;

    if(pathname.toLowerCase() === '/logar')
        Action = new Logar({req, res});
    else
        Action = new BaseAction({req, res});

    Action.response();
});

function x(data, res){
    let keys = typeof data === 'object' ? Object.keys(data) : [];
    let values = typeof data === 'object' ? Object.values(data) : [];
    for(let i = 0; i < keys.length; i++)
        res.write('\n' + keys[i] + " " + values[i]);
}

server.listen(5000);