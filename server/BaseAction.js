const urlParse = require('url');
class BaseAction {
    constructor(obj){
        this.req = obj.req;
        this.res = obj.res;

        this.url = urlParse.parse(this.req.url, true);
        this.host = this.url.host;
        this.pathname = this.url.pathname;
        this.query = this.url.query;
    }

    response(){
        console.log('i am base action');
        this.res.end();
    }
}

module.exports = BaseAction;