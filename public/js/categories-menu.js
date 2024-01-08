let dropdown_categories = []

 
window.addEventListener('load',function()
{  
        
    fetchMenuCategories()
    .then(()=>fillDropdownMenu(),)
    .catch(error => {
        console.error('Error ', error);
    });

})

// The categories are fetched using GET from the remote server 
// and used to populate the dropdown_categories array
function fetchMenuCategories()
{
    return fetch('https://wiki-ads.onrender.com/categories',{method: "GET",
                                                            headers: {
                                                                    'Accept':'application/json'
                                                                    }
                                                            })
    .then(response=>response.json())
    .then(categories=>
    {
        dropdown_categories.push(...categories)
    })
}

//With the use of the Handlebars library  HTML content is dynamically generated and added to the 
// dropdown menu under categories
function fillDropdownMenu()
{
    let dropdownMenu = document.getElementById("dropdown-menu")
    dropdown_template = document.getElementById("dropdown-template").textContent
    let compiledTemplate = Handlebars.compile(dropdown_template)
    let content = compiledTemplate({
        ad_categories: dropdown_categories 
    })
    dropdownMenu.innerHTML = content
}