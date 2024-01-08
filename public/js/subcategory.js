let advertisements=[]
let subCategories=[]
let subCategoryTitle;
let subCategoryId;

window.addEventListener('load',function()
{  
    const subCategory = new URLSearchParams(window.location.search).get('id');
    subCategoryId = subCategory;

    fetchSubCategoryTitle()
    .then(()=>fetchSubCategoryAds())
    .then(()=>prepareAdData())
    .then(()=>showPageContent())    
    .catch(error => {
        console.error('Error:', error);
    });

})

function fetchSubCategoryTitle()
{
    return fetch ('https://wiki-ads.onrender.com/subcategories',{method: "GET",
                                                                headers: {
                                                                'Accept':'application/json'
                                                                    }
    })
    .then(subcategories=>subcategories.json())
    .then(subcategories=>
    {   
        subcategories.forEach(subcategoryJson => 
            {
               
                if(subcategoryJson.id == subCategoryId)
                {
                    subCategoryTitle = subcategoryJson.title
                }
            })
    })
}


function fetchSubCategoryAds()
{
    return fetch('https://wiki-ads.onrender.com/ads?subcategory='+subCategoryId,{method: "GET",
                                                                                headers: {
                                                                                'Accept':'application/json'
                                                                                    }
    })
    .then(response=>response.json())
    .then(function (adsJson) {
        adsJson.forEach(ad=>advertisements.push(ad));
    })
}


function prepareAdData()
{
    advertisements.forEach(ad=>
    {
        let featureMap = new Map()
        featureKeyValuePairs = ad.features.split(";")
            for (var i = 0; i < featureKeyValuePairs.length; i++) {
                var pair = featureKeyValuePairs[i].split(':');
                var key = pair[0].trim()
                value = "N/A"
                if (pair[1] !== undefined)
                {
                    value = pair[1] 
                }

                featureMap.set(key,value)
            }
        ad.features = featureMap
    })
}

//With the use of the Handlebars library  HTML content is dynamically generated 
function showPageContent()
{
    let main = document.getElementsByTagName("main")[0] 
    ads_template = document.getElementById("ads-template").textContent
    let compiledTemplate = Handlebars.compile(ads_template)
    let content = compiledTemplate({
        subcategorytitle: subCategoryTitle,
       advertisements: advertisements
    })
    main.innerHTML = content
}