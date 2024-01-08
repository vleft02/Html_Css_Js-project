const express = require('express');
const path = require('path');
const uuid = require('uuid');

//User Initialization
const {UsersDAOFactory, Initializer} = require('./models/users.js');
const userRepository = UsersDAOFactory.createUsersDAO('Memory');
Initializer.prepareData(userRepository);

//Favorites Initialization
const FavoritesDAOFactory = require('./models/favorites.js');
const favoritesRepository = FavoritesDAOFactory.createFavoritesDAO('Memory');

//Sessions Initialization
const SessionsDAOFactory = require('./models/sessions.js')
const sessionRepository = SessionsDAOFactory.createSessionsDAO('Memory');

//server is started to listen on port 8080
const app = express();
const port = 8080;
app.listen(port);


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

// serve index.html if specified
app.get('/index.html', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})


// serve category.html
app.get('/category.html', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('category.html', options, function(err){
        console.log(err)
    })
})

// serve favorite-ads.html
app.get('/favorite-ads.html' , function(req, res){
    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('favorite-ads.html', options, function(err){
        console.log(err)
    })
})

// If the user with the username,sessionid pair has
//logged in and there is an existing session a list of the user's
//favorite ads is served
app.get('/favorite-ads.html/favorites' , function(req, res){
    const sessionId = req.query.sessionId;
    const username = req.query.username;
    if (sessionRepository.find(username,sessionId) === undefined)
    {
        res.status(401).json({success:false, message:'Invalid Session'})
    }
    favorites = favoritesRepository.findByUser(username);
    favorites=favorites.map(favorite=>favorite.ad)
    res.json(favorites)
})

// serve subcategory.html
app.get('/subcategory.html', function(req, res){

    var options = {
        root: path.join(__dirname, 'public')
    }

    res.sendFile('index.html', options, function(err){
        console.log(err)
    })
})

// when a users attempts to log in we authenticate the 
// given username, password pair
app.post('/category.html/login' , function(req, res){
    const username = req.body.username;
    const password = req.body.password;

    // Replace this with your actual authentication logic
    const user = userRepository.find(username, password);
  
    if (user) {
      sessionUniqueId = uuid.v4();
      sessionRepository.save(username,sessionUniqueId)
      res.json({sessionId:sessionUniqueId});
    } else {
      res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});

// when a user adds an advertisment to his favorites
// We check: 
//1. If He has an invalid session (401 Unauthorized)
//2. If the ad has already been added (409 Conflict)
// If the above are false a response is sent with the favorite to be added

app.post('/category.html/add-to-favorites' , function(req, res){
    
    const sessionId = req.body.sessionId;
    const username = req.body.username;
    const id = req.body.id;
    const title = req.body.title
    const description = req.body.description
    const cost = req.body.cost
    const img_url = req.body.img_url

    if (sessionRepository.find(username,sessionId) === undefined)
    {
        res.status(401).json({success:false, message:'Invalid Session'})
    }
    if (favoritesRepository.find(username, id) === undefined)
    {
        favoritesRepository.save(username,id,title,description,cost,img_url);
        res.status(200).json({success:true, message:'Favorite was added successfully'})
    }
    else
    {
        res.status(409).json({message: 'Advertisement already in favorites' });
    }
});
