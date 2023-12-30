const jsonInit = {
    method: "GET",
    headers :{
        'Accept': 'application/json'
    }
}

let advertisements=[]
let subCategories=[]
let categoryTitle;
let sessionId;

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
    .then(ads=>
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
        favoriteButtons.forEach(button=>button.addEventListener("click",function()
        {
            button.style.color = "purple";
        }))
    })
    .catch(error => {
        console.error('Error ', error);
    });

})

function LoginRequest(username,password)
{
    if (sessionId === undefined)
    {
        fetch("http://localhost:8080/category.html",{method: "POST",
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
                sessionId = json;
                loginMessage = document.getElementById("login-text")
                loginMessage.style.display = "block"
                loginMessage.style.color = "green";
                loginMessage.innerHTML = "Η σύνδεση εγινε επιτυχώς";
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