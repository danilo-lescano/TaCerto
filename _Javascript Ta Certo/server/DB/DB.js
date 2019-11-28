let UserDB = require('../DB/UserDB.js');

class DB {
    constructor(cl){
        for (let i = 0; i < cl.length; i++)
            this.ExtendThis(cl[i]);
    }

    ExtendThis(obj){
        if(typeof obj !== "object")
            return;

        var propertyNames = Object.getOwnPropertyNames(Object.getPrototypeOf(obj));
        
        Object.getOwnPropertyNames(obj).concat(propertyNames).forEach((el)=>{
            if(el !== "constructor")
                this[el] = obj[el];
        });
    }
};

module.exports = new DB([
    UserDB
]);