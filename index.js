const express = require('express')
const path = require('path')
const uuid = require('uuid')
const { MemoryDAO, MongoDBDAO, User } = require('./models/users');
const userRepository = new MemoryDAO([new User("vleft","190102ab"),new User("vleftakis","190102ab")]);  
const favorites = require('./models/favorites')
const app = express()
const port = 8080

app.listen(port)

/* 
    Serve static content from directory "public",
    it will be accessible under path /, 
    e.g. http://localhost:8080/index.html
*/
app.use(express.static('public'))

// parse url-encoded content from body
app.use(express.urlencoded({ extended: false }))

// parse application/json content from body
app.use(express.json())

// serve index.html as content root
app.get('/', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})

app.get('/index.html', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})

app.get('/category.html', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})

app.post(/^\/category\.html(?:\?.*|)$/, function(req, res){
    console.log(req.body)
    const username = req.body.username;
    const password = req.body.password;

    // Replace this with your actual authentication logic
    const user = userRepository.find(username, password);
  
    if (user) {
      console.log("Success")
      sessionUniqueId = uuid.v4();
      res.json({sessionId:sessionUniqueId});
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
})

app.get('/subcategory.html', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log("HEeellloo")
        console.log(err)
    })
})