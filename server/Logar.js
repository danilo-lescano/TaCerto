const BaseAction = require('./BaseAction.js');
class Logar extends BaseAction {
    constructor(obj){
        super(obj);
    }

    response(){
        this.res.write('uma mensagem de teste!\n');
        this.res.end();
    }
}

module.exports = Logar;