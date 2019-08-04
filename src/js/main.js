var dev_server = 'http://10.12.254.221:11235'
var dev_socket = 'http://10.12.254.221:11236'
var prod_server = 'https://www.myxbrewapi.com/'
var server_socket = 'https://www.myxbrewapi.com/'

// var API_SOURCE = dev_server;
// var API_SOCKET = dev_socket;

var API_SOURCE = prod_server;
var API_SOCKET = server_socket;

var topbar = new Vue({
    el: '#topbar',
    data:{
        img_url: '<img src="src/img/logo.png"></img>',
        brand: 'Myx'
    }
})

var navbar = new Vue({
    el: '#header-bar',
    data:{
        properties:{
            appName: 'Home',
            username: getCookie('username')
        }
    },
})

// Search bar links
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

function getCookie (cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}