# Web Development project
## Overview
This project is a web application developed as part of a university course on web development, built using the Node.js framework with an Express server, client-side scripting in JavaScript, and Handlebars for dynamic content generation. The project features four main services that will be explained below. Also see the other branches for more on Front-end of the website

## Technologies Used
- Node.js
- Express
- Handlebars
- JavaScript (Client-side)
- npm

## Main Features
1. Generating Content:
This service utilizes Handlebars to dynamically generate content on the server side. The content is fetched from a remote server and seamlessly integrated into the user interface.

2. Log In Service:
Authenticates user's Log In info and generating unique session Ids 

3. Add to Favorites:
Users can add items to their favorites list using this service. This feature enhances user interaction by allowing them to save and revisit specific content.

4. Retrieve Favorites:
Users can retrieve their saved favorites, providing a personalized experience and easy access to content they find most valuable.


To download the required dependencies simply run
```
npm install
```

To run the server type the following into the cmd
```
node index.js
```


## Libraries Used  

- [Handlebars](https://handlebarsjs.com/guide/): γλώσσα για τη σύνταξη υποδειγμάτων (templates) για δυναμική παραγωγή HTML περιεχομένου,
- [expressjs](https://expressjs.com/en/guide/routing.html): γρήγορη υλοποίηση υπηρεσιών ιστού,
- [uuid](https://www.npmjs.com/package/uuid): παραγωγή μοναδικών αναγνωριστικών,
- [nodemon](https://www.npmjs.com/package/nodemon): εργαλείο για αυτόματη επανεκκίνηση μιας Node.js εφαρμογής, σε περίπτωση αλλαγών στα αρχεία της εφαρμογής.
