let advertisements=[];
let subCategories=[];
let filters=[];
let categoryTitle;
let userLoggedIn = false;
let sessionId;
let sessionUsername;
let categoryId;

window.addEventListener('load',function()
{  

    const category = new URLSearchParams(window.location.search).get('category');
    categoryId = category;
    fetchCategoryTitle()
    .then(()=>fetchAds())
    .then(()=>fetchSubCategories())
    .then(()=>showPageContent())
    .then(()=>attachFilterEventListeners())
    .then(()=>attachLoginEventListeners())
    .then(()=>attachAddToFavoriteEventListensers())
    .catch(error => {
        console.error('Error ', error);
    });

})

function fetchCategoryTitle()
{
    return fetch ('https://wiki-ads.onrender.com/categories',{method: "GET",
                                                                headers :{
                                                                    'Accept': 'application/json'
                                                                }
                                                            }
    )
    .then(categories=>categories.json())
    .then(categories=>
    {   
        categories.forEach(categoryJson => 
            {
                if(categoryJson.id == categoryId)
                {
                    categoryTitle = categoryJson.title
                }
            })
    })
}

function fetchSubCategories(){
    return fetch(`https://wiki-ads.onrender.com/categories/${categoryId}/subcategories`)
    .then(subcategories => subcategories.json())
    .then(function(subCategoriesJson)
    {
        subCategoriesJson.forEach(subCatJson=>subCategories.push(subCatJson))
    
    })     
}

function fetchAds()
{
    return fetch('https://wiki-ads.onrender.com/ads?category='+categoryId,{method: "GET",
                                                                                headers :{
                                                                                    'Accept': 'application/json'
                                                                                }
                                                                            }
            )   
            .then(response=>response.json())
            .then(function (adsJson) {
                adsJson.forEach(ad=>advertisements.push(ad));
            })
}

function showPageContent()
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
}


function attachFilterEventListeners()
{
    checkboxes = document.getElementsByClassName("filter-button");
    for(let checkbox of checkboxes)
    {
        checkbox.addEventListener("change", function() {
            if (checkbox.checked) {
              filters.push(checkbox.getAttribute('value'))
            } else {
              filters = filters.filter(subcategoryIds => subcategoryIds !== checkbox.getAttribute('value'));
            }
            UpdateShownAds(filters)
        })
    }
}

function attachLoginEventListeners()
{
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
}

function attachAddToFavoriteEventListensers()
{
    favoriteButtons = document.getElementsByClassName("add-to-favorites-button");
    for(let button of favoriteButtons)
    {
        button.addEventListener("click",function(){
                if (userLoggedIn){
                    const id = button.getAttribute('data-id');
                    const title = button.getAttribute('data-title');
                    const description = button.getAttribute('data-description');
                    const cost =  button.getAttribute('data-cost');
                    const img_url = button.getAttribute('data-img');
                    button.style.color = "purple";
                    console.log("Added")
                    addToFavorites(id, title, description, cost, img_url)
                }

        })
    }
}

function addToFavorites(id,title,description,cost,img_url)
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
                document.getElementById('favorites-url').setAttribute('href',`/favorite-ads.html?username=${username}&sessionId=${sessionId}`)
                const loginMessage = document.getElementById("login-text");
                const loginForm = document.getElementsByClassName("login-form");
                if (loginForm.length > 0) {
                    loginForm[0].style.display = "none";
                }
                loginMessage.style.display = "block"
                loginMessage.style.color = "green";
                loginMessage.innerHTML = "Η σύνδεση εγινε επιτυχώς";
                userLoggedIn = true;
            })
        .catch(error => {
            console.error('Error ', error);
            let loginMessage = document.getElementById("login-text")
            loginMessage.style.display = "block"
            loginMessage.style.color = "red";
            loginMessage.innerHTML = "Η σύνδεση απέτυχε";
        });
    }
    else 
    {
        console.log("Already signed in")
    }
}

function UpdateShownAds(activeFilters)
{
    let ads = document.getElementsByClassName("ad-container");

    // Loop through ads and show/hide based on the subcategory ID
    for (ad of ads) {
      let adSubcategory = ad.children[0].getAttribute('data-subcategory-id');

      if (activeFilters.length===0 || activeFilters.includes(adSubcategory)) {
        ad.style.display = "block";
      } else {
        ad.style.display = "none";
      }
    }
}