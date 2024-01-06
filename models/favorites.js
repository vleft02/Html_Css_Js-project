class Favorite
{
    constructor(username, ad)
    {
        this._username = username;
        this._ad = ad;
    }

    get username()
    {
        return this._username;
    }

    get ad()
    {
        return this._ad;
    }

    set username(value){
        this._username = value;
    }
    
    set ad(value)
    {
        this._ad = value;
    }

}

class Ad
{
    constructor(id, title, description,cost,img_url)
    {
        this._id = id ;
        this._description = description;
        this._title = title;
        this._cost = cost;
        this._img_url = img_url;
    }

    get id()
    {
        return this._id;
    }
    get title()
    {
        return this._title;
    }
    get cost()
    {
        return this._cost;
    }
    get description()
    {
        return this._description;
    }
    get img_url()
    {
        return this._img_url;
    }

    set id(value){
        this._id = value;
    }

    set title(value)
    {
        this._title = value;
    }
    set description(value)
    {
        this._description = value;
    }

    set cost(value)
    {
        this._cost = value;
    }

    set img_url(value)
    {
        this._img_url = value;
    }
}

class FavoritesMemoryDAO
{
    constructor() {  
        this.favorites = []
    }

    findAll() {
        return this.favorites;
    }

    find(username, id)
    {
        return this.favorites.find(favorite => favorite.username === username && favorite.ad.id === id);
    }

    findByUser(username) {
        return this.favorites.filter(favorite => favorite.username === username);
    }

    save(username,id, title, description,cost,img_url) {
        this.favorites.push(new Favorite(username,new Ad(id, title, description,cost,img_url)));
    }

    remove(favorite) {
        this.favorites.remove(favorite);
    }

}

class FavoritesMongoDBDAO {
    constructor(db) {
        this.db = db;
        this.collection = db.collection('favorites');
    }

    findAll() {
        return this.collection.find({}).toArray();
    }

    find(username) {
        //extra logic for matching the password to user 
        return this.collection.findOne({ _username: username });
    }

    save(favorite) {
        // Implementation for saving to MongoDB
        // For example, use MongoDB's insert or update methods
        this.collection.insertOne(favorite);
    }

    remove(favorite) {
        // Implementation for removing from MongoDB
        // For example, use MongoDB's delete method
        // this.collection.deleteOne({ _username: username});
    }
}


class FavoritesDAOFactory {
    static createFavoritesDAO(databaseType) {
      switch (databaseType) {
        case 'Memory':
          return new FavoritesMemoryDAO();
        case 'MongoDB':
          return new FavoritesMongoDBDAO();
        default:
          throw new Error('Unsupported database type');
      }
    }
  }
  

module.exports = FavoritesDAOFactory
