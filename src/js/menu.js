navbar.properties.appName = "Menu";

async function getMenu(){
    let response = await fetch(`${API_SOURCE}/menu/${stall}`);
    let data = await response.json();
    return data;
}

var stall = getCookie("username");

getMenu().then(menu=>{
    console.log(menu);
    var menu_component = new Vue({
        el: "#menu",
        data:{
            menu_data:json_to_readable(menu)
        }
    }); 
});

function json_to_readable(menu){
    let processed_header_menu = {}
    let categories = Object.keys(menu);
    console.log(menu)
    categories.forEach(category=>{
        processed_header_menu[category] = []
    })
    categories.forEach(category=>{
        menu[category].forEach(tr=>{
            let option_processed = option_process(tr);
            let res_row = header_process(option_processed);
            processed_header_menu[category].push(res_row);
        })
    })
    console.log(processed_header_menu)
    return processed_header_menu;
}

function header_process(menu_row){
    let legit_columns = ["id", 
        "name", 
        "category", 
        "in_stock", 
        "in_menu", 
        "desc", 
        "base_price", 
        "image_url", 
        "vegan", 
        "vegetarian",
        "Compulsory Options 1",
        "Compulsory Options 2",
        "Compulsory Options 3",
        "Optional Options 1",
        "Optional Options 2",
        "Optional Options 3"
    ]
    let header_mapping = {
        "id": "Item ID",
        "name": "Item Name",
        "category": "Category",
        "in_stock": "In Stock?",
        "in_menu": "In Menu?",
        "desc": "Description",
        "base_price": "Price",
        "image_url": "Image",
        "vegan": "Vegan?",
        "vegetarian": "Vegetarian?"
    }
    let res = {}
    let headers = Object.keys(menu_row)
    headers.forEach(header=>{
        if(header in header_mapping){
            res[header_mapping[header]] = menu_row[header];
        }
        else if (legit_columns.includes(header)){
            res[header] = menu_row[header];
        }
    })
    return res
}

function option_process(menu_row){
    let res = {}
    let headers = Object.keys(menu_row);
    for(var header in headers){
        if(headers[header] == 'compulsory_options'){
            let count = 1;
            menu_row['compulsory_options'].forEach(option_category=>{
                let option_table = `
                    <table class="centered">
                        <thead>
                            <tr>
                                <th class="bordered" colspan="2">${option_category['name']}</th>
                            </tr>
                            <tr>
                                <th class="bordered">Name</th>
                                <th class="bordered">Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                    `
                    option_category['options'].forEach(option=>{
                        option_table+=`
                        <tr>
                            <td class="bordered">${option["name"]}</td>
                            <td class="bordered">${option["cost"]}</td>
                        </tr>
                        `
                    })
                option_table+="</tbody></table>"
                res["Compulsory Options " + count] = option_table;
                count += 1;
            })
        }
        else if(headers[header] == 'optional_options'){
            let count = 1;
            menu_row['optional_options'].forEach(option_category=>{
                let option_table = `
                    <table class="centered">
                        <thead>
                            <tr>
                                <th class="bordered" colspan="2">${option_category['name']}</th>
                            </tr>
                            <tr>
                                <th class="bordered">Name</th>
                                <th class="bordered">Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                    `
                    option_category['options'].forEach(option=>{
                        option_table+=`
                        <tr>
                            <td class="bordered">${option["name"]}</td>
                            <td class="bordered">${option["cost"]}</td>
                        </tr>
                        `
                    })
                option_table+="</tbody></table>"
                res["Optional Options " + count] = option_table;
                count += 1;
            })
        }
        else{
            res[headers[header]] = menu_row[headers[header]];
        }
    }
    return res
}