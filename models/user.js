class UsersDAO
{
    constructor(username, password)
    {
        this.username = username;
        this.password = password;
    }

    get userName()
    {
        return this.username;
    }
    get passWord()
    {
        return this.password;
    }

    set userName(value){
        this.username = value;
    }

    set passWord(value)
    {
        this.password =value;
    }

    findAll()
    {

    }
    findById()
    {

    }


}

class User
{
    
}