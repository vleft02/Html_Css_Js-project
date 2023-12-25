
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
let subCategoryTitle;

window.addEventListener('load',function()
{  
    const subCategory = new URLSearchParams(window.location.search).get('id');
    fetch ('https://wiki-ads.onrender.com/subcategories',jsonInit)
    .then(subcategories=>subcategories.json())
    .then(subcategories=>
    {   
        subcategories.forEach(subcategoryJson => 
            {
               
                if(subcategoryJson.id == subCategory)
                {
                    subCategoryTitle = subcategoryJson.title
                }
            })
    })
    .then(ads=>
    {
        return fetch('https://wiki-ads.onrender.com/ads?subcategory='+subCategory,jsonInit)
    })
    .then(response=>response.json())
    .then(function (adsJson) {
        adsJson.forEach(ad=>advertisements.push(ad));
    })
    .then(function()
    {
        advertisements.forEach(ad=>
        {
            let featureMap = new Map()
            // let featuresObj = {}
            featureKeyValuePairs = ad.features.split(";")
                for (var i = 0; i < featureKeyValuePairs.length; i++) {
                    var pair = featureKeyValuePairs[i].split(':');
                    var key = pair[0].trim()
                    value = "N/A"
                    if (pair[1] !== undefined)
                    {
                        value = pair[1] 
                    }

                    // featuresObj[key] = value;
                    featureMap.set(key,value)
                }
            // ad.features = featuresObj
            ad.features = featureMap
        })
        
        
    })
    .then(function()
    {
        let main = document.getElementsByTagName("main")[0] 
        ads_template = document.getElementById("ads-template").textContent
        let compiledTemplate = Handlebars.compile(ads_template)
        let content = compiledTemplate({
            subcategorytitle: subCategoryTitle,
           advertisements: advertisements
        })
        main.innerHTML = content
    })    
    .catch(error => {
        console.error('Error:', error);
    });

})