function verify_user(){
    // POST to API endpoint, look if uid provided in html's "stall_uid" input field exists within Postgres database
    // Returns: Boolean
    var stall_user_id = document.getElementById("stall_uid").value
    var stall_pw = document.getElementById("stall_uid").value
    stall_pw_hash = sha256(stall_pw)
    console.log(stall_pw_hash)
    
}

async function sha256(message) {
    // encode as UTF-8
    const msgBuffer = new TextEncoder('utf-8').encode(message);                    

    // hash the message
    const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);

    // convert ArrayBuffer to Array
    const hashArray = Array.from(new Uint8Array(hashBuffer));

    // convert bytes to hex string                  
    const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
    return hashHex;
}