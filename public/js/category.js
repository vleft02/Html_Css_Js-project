
let myheaders = new Headers()
myheaders.append('Accept', 'application/json')

let init = {
    method: "GET",
    headers:myheaders
}
let advertisements=[]
let subCategories=[]
let categoryTitle;

window.addEventListener('load',function()
{  
    const category = new URLSearchParams(window.location.search).get('category');
    console.log(category)
    fetch ('https://wiki-ads.onrender.com/categories',init)
    .then(categories=>categories.json())
    .then(categories=>
    {   
        categories.forEach(categoryJson => 
            {
                console.log(categoryJson)
                if(categoryJson.id == category)
                {
                    categoryTitle = categoryJson.title
                    console.log(categoryTitle)
                }
            })
    })
    .then(ads=>
    {
        return fetch('https://wiki-ads.onrender.com/ads?category='+category,init)
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
        console.log(subCategories)
    })     

    .then(function()
    {
        let main = document.getElementsByTagName("main")[0] 
        console.log(advertisements)
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