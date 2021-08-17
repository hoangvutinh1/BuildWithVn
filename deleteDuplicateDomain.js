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
    var data = fs.readFileSync('domain.txt');
    data = JSON.parse(data)
    var seclectSQL = "SELECT domain FROM woocommerce"
    var urlUpdate = []
    var check = false
    connection.query(seclectSQL, function (err, result) {
        if (result != null) {
            for (let j = 0; j < data.length; j++) {
                for (let i = 0; i < result.length; i++) {
                   
                    if (result[i].domain== data[j].domain) {

                        check = true;

                        break;
                    }
                }
                if (check == false) {

                    urlUpdate.push(data[j].domain)

                }
                check = false;
            }
        }
        else {
            for (let j = 0; j < data.length; j++) {
                urlUpdate.push(data[j].domain)

            }
            
        }
        
       
        fs.writeFile("deleteDuplicateDomain.txt", JSON.stringify(urlUpdate), {}, function (err) {

            console.log('Ghi file xong!');
        })
       
    })
   
}
main()