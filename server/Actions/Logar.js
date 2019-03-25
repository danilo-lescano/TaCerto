const BaseAction = require('./BaseAction.js');
let DB = require('../DB/DB.js');

class Logar extends BaseAction {
    constructor(obj){
        super(obj);
    }

    response(){
        if(this.query.name !== undefined && this.query.password !== undefined){
            console.log(this.query.name + " " + this.query.password);
            this.res.write(this.query.name + " " + this.query.password);
        }
        else{
            this.res.write("wrong");
        }
        this.res.end();
    }
}

module.exports = Logar;