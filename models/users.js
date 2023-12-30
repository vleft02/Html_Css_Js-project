const uuid = require('uuid');

class UserDAO {
    findAll() {}

    find(username,password) {}

    save(user) {}

    remove(id) {
    }
}

class MemoryDAO extends UserDAO {
    
    
    constructor(data) {
        super();
        if (data !== undefined)
        {
            this.users = data;
        }
        else
        {
            this.users = []
        }
        this.favorites = []
    }

    findAll() {
        return this.users;
    }

    find(username,password) {
        return this.users.find(user => user.userName === username && user.passWord === password);
    }

    save(user) {
        this.data.push(user);
    }

    remove(id) {
        this.data = this.data.filter(user => user.id !== id);
    }
}

class MongoDBDAO extends UserDAO {
    constructor(db) {
        super();
        this.db = db;
        this.collection = db.collection('users');
    }

    findAll() {
        return this.collection.find({}).toArray();
    }

    find(username,password) {
        return this.collection.findOne({ _id: id });
    }

    save(user) {
        // Implementation for saving to MongoDB
        // For example, use MongoDB's insert or update methods
        this.collection.insertOne(user);
    }

    remove(id) {
        // Implementation for removing from MongoDB
        // For example, use MongoDB's delete method
        this.collection.deleteOne({ _id: id });
    }
}

class User
{
    constructor(username, password)
    {
        this.id = uuid.v4();
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

}

module.exports = 
{
    MemoryDAO,
    MongoDBDAO,
    User
}