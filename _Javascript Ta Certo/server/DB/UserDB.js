let usuarios = [
    {
        id: 1,
        login: "danilo.lima",
        password: "123"
    },
    {
        id: 2,
        login: "thais.lescano",
        password: "321"
    },
];

class UserDB {
    constructor(user){
        this.user = user;
    }
    
    GetAllUsers(){
        return this.user.splice();
    }
    GetUserById(id){
        for (let i = 0; i < this.user.length; i++)
            if(this.user[i].id === id)
                return this.user[i];
        return null;
    }
    GetUserByNamePass(login, password){
        for (let i = 0; i < this.user.length; i++)
            if(this.user[i].login !== undefined && this.user[i].password !== undefined && this.user[i].login === login && this.user[i].password === password)
                return this.user[i];
        return null;
    }
}

module.exports = new UserDB(usuarios);