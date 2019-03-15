const http = require('http');
const url = require('url');

let { usuarios } = require('./usuarios.js');

const Action = require('./actions.js');

const server = http.createServer((req, res)=>{
    let URL_Parse = url.parse(req.url, true);
    let { host, pathname, query } = URL_Parse;

    let action;

    let actionString = toCamelCase(pathname.substring(1));
    console.log(actionString);
    if(Action[actionString])
        action = new Action[actionString]({req, res});
    else
        action = new Action.BaseAction({req, res});

    action.response();
});

function toCamelCase(str){
    var actions = Object.keys(Action);

    for (let i = 0; i < actions.length; i++) {
        if(str.toLowerCase() === actions[i].toLowerCase())
            return actions[i];
    }
    return str;
}
server.listen(5000);