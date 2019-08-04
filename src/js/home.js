var uid = getCookie('username');

var overview = new Vue({
    el: '#overview',
    data:{
        header:'',
        chart_data:{},
        stats:{},
        chart: null
    },
    created: function(){
        this.header = this.getFormattedDate();
        this.chart_data={};
        this.stats = {
            revenue:0,
            sales:0,
            views:0,
            busy_time: "10 AM"
        }
    },
    methods: {
        getFormattedDate: function(){
            let daydict = {
                0:'Sunday',
                1:'Monday',
                2:'Tuesday',
                3:'Wednesday',
                4:'Thursday',
                5:'Friday',
                6:'Saturday',
            };
            let monthdict = {
                1:'January',
                2:'February',
                3:'March',
                4:'April',
                5:'May',
                6:'June',
                7:'July',
                8:'August',
                9:'September',
                10:'October',
                11:'November',
                12:'December',
            }
            let today = new Date();
            return "Overview for " + daydict[today.getDay()] + ", " + today.getDate() + " " + monthdict[today.getMonth()];
        },
        update_stats: function(order_data){
            this.stats.revenue = order_data[0].toFixed(2)
            this.stats.sales = order_data[1]
        },
        update_graph(orders){
            let datetime_bins = {}
            for(let i=0;i<24;i++){
                datetime_bins[i] = 0
            }
            orders.forEach(order=>{
                let datetime_obj = new Date(order.start_datetime)
                let hour = datetime_obj.getHours();
                datetime_bins[hour]+=1;
            })
            this.chart_data['x'] = []
            this.chart_data['y'] = []
            for(let i=0;i<24;i++){
                let tmp_date = new Date()
                tmp_date.setHours(i)
                tmp_date.setMinutes(0)
                tmp_date.setSeconds(0)
                tmp_date.setMilliseconds(0)
                this.chart_data['x'].push(tmp_date)
                this.chart_data['y'].push(datetime_bins[i])
            }
            var ctx = document.getElementById('order_bars').getContext('2d');
            if(this.chart) this.chart.destroy();
            this.chart = new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: this.chart_data.x,
                    datasets: [{
                        label: 'Orders',
                        borderColor: 'rgb(120, 120, 120)',
                        data: this.chart_data.y
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                displayFormats: {
                                    'millisecond': 'HH:mm',
                                    'second': 'HH:mm',
                                    'minute': 'HH:mm',
                                    'hour': 'HH:mm',
                                    'day': 'HH:mm',
                                    'week': 'HH:mm',
                                    'month': 'HH:mm',
                                    'quarter': 'HH:mm',
                                    'year': 'HH:mm',
                                }
                            },
                            scaleLabel:{
                                display:true,
                                labelString: 'Time'
                            }
                        }],
                        yAxes: [{
                            scaleLabel:{
                                display:true,
                                labelString: 'Number of Orders'
                            }
                        }]
                    },
                }
            });
        }
    }
})

var revenue_card = new Vue({
    el: '#revenue',
    data:{
        header: 'Total Revenue',
        content: '$0'
    },
    methods: {
        update(new_revenue){
            this.content = '$' + new_revenue;
        }
    }
})

var order_status = new Vue({
    el: '#order_status',
    data:{
        header:'',
        stats:{}
    },
    created: function(){
        this.header = "Current Order Status";
        this.stats = {
            'completed': 0, 
            'approved': 0,
            'waiting' : 0
        }
    },
    methods:{
        update: function(orders){
            let completed = 0;
            let approved = 0;
            let waiting = 0;
            orders.forEach(order=>{
                if(order.status_id === 0) waiting += 1;
                else if(order.status_id === 1) approved += 1;
                else if(order.status_id >= 2) completed += 1;
            })
            this.stats.completed = completed;
            this.stats.approved = approved;
            this.stats.waiting = waiting;
        }
    }
})

var revenue_value = new Vue({
    el: '#revenue_value',
    data:{
        header:'',
        content:'wat',
        revenue_data: {},
        chart: null
    },
    created: function(){
        this.header = "Revenue Statistics";
        this.content = '<div style="height:90%;width:100%; margin-top:2rem"> \
                            <canvas id="revenue_graph"></canvas> \
                        </div>';
    },
    watch: {
        revenue_data: function(){
            this.update_graph();
        }
    },
    methods: {
        update_graph(){
            var ctx = document.getElementById('revenue_graph').getContext('2d');
            if(this.chart) this.chart.destroy();
            this.chart = new Chart(ctx, {
                type: 'line',
                data: {
                    labels: this.revenue_data.order_time,
                    datasets: [{
                        label: 'Revenue Over Time',
                        borderColor: 'rgb(120, 120, 120)',
                        data: this.revenue_data.amount
                    }]
                },
                options: {
                    maintainAspectRatio: false,
                    scales: {
                        xAxes: [{
                            type: 'time',
                            time: {
                                displayFormats: {
                                    'millisecond': 'HH:mm',
                                    'second': 'HH:mm',
                                    'minute': 'HH:mm',
                                    'hour': 'HH:mm',
                                    'day': 'HH:mm',
                                    'week': 'HH:mm',
                                    'month': 'HH:mm',
                                    'quarter': 'HH:mm',
                                    'year': 'HH:mm',
                                }
                            },
                            scaleLabel:{
                                display:true,
                                labelString: 'Time'
                            }
                        }],
                        yAxes: [{
                            scaleLabel:{
                                display:true,
                                labelString: 'Revenue ($)'
                            }
                        }]
                    },
                }
            });
        }
    }
})

var total_orders = new Vue({
    el: '#total_orders',
    data:{
        header:'',
        content:'wat'
    },
    created: function(){
        this.header = "Total Orders";
        this.content = '<p style="color:red">wat</p>';
    }
})

var tx_hist = new Vue({
    el: '#tx_hist',
    data:{
        header:'',
        items:[]
    },
    created: function(){
        this.header = "Transaction History";
        this.items = []
    },
    methods: {
        update: function(orders){
            this.items = []
            let datetime_set = {}
            orders.forEach(order=>{
                if(!(order.start_datetime in datetime_set)){
                    datetime_set[order.start_datetime] = []
                }
                datetime_set[order.start_datetime].push(order);
            })
            let date_keys = Object.keys(datetime_set);
            date_keys.sort(function(a,b){
                return new Date(b) - new Date(a)
            })
            date_keys.forEach(date_key=>{
                let row_obj = {}
                row_obj.customer = []
                row_obj.customer.push("ID: " + datetime_set[date_key][0].customer_id)
                let date_obj = new Date(date_key)
                row_obj.customer.push(date_obj.toLocaleTimeString())
                row_obj.order_time = date_key
                row_obj.text = []
                row_obj.total_cost = 0
                datetime_set[date_key].forEach(order=>{
                    row_obj.total_cost += order.total_price
                    row_obj.text.push(order.name)
                })
                row_obj.total_cost = Math.round(row_obj.total_cost*100)/100
                this.items.push(row_obj)
            })
        }
    }
})

var items_sold = new Vue({
    el: '#items_sold',
    data:{
        header:'',
        items:[]
    },
    created: function(){
        this.header = "Bestseller List";
        this.items = []
    },
    methods: {
        update: function(orders){
            let item_set = {}
            orders.forEach(order=>{
                if(!(order.name in item_set)){
                    item_set[order.name] = 0
                }
                item_set[order.name] += 1;
            })
            let item_list = []
            for(item in item_set){
                item_list.push({
                    name: item,
                    count: item_set[item]
                })
            }
            this.items = item_list.sort(function(a,b){
                return b.count - a.count;
            });
        }
    }
})

var socket = io(API_SOCKET, {transports: ['websocket'], secure:true});
socket.emit('stall_join', uid);
socket.on('orders', message=>{
    let orders = message;
    console.log(orders)
    let order_data = revenue_graph(orders);
    overview.update_stats(order_data);
    overview.update_graph(orders);
    items_sold.update(orders)
    order_status.update(orders);
    tx_hist.update(orders);
})

function revenue_graph(orders){
    /*
    Parses data for revenue graph on the Overview Page (bottom left corner)
    */
    for (i in orders) orders[i].start_datetime = new Date(orders[i].start_datetime);
    orders.sort(function(a,b){
        return a.start_datetime - b.start_datetime
    })
    let orders_over_time = {
        order_time: [],
        amount: []
    }
    let time_value_arr = []
    // function randomDate(start, end) {
    //     return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    // }

    // // Dev: testing
    // for(let i=0;i<10;i++){
    //     time_value_arr.push({
    //         start_datetime: randomDate(new Date(2019, 7, 1, 21), new Date()),
    //         total_price: Math.random()*15})
    // }
    for(entry in orders){
        time_value_arr.push({
            start_datetime: orders[entry].start_datetime,
            total_price: orders[entry].total_price
        })
    }
    time_value_arr.sort(function(a, b) {
        return a.start_datetime - b.start_datetime
    });

    let last_amount = 0;
    // for(entry in orders){
    for(entry in time_value_arr){
        orders_over_time.order_time.push(time_value_arr[entry].start_datetime);
        orders_over_time.amount.push(time_value_arr[entry].total_price + last_amount);
        last_amount += time_value_arr[entry].total_price;
    }
    revenue_value.revenue_data = orders_over_time;
    return [last_amount, time_value_arr.length]
}

// Total revenue value
// Num items sold
// Total orders
// Hourly average revenue value
// Hourly average revenue number
// 3 Most popular items
