let imageHeaders = new Headers()
let jsonHeaders = new Headers()

jsonHeaders.append('Accept', 'application/json')
imageHeaders.append('Accept', 'image/png')

let jsonInit = {
    method: "GET",
    headers:jsonHeaders
}

let imageInit = {
    method: "GET",
    headers:imageHeaders,

}
let categories = []
let subcategories = []

 
// class Category 
// {
//     constructor(id, title, img_url)
//     {
//         this.cid = id;
//         this.ctitle = title;
//         this.imgurl = img_url;
//         this.subCategories;
//     }

//     get title()
//     {
//         return this.ctitle;
//     }
//     get id()
//     {
//         return this.cid;
//     }
//     get img_url()
//     {
//         return this.title;
//     }
//     get subcategories()
//     {
//         return this.subCategories;
//     }

//     set title(value){
//         this.ctitle = value;
//     }

//     set id(value)
//     {
//         this.cid =value;
//     }

//     set img_url(value)
//     {
//         this.imgurl = value;
//     }

//     AddSubCategory(subCategory)
//     {
//         if(subcategories==undefined)
//         {
//             subCategory = []
//         }
//         categories.push(subCategory)
//     }

// }

// class SubCategory 
// {
//     constructor(id, cat_id , title)
//     {
//         this.scid = id;
//         this.cat_id = cat_id;
//         this.sctitle = title
//     }

//     get title()
//     {
//         return this.sctitle;
//     }
//     get id()
//     {
//         return this.scid;
//     }
//     get categoryId()
//     {
//         return this.cat_id;
//     }

//     set title(value){
//         this.sctitle = value;
//     }

//     set id(value)
//     {
//         this.scid =value;
//     }

//     set categoryId(cat_id)
//     {
//         this.cat_id = cat_id;
//     }


// }




window.addEventListener('load',function()
{
        
    fetch('https://wiki-ads.onrender.com/categories',jsonInit)
    .then(response=>response.json())
    .then(function (categoriesJson) {
        const categoryPromises = categoriesJson.map(category => {
            return fetch(`https://wiki-ads.onrender.com/categories/${category.id}/subcategories`, jsonInit)
                .then(response => response.json())
                .then(responseSubCategories => {
                category.subCategories = responseSubCategories;
                return category;  // Return the modified category
            });
        });
        return Promise.all(categoryPromises);
    })
    // .then(function(updatedCategories){
    //     const imagePromises = updatedCategories.map(category => {
    //         return fetch(`http://127.0.0.1:5000/https://wiki-ads.onrender.com/${category.img_url}`, imageInit)
    //         .then(response => response.blob() )
    //         .then(blob => {
    //             const imageUrl = URL.createObjectURL(blob);
    //             category.img_url = imageUrl
    //             return category
    //         });
    //     })
    //     return Promise.all(imagePromises);
    // })
    .then(updatedCategories => {
        categories.push(...updatedCategories);
    })
    .then(function()
    {
        let main = document.getElementsByTagName("main")[0]
        category_template = document.getElementById("category-template").textContent
        let compiledTemplate = Handlebars.compile(category_template)
        let content = compiledTemplate({
            ad_categories: categories
             
        })
        main.innerHTML = content
    })
    .catch(error => {
        console.error('Error ', error);
    });
})
