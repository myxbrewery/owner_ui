navbar.properties.appName = "Login";
navbar.properties.username = "";

document.addEventListener("DOMContentLoaded", function(event) {
    var login = new Vue({
        el: '#login',
        data:{
            header:"Myx Merchant Systems Login",
            content:`
            <p style="color:red; padding-top:1rem; visibility:hidden">Invalid Username/Password</p>
            <div class="row">
                <div class="row">
                    <div class="input-field col s8 offset-s2">
                        <input id="username" type="text">
                        <label for="username">Login ID</label>
                    </div>
                    <div class="input-field col s8 offset-s2">
                        <input id="password" type="password">
                        <label for="password">Password</label>
                    </div>
                </div>
                <button id="submitlogin" onclick="submitLogin()" class="btn white waves-effect waves-light" style="color:black" >
                    Submit <i class="material-icons right">send</i>
                </button>
            </div>
            `
        }
    })
});

function submitLogin(){
    let login = document.getElementById('username');
    let passwd = document.getElementById('password');
    let user_valid = dbCheck(login.value, passwd.value);
    // Verify user in db
    // If user in db, set cookie, otherwise dont
    if(user_valid){
        setCookie('username', login.value, 7);
        window.location='/'
    }
    else{
        document.getElementById('submitlogin').style = "color:red; transition: all 2s"
        setInterval(()=>{
            document.getElementById('submitlogin').style = "color:black; transition: all 2s"
        }, 1000)
    }
}

function dbCheck(username, pw){
    let temp_users = ['ch1ck3n', 'gomg0m', 'gong_cha', 'myx']
    if(temp_users.includes(username)){
        return true;
    }
    console.log("DB check failed")
    return false;
}

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

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