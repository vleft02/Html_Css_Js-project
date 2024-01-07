let dropdown_categories = []

 
window.addEventListener('load',function()
{  
        
    fetchMenuCategories()
    .then(()=>fillDropdownMenu(),)
    .catch(error => {
        console.error('Error ', error);
    });

})


function fetchMenuCategories()
{
    return fetch('https://wiki-ads.onrender.com/categories',{method: "GET",
                                                            headers: {
                                                                    'Accept':'application/json'
                                                                    }
                                                            })
    .then(response=>response.json())
    .then(cats=>
    {
        dropdown_categories.push(...cats)
    })
}

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