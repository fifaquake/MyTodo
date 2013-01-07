// http://www.hacksparrow.com/using-node-js-to-download-files.html
var fs = require('fs');
var url = require('url');
var http = require('http');
var exec = require('child_process').exec;
var spawn = require('child_process').spawn;

// App variables
var file_url = 'http://downloads.mongodb.org/win32/mongodb-win32-x86_64-2.2.1.zip';

// Function to download file using HTTP.get
var download_file_httpget = function (file_url) {
    var options = {
        host: url.parse(file_url).host,
        port: 80,
        path: url.parse(file_url).pathname
    };

    var file_name = url.parse(file_url).pathname.split('/').pop();
    console.log(file_name);
    var file = fs.createWriteStream(file_name);

    http.get(options, function (res) {
        res.on('data', function (data) {
            file.write(data);
        }).on('end', function () {
            file.end();
            console.log(file_name + ' downloaded to ' + DOWNLOAD_DIR);
        });
    });
};

download_file_httpget(file_url);



