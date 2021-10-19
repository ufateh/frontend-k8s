const port = 8081;
const express = require('express')
const request = require('request');
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
        call(HelloServiceURL)
    .then(r => {
        console.log(r)
        message = message + " " + r;
        res.render('hello', { title: 'Hey', message: message });
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
    }else{
        res.render('hello', { title: 'Hey', message: message + " <hello service not found!>" });
    }
})

function call(url){
    return new Promise((resolve, reject) => {
        request(url, { json: true }, (err, res, body) => {
          if (err) reject(err)
          resolve(body)
        });
    })
}

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})