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
    for (let i = 0; i < urls.length; i++) {   //get html code from url
        await axios.get(`http://${urls[i]}/wp-json/wp/v2/product`, {
            timeout: 5000
        })
            .then(function (res) {
                //regexInput = res.data
                console.log(i, "true")
                data = [[
                    urls[i], res.headers['x-wp-total']
                ]]
            })
            .catch(function (err) {
                console.log(i, "fail", urls[i])
                data = [[
                    urls[i], err
                ]]
            })
        connection.query('INSERT INTO woocommerce(domain,totalProduct) VALUES ?', [data], function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log('Success');
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
            app.listen(3001);
            console.log('Server listening on port 3001');
        }
    });
    var data = fs.readFileSync('deleteDuplicateDomain.txt');
    data = JSON.parse(data)
    cloneData(data)

}

main()