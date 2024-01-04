class Session{
    constructor(username,sessionId)
    {
        this._username = username;
        this._id = sessionId;
    }

    get username()
    {
        return this._username;
    }

    get id()
    {
        return this._id;
    }

    set username(value)
    {
        this._username = value
    }

    set id(value)
    {
        this._id = value
    }
}


class SessionsMemoryDAO
{
    constructor() {  
        this.sessions = []
    }

    findAll() {
        return this.sessions;
    }

    find(username, id)
    {
        return this.sessions.find(session => session.username === username && session.id === id);
    }

    save(username,id) {
        this.sessions.push(new Session(username,id));
    }

    remove(id) {
        this.sessions.remove(session =>session.id === id);
    }
}

class SessionsDAOFactory
{
    static createSessionsDAO(databaseType){
        switch (databaseType) {
            case 'Memory':
                return new SessionsMemoryDAO();
            default:
                throw new Error('Unsupported database type');
            }
    }
}

module.exports = SessionsDAOFactory