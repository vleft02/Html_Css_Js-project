
let myheaders = new Headers()
myheaders.append('Accept', 'application/json')

let init = {
    method: "GET",
    headers:myheaders
}
advertisements=[]


window.addEventListener('load',function()
{  
    const category = new URLSearchParams(window.location.search).get('category');
    console.log(category)
    fetch('https://wiki-ads.onrender.com/ads?category='+category,init)
    .then(response=>response.json())
    .then(function (adsJson) {
        adsJson.forEach(ad=>advertisements.push(ad));
    })
    .then(function()
    {
        featured = document.getElementById("featured-panel")
        console.log(advertisements)
        ads_template = document.getElementById("ads-template").textContent
        let compiledTemplate = Handlebars.compile(ads_template)
        let content = compiledTemplate({
           advertisements: advertisements  
        })
        featured.innerHTML = content
    })

})