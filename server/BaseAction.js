class BaseAction {
    constructor(obj){
        this.req = obj.req;
        this.res = obj.res;
    }

    response(){
        this.res.end();
    }
}

module.exports = BaseAction;