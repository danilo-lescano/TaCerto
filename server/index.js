const http = require('http');
const urlParse = require('url');
const Action = require('./actions.js');

let { usuarios } = require('./usuarios.js');


const server = http.createServer((req, res)=>{
    let { pathname } = urlParse.parse(req.url, true);

    let action;

    let actionString = toCamelCase(pathname.substring(1));
    if(Action[actionString])
        action = new Action[actionString]({req, res});
    else
        action = new Action.BaseAction({req, res});

    action.response();
});

function toCamelCase(str){
    Object.keys(Action).forEach((el)=>{
        str = str.toLowerCase() === el.toLowerCase() ? el : str;
        return str.toLowerCase() === el.toLowerCase();
     });
    return str;
}
server.listen(5000);