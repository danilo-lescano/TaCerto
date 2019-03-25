let usuarios = [
    {
        id: 1,
        login: "danilo.lima",
        senha: "123"
    },
    {
        id: 2,
        login: "thais.lescano",
        senha: "321"
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
}

module.exports = new UserDB(usuarios);