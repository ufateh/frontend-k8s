const port = 8080;
const express = require('express')
const RC = require('typed-rest-client/RestClient');
const app = express();

// environment variables
const HelloServiceURL = process.env.HELLO_SERVICE_URL == undefined ? null : process.env.HELLO_SERVICE_URL;
//https://gorest.co.in/public/v1/users

app.set('view engine', 'pug');

app.get('/', function (req, res) {
    console.log('helloservice url ',HelloServiceURL)
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
            console.log(r)
            message = message + "--" + r;
            res.render('hello', { title: 'Hey', message: message });
        },err=>{
            console.log(err);
            res.json(JSON.stringify(err));
        });
    }else{
        res.render('hello', { title: 'Hey', message: message + " <hello service not found!>" });
    }
})


app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})