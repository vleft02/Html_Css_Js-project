
let headers = new Headers()
headers.append('Accept', 'application/json')

let dropdown_categories = []

 
window.addEventListener('load',function()
{  
        
    fetch('https://wiki-ads.onrender.com/categories')
    .then(response=>response.json())
    .then(cats=>
    {
        dropdown_categories.push(...cats)
        console.log(dropdown_categories)
    })
    .then(function()
    {
        let dropdownMenu = document.getElementById("dropdown-menu")
        dropdown_template = document.getElementById("dropdown-template").textContent
        let compiledTemplate = Handlebars.compile(dropdown_template)
        let content = compiledTemplate({
            ad_categories: dropdown_categories 
        })
        dropdownMenu.innerHTML = content
    }) 
    .catch(error => {
        console.error('Error ', error);
    });

})
