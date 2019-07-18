// import Vue from 'vue'
// import VueSidebarMenu from 'vue-sidebar-menu'
// import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

var app = new Vue({
    el: '#app',
    data: {
      message: 'Hello Vue!'
    }
})

var navbar = new Vue({
    el: '#navbar',
    data:{
        appName: 'Home',
        username: 'Zoos'
    }
})

Vue.component('sidebar', {
    data: function(){
        return {
            count:0
        }
    },
    template: '<div class="col s2" id="sidebar"></div>'
})

Vue.component('sidebar-list',{
    props: ['category'],
    template: 
    `<ul class="sidebar-list">
        <li v-for="subcategory in category.elements" style="margin-bottom:1vh">
            <ul style="box-shadow: none; border:0; margin:0;" class="collapsible">
                <li>
                    <div class='collapsible-header' style='padding:3px; border:0; height:2rem; margin-top:1rem;' onclick='colorer(this)'>
                        <p v-html="subcategory.icon" style="display:inline"></p>
                        <div style="display:inline; position:relative;">
                            {{subcategory.title}}
                        </div>
                    </div>
                    <div class='collapsible-body blank' style="margin-left:3rem; border-bottom:0;" >
                        <ul v-if="subcategory.options && subcategory.options.length>0" :id="subcategory.title">
                            <li style="margin-top:1rem;" v-for="option in subcategory.options">{{option.title}}</li>
                        </ul>
                    </div>
                </li>
            </ul>
        </li>
    </ul>`
})

Vue.component('sidebar-category',{
    props: ['category'],
    template: 
    `<div>
        <p class="sidebar-cat">{{category.title}}</p>
        <sidebar-list v-bind:category="category">aaa</sidebar-list>
    </div>
    `
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
                    },
                    {
                        "icon":'<i class="material-icons prefix">settings</i>',
                        "title":"Settings",
                        "options":[
                            {
                                "title":"Profile Management"
                            },
                            {
                                "title":"Menu Management"
                            },
                            {
                                "title":"Subscription"
                            },
                        ],
                    },
                    {
                        "icon":'<i class="material-icons prefix">format_line_spacing</i>',
                        "title":"Customization",
                        "options":[
                            {
                                "title":"Dashboard"
                            },
                            {
                                "title":"Kitchen Card"
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
                    },
                    {
                        "icon":'<i class="material-icons prefix">timeline</i>',
                        "title":"Periodic",
                        "options":[],
                    },
                    {
                        "icon":'<i class="material-icons prefix">attach_money</i>',
                        "title":"Sales",
                        "options":[],
                    },
                    {
                        "icon":'<i class="material-icons prefix">person</i>',
                        "title":"Customers",
                        "options":[],
                    },
                    {
                        "icon":'<i class="material-icons prefix">swap_horiz</i>',
                        "title":"Transactions",
                        "options":[],
                    },
                    "Real-Time", "Periodic", "Sales", "Customers", "Transactions"]
            },
        ]
    }
})

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.autocomplete');
    var options = {
        "data":{
            "Apple": null,
            "Microsoft": null,
            "Google": 'https://placehold.it/250x250'
        }
    }
    var instances = M.Autocomplete.init(elems, options);
});

document.addEventListener('DOMContentLoaded', function() {
    var options = {
        onOpenEnd: function(){
            this.style = 'background:blue'
        }
    }
    var elems = document.querySelectorAll('.collapsible');
    var instances = M.Collapsible.init(elems, options);
});

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