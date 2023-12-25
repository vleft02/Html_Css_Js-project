
let imageHeaders = new Headers()
let jsonHeaders = new Headers()
jsonHeaders.append('Accept', 'application/json')
imageHeaders.append('Accept', 'image/*')
   
let jsonInit = {
    method: "GET",
    headers:jsonHeaders
}

let imageInit = {
    method: "GET",
    headers:imageHeaders
}
let advertisements=[]
let subCategories=[]
let categoryTitle;

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
    .catch(error => {
        console.error('Error ', error);
    });

})