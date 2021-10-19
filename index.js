const port = 8080;
const express = require('express')
const RC = require('typed-rest-client/RestClient');
const app = express();

// environment variables
const HelloServiceURL = process.env.HELLO_SERVICE_URL ? process.env.HELLO_SERVICE_URL : null;
//https://gorest.co.in/public/v1/users

app.set('view engine', 'pug');

app.get('/', function (req, res) {
    
    let today = new Date();
    let date = today.toLocaleDateString();
    let time = today.toLocaleTimeString([], {
        hourCycle: 'h23',
        hour: '2-digit',
        minute: '2-digit'
    });
    
    let message = date + " " + time;
    if(HelloServiceURL !== null){
        let rest = new RC.RestClient('helloService',
        HelloServiceURL);
        rest.get().then(r=>{
            
            message = message + "--" + r.result.data;
            res.render('hello', { title: 'Hey', message: message });
        });
    }else{
        res.render('hello', { title: 'Hey', message: message + " <hello service not found!>" });
    }
})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})