Vue.component('header-bar',{
    props:['appName', 'username'],
    template:`
    <div class="topbar">
        <div class="row" id="navbar" style="margin-bottom:0; height:100%">
            <div class="input-field col s3 headerElem" style="color:lightgray">
                <i class="material-icons prefix">search</i>
                <input type="text" id="autocomplete-input" class="autocomplete" style="height:4vh; font-size:2vh">
            </div>
            <div class="col s6 headerElem" style="font-size:3vh;text-align: center">{{appName}}</div>
            <div class="col s3 headerElem" style="font-size:2vh;text-align: right; color:grey; line-height:4.5vh; padding-right:4vh;">
                {{username}}
            </div>
            <i class="material-icons prefix" style="position:absolute;top:2.5vh;right:1vh;">more_vert</i>
        </div>
    </div>
    `
})

Vue.component('overview_card', {
    props: ['header', 'stats', 'chart_data'],
    template: `
        <div class="col s12 m6" style="height:95%">
            <div class="card white darken-1" style="height:100%">
                <div class="card-content black-text" style="height:100%">
                    <span class="card-title" style="text-align:center">{{header}}</span>
                    <div class="row" style="margin-top:3%; height:80%">
                        <div class="col s6 m8" style="height:100%">
                            <div style="height:100%;width:100%; margin-top:1rem">
                                <canvas id="order_bars"></canvas>
                            </div>
                        </div>
                        <div class="col s6 m4">
                            <table class="centered highlight">
                                <tbody>
                                    <tr>
                                        <td class="stats">\${{stats.revenue}}</td>
                                        <td>Revenue</td>
                                    </tr>
                                    <tr>
                                        <td class="stats">{{stats.sales}}</td>
                                        <td>Items Sold</td>
                                    </tr>
                                    <tr>
                                        <td class="stats">{{stats.views}}</td>
                                        <td>Customer views</td>
                                    </tr>
                                    <tr>
                                        <td class="stats">{{stats.busy_time}}</td>
                                        <td>Most active time</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})

Vue.component('order_status', {
    props: ['header', 'stats'],
    template: `
        <div class="col s12 m6" style="height:95%">
            <div class="card white darken-1" style="height:100%">
                <div class="card-content black-text" style="height:100%">
                    <span class="card-title" style="text-align:center">{{header}}</span>
                    <div class="row" style="height:85%">
                        <div class="col s4 m4" style="height:100%">
                            <div class="card white darken-1" style="height:100%">
                            <div class="card-content black-text" style="height:100%; background:aliceblue">
                                <div class="statdata">{{stats.completed}}</div>
                                <div class="statheader">Orders Completed and Paid For</div>
                            </div>
                            </div>
                        </div>
                        <div class="col s4 m4" style="height:100%">
                            <div class="card white darken-1" style="height:100%">
                            <div class="card-content black-text" style="height:100%; background:honeydew">
                                <div class="statdata">{{stats.approved}}</div>
                                <div class="statheader">Orders Approved and Preparing</div>
                            </div>
                            </div>
                        </div>
                        <div class="col s4 m4" style="height:100%">
                            <div class="card white darken-1" style="height:100%">
                            <div class="card-content black-text" style="height:100%; background:lavenderblush">
                                <div class="statdata">{{stats.waiting}}</div>
                                <div class="statheader">Orders Awaiting Approval</div>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
})

Vue.component('items_sold', {
    props: ['header', 'items'],
    template: `
        <div class="col s12 m4" style="height:95%">
            <div class="card white darken-1" style="height:100%">
                <div class="card-content black-text" style="height:100%">
                    <span class="card-title" style="text-align:center">{{header}}</span>
                    <table class="centered" style="width:100%;">
                        <thead>
                            <tr>
                                <th> Item </th>
                                <th> Count </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="trow in items">
                                <td>{{trow.name}}</td>
                                <td>{{trow.count}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
})

Vue.component('tx_hist', {
    props: ['header', 'items'],
    template: `
        <div class="col s12 m4" style="height:95%">
            <div class="card white darken-1" style="height:100%">
                <div class="card-content black-text" style="height:100%">
                    <span class="card-title" style="text-align:center">{{header}}</span>
                    <table class="responsive-table centered" style="width:100%; height:95%;">
                        <thead style="display:block;">
                            <tr style="display:inline-block; width:100%">
                                <th style="display: inline-block; width:20%"> Customer <br>Order Time </th>
                                <th style="display: inline-block; width:60%"> Orders </th>
                                <th style="display: inline-block; width:15%"> Total Cost </th>
                            </tr>
                        </thead>
                        <tbody style="display:block; overflow-y: auto; height:75%; width:100%; border-bottom: 1px solid lightgray;">
                            <tr v-for="trow in items" style="display:inline-block; width:100%">
                                <td style="display: inline-block; width:20%"><p v-for="item in trow.customer">{{item}}</p></td>
                                <td style="display: inline-block; width:61%"><p v-for="item in trow.text">{{item}}</p></td>
                                <td style="display: inline-block; width:15%">{{trow.total_cost}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    `
})

Vue.component('thirdcard', {
    props: ['header', 'content'],
    template: `
        <div class="col s12 m4" style="height:95%">
            <div class="card white darken-1" style="height:100%">
                <div class="card-content black-text" style="height:100%">
                    <span class="card-title" style="text-align:center">{{header}}</span>
                    <div style="height:90%" v-html="content"></div style="height:100%">
                </div>
            </div>
        </div>
    `
})

Vue.component('topbar', {
    props: ['img_url', 'brand'],
    template: `
        <div class="topbar" style="height:8%; width:100%;">
            <a href="/"><img style="height:90%; margin-left:1.2rem" src="src/img/logo.png" ></img></a>
            <p style="display:flex; padding-left:1rem; line-height:8.5vh; font-size:1.5rem; color:darkslategray">Myx</p>
        </div>
    `
})

Vue.component('fullcard', {
    props: ['header', 'content'],
    template: `
        <div class="col s12 m12">
            <div class="card white darken-1">
                <div class="card-content black-text">
                    <span class="card-title">{{header}}</span>
                    <p v-html="content"></p>
                </div>
            </div>
        </div>
    `
})

Vue.component('menu_table',{
    props:['menu'],
    template:`
        <div style="margin:3rem" v-for="(category, key) in menu">
            <table class="striped responsive-table centered" style="width:100%;">
                <thead>
                    <tr>
                        <th v-for="(data, header) in menu[key][0]" style="width:5%;">
                            <div>{{header}}</div>
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="trow in menu[key]">
                        <td class="menuData" v-for="data in trow">
                            <div style="overflow:hidden;" v-html="data"></div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    `
})