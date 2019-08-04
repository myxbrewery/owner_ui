var maintenance = new Vue({
    el: '#maintenance',
    data:{
        header:'',
        content:''
    },
    created: function(){
        this.header = "Under Maintenance";
        this.content = 'This functionality is undergoing active development. Stay tuned!';
    }
})