function load_menu(){
    if(verify_user()){
        var stall_user_id = document.getElementById("stall_uid").value
        fetch(API_SOURCE+"/stalls/"+stall_user_id)
            .then(res=>{
                console.log(res);
            })
    }
    else{
        
    }
}

function digest_menu(){
    var parent_element = document.getElementById("form_container");
}