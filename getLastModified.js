var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
const axios = require('axios')
var fs = require('fs');
async function cloneData(urls) {
    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'thuctap'
    })

    let data = {}
    for (let i =0; i < urls.length; i++) {   //get html code from url
        await axios.get(`http://${urls[i].domain}`, {
            timeout: 5000
        })
            .then(function (res) {
                //regexInput = res.data
                console.log(i, "true")
                data = 
                    res.headers[`last-modified`]
               
            })
            .catch(function (err) {
                console.log(i, "fail", urls[i])
                data = 
                    null

                
            })
        console.log(data,urls[i].domain)
        connection.query(`update woocommerce set last_modified ='${data}' WHERE domain='${urls[i].domain}'`, function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
            }
        });
        


    }
    
    return data

}
function main() {

    var connection = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'thuctap'
    })

    connection.connect(function (err) {
        if (err)
            throw err
        else {
            console.log('Connected to MySQL');
            // Start the app when connection is ready
            app.listen(3000);
            console.log('Server listening on port 3000');
        }
    });
    var data = fs.readFileSync('domain.txt');
    data = JSON.parse(data)
    cloneData(data)

}

main()