const BaseAction = require('./BaseAction.js');
let DB = require('../DB/DB.js');

class Logar extends BaseAction {
    constructor(obj){
        super(obj);
    }

    response(){
        if(DB.GetUserByNamePass(this.query.login, this.query.password) !== null){
            this.res.writeHead(200, {'Content-Type': 'application/json'});
            this.res.write(JSON.stringify({ login: this.query.login, password: this.query.password }));
        }
        else if(this.query.login !== undefined && this.query.password !== undefined){
            console.log(this.query.login + " " + this.query.password);
            this.res.writeHead(200, {'Content-Type': 'application/json'});
            this.res.write(JSON.stringify({ msg : "wrong pass or login" }));
        }
        else{
            this.res.writeHead(400, {'Content-Type': 'application/json'});
            this.res.write(JSON.stringify({ msg : "wrong" }));
        }
        this.res.end();
    }
}

module.exports = Logar;