let categories = []
let subcategories = []


window.addEventListener('load',function()
{
        
    fetchCategories()
    .then(()=>showPageContent())
    .catch(error => {
        console.error('Error ', error);
    });
})

function fetchCategories()
{
    return fetch('https://wiki-ads.onrender.com/categories',{method: "GET",
                                                            headers :{
                                                                'Accept': 'application/json'
                                                            }}
    )
    .then(response=>response.json())
    .then(function (categoriesJson) {
        const categoryPromises = categoriesJson.map(category => {
            return fetch(`https://wiki-ads.onrender.com/categories/${category.id}/subcategories`,{ method: "GET",
                                                                                                    headers :{
                                                                                                        'Accept': 'application/json'
                                                                                                    }}
    )
                .then(response => response.json())
                .then(responseSubCategories => {
                category.subCategories = responseSubCategories;
                return category;  // Return the modified category
            });
        });
        return Promise.all(categoryPromises);
    })
    .then(updatedCategories => {
        categories.push(...updatedCategories);
    })
}

function showPageContent()
{
    let main = document.getElementsByTagName("main")[0]
        category_template = document.getElementById("category-template").textContent
        let compiledTemplate = Handlebars.compile(category_template)
        let content = compiledTemplate({
            ad_categories: categories
             
        })
        main.innerHTML = content
}