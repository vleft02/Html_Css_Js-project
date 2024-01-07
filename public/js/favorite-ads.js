let advertisements=[]
let sessionId;
let username;

window.addEventListener('load',function()
{  
    sessionId = new URLSearchParams(window.location.search).get('sessionId');
    username = new URLSearchParams(window.location.search).get('username');
    fetchFavoriteAds()
    .then(()=>showPageContent())
   
})


function fetchFavoriteAds()
{
    return fetch (`http://localhost:8080/favorite-ads.html/favorites?username=${username}&sessionId=${sessionId}`,{method: "GET",
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
}

function showPageContent(){
    let main = document.getElementsByTagName("main")[0] 
    favorites_template = document.getElementById("ads-template").textContent
    let compiledTemplate = Handlebars.compile(favorites_template)
    let content = compiledTemplate({
    advertisements: advertisements,
    })
    main.innerHTML = content
}


