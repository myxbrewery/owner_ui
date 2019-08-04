Vue.component('sidebar-category',{
    props: ['category'],
    template: 
    `<div>
        <p class="sidebar-cat">{{category.title}}</p>
        <sidebar-list v-bind:category="category"></sidebar-list>
    </div>
    `
})

Vue.component('sidebar-list',{
    props: ['category'],
    template: 
    `<ul class="sidebar-list">
        <li v-for="subcategory in category.elements" style="margin-bottom:1vh">
            <ul style="box-shadow: none; border:0; margin:0;" class="collapsible">
                <li>
                    <div v-if='subcategory.href' class='sidebar-text' style="line-height:1.5; display:flex;">
                        <p v-html="subcategory.icon" style="display:inline; padding-right:1.3rem"></p>
                        <div style="display:inline; position:relative;">
                            <a style="color:black" :href="subcategory.href">{{subcategory.title}}</p>
                        </div>
                    </div>
                    <div v-else onclick='colorer(this)' class='collapsible-header sidebar-text'>
                        <p v-html="subcategory.icon" style="display:inline;"></p>
                        <div style="display:inline; position:relative;">
                            {{subcategory.title}}
                        </div>
                    </div>
                    <div class='collapsible-body blank' style="margin-left:5.35rem; border-bottom:0;" >
                        <ul v-if="subcategory.options && subcategory.options.length>0" :id="subcategory.title">
                            <li style="margin-top:1rem;" v-for="option in subcategory.options"">
                                <a style="color:black" :href="option.href">{{option.title}}</a>
                            </li>
                        </ul>
                    </div>
                </li>
            </ul>
        </li>
    </ul>`
})

var sidebar = new Vue({
    el: '#sidebar',
    data:{
        categories:[
            {
                "title":"GENERAL",
                "elements":[
                    {
                        "icon":'<i class="material-icons prefix">home</i>',
                        "title":"Home",
                        "options":[],
                        "href":"/"
                    },
                    {
                        "icon":'<i class="material-icons prefix">settings</i>',
                        "title":"Settings",
                        "options":[
                            {
                                "title":"Profile Management",
                                "href":"/profile"
                            },
                            {
                                "title":"Menu Management",
                                "href":"/menu"
                            },
                            {
                                "title":"Subscription",
                                "href":"/subscription"
                            },
                        ],
                    },
                    {
                        "icon":'<i class="material-icons prefix">format_line_spacing</i>',
                        "title":"Customization",
                        "options":[
                            {
                                "title":"Dashboard",
                                "href":"/dashboard"
                            },
                            {
                                "title":"Kitchen Card",
                                "href":"/kitchen"
                            },
                        ],
                    }
                ]
            },
            {
                "title":"STATISTICS",
                "elements":[
                    {
                        "icon":'<i class="material-icons prefix">watch_later</i>',
                        "title":"Real-time",
                        "options":[],
                        "href":"/realtime"
                    },
                    {
                        "icon":'<i class="material-icons prefix">timeline</i>',
                        "title":"Periodic",
                        "options":[],
                        "href":"/periodic"
                    },
                    {
                        "icon":'<i class="material-icons prefix">attach_money</i>',
                        "title":"Sales",
                        "options":[],
                        "href":"/sales"
                    },
                    {
                        "icon":'<i class="material-icons prefix">person</i>',
                        "title":"Customers",
                        "options":[],
                        "href":"/customers"
                    },
                    {
                        "icon":'<i class="material-icons prefix">swap_horiz</i>',
                        "title":"Transactions",
                        "options":[],
                        "href":"/transactions"
                    },
                    ]
            },
        ]
    }
})

function colorer(el){
    el.style.transition="all 0.35s";
    let highlight_background = "#E0EAFF";
    if(!el.isColored) {
        el.style.background = highlight_background;
        el.style.borderLeft = '5px solid blue';
    }
    else {
        el.style.background = '#FFFFFF';
        el.style.borderLeft = '0px solid blue';
    }
    el.isColored = !el.isColored;
}

// Sidebar collapsible rendering
document.addEventListener('DOMContentLoaded', function() {
    var options = {
    }
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, options);
});
