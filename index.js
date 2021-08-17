var express = require('express');
var app = express();
var path = require('path');
var mysql = require('mysql');
const axios = require('axios')
var fs = require('fs');
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
    var seclectSQL = "SELECT domain FROM website where platform='woocommerce'"
    connection.query(seclectSQL, function (err, result) {

        fs.writeFile("domain.txt", JSON.stringify(result), {}, function (err) {

            console.log('Ghi file xong!');
        })

    })
  
    
}

main()