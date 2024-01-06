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
let username;

window.addEventListener('load',function()
{  
    const sessionId = new URLSearchParams(window.location.search).get('sessionId');
    const username = new URLSearchParams(window.location.search).get('username');
    fetch (`http://localhost:8080/favorite-ads.html/favorites?username=${username}&sessionId=${sessionId}`,{method: "GET",
                                                            headers: {
                                                                'Accept':'application/json'
                                                                    }
                                                                }
    )
    .then(response=>response.json())
    .then(function (ads) {
        console.log(ads)
        ads.forEach(ad=>advertisements.push(ad));
    })     
    .then(function()
    {
        let main = document.getElementsByTagName("main")[0] 
        favorites_template = document.getElementById("ads-template").textContent
        let compiledTemplate = Handlebars.compile(favorites_template)
        let content = compiledTemplate({
        advertisements: advertisements,
        })
        main.innerHTML = content
    })

})