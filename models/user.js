const uuid = require('uuid');

class UserDAO {
    findAll() {}

    findById(id) {}

    save(user) {}

    remove(id) {
    }
}

class MemoryDAO extends UserDAO {
    
    
    constructor(data) {
        super();
        if (data !== undefined)
        {
            this.data = data;
        }
        else
        {
            this.data = []
        }
    }

    findAll() {
        return this.data;
    }

    findById(id) {
        return this.data.find(user => user.id === id);
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

    findById(id) {
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

class UserFavorite
{
    constructor(username, password, ad)
    {
        this.id = uuid.v4();
        this.username = username;
        this.password = password;
        this.ad = ad;
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