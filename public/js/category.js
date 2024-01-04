const jsonInit = {
    method: "GET",
    headers :{
        'Accept': 'application/json'
    }
}

let advertisements=[]
let subCategories=[]
let categoryTitle;
let userLoggedIn = false;
let sessionId;
let sessionUsername;

window.addEventListener('load',function()
{  
    const category = new URLSearchParams(window.location.search).get('category');
    fetch ('https://wiki-ads.onrender.com/categories',jsonInit)
    .then(categories=>categories.json())
    .then(categories=>
    {   
        categories.forEach(categoryJson => 
            {
                if(categoryJson.id == category)
                {
                    categoryTitle = categoryJson.title
                }
            })
    })
    .then(()=>
    {
        return fetch('https://wiki-ads.onrender.com/ads?category='+category,jsonInit)
    })
    .then(response=>response.json())
    .then(function (adsJson) {
        adsJson.forEach(ad=>advertisements.push(ad));
    })
    .then(subCats=>
    {
        return fetch(`https://wiki-ads.onrender.com/categories/${category}/subcategories`);
    })
    .then(subcategories => subcategories.json())
    .then(function(subCategoriesJson)
    {
        subCategoriesJson.forEach(subCatJson=>subCategories.push(subCatJson))
        
    })     

    .then(function()
    {
        let main = document.getElementsByTagName("main")[0] 
        ads_template = document.getElementById("ads-template").textContent
        let compiledTemplate = Handlebars.compile(ads_template)
        let content = compiledTemplate({
            categorytitle: categoryTitle,
           advertisements: advertisements, 
           subcategories : subCategories
        })
        main.innerHTML = content
    })
    .then(function()
    {
        document.getElementById("login").addEventListener("click",function(event)
        {
            event.preventDefault();
            let username = document.getElementById("username");
            let password = document.getElementById("password");
            console.log(username.value)
            console.log(password.value)
            LoginRequest(username.value,password.value);
        })
    }
    )  
    .then(()=>
    {
        favoriteButtons = document.getElementsByClassName("add-to-favorites-button");
        for(let button of favoriteButtons)
        {
            button.addEventListener("click",function(){
                    const id = button.getAttribute('data-id');
                    const title = button.getAttribute('data-title');
                    const description = button.getAttribute('data-description');
                    const cost =  button.getAttribute('data-cost');
                    const img_url = button.getAttribute('data-img');
                    if(button.style.color === "purple") {
                        button.style.color = "black";
                        console.log("removed")
                    }
                    else
                    {
                        button.style.color = "purple";
                        console.log("added")
                    }
                    addToFavorites(id, title, description, cost, img_url)
            })
        }
    })
    .catch(error => {
        console.error('Error ', error);
    });

})


function addToFavorites(id,title,description,cost,img_url)
{
    if(userLoggedIn)
    {
        ad = {
            sessionId:sessionId,
            username:sessionUsername,
            id:id,
            title:title,
            description:description,
            cost:cost,
            img_url:img_url
        }

        fetch("http://localhost:8080/category.html/add-to-favorites",{method: "POST",
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Access-Control-Allow-Origin': '*'
                                                    },
                                                    body: JSON.stringify(ad)})
        .then(response=>
        {
            if (!response.ok) {
            throw new Error('Ad was not added to favorites');
            }
        })
        .catch(error => {
            console.error('Error ', error);
        });
    }
    
}

function LoginRequest(username,password)
{
    if (!userLoggedIn)
    {
        fetch("http://localhost:8080/category.html/login",{method: "POST",
                                                    headers: {
                                                        'Content-Type': 'application/json',
                                                        'Access-Control-Allow-Origin': '*'
                                                    },
                                                    body: JSON.stringify({username,password})})
        .then(response=>
            {
                if (!response.ok) {
                    throw new Error('There was an Error while signing in');
                }
                return response.json();
            })
        .then(json=>
            {
                sessionId = json.sessionId;
                sessionUsername = username
                loginMessage = document.getElementById("login-text")
                loginMessage.style.display = "block"
                loginMessage.style.color = "green";
                loginMessage.innerHTML = "Η σύνδεση εγινε επιτυχώς";
                userLoggedIn = true;
            })
        .catch(error => {
            console.error('Error ', error);
            loginMessage = document.getElementById("login-text")
            loginMessage.style.display = "block"
            loginMessage.style.color = "red";
            loginMessage.innerHTML = "Η σύνδεση απέτυχε";
        });
    }
    else 
    {
        console.log("already signed in")
    }
}