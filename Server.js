const http = require('http');
const fs = require('fs');

const port = process.argv[2];

if (!port) {
    console.log("Please Enter Port...");
    return;
}  

var mimeTypes = {
    "html": "text/html",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "png": "image/png",
    "svg": "image/svg+xml",
    "json": "application/json",
    "js": "text/javascript",
    "css": "text/css"
};

console.log(`Start Server On : http://localhost:${port}`);
http.createServer(function (req, res) {
    console.log("New request");
    console.log(req.url);
    //console.log(req);

    //if (req.url == "/")
    
    var URLParts = req.url.split('?');
    console.log(URLParts);
    if (URLParts[1]) {
        console.log("We Have Data From Query Params");
        console.log(URLParts[1]);
    }

    let postData = '';
    req.on('data', dataPart => {
        console.log(`We Received New Data : ${dataPart}`);
        postData += dataPart;
    });

    // req.on('end', () => {
    //     console.log(JSON.parse(postData));
    // })

    fs.readFile(__dirname + URLParts[0], function (err, data) {
        if (err) {
            res.writeHead(404);
            res.end(JSON.stringify(err));
            return;
        }
        var mimType = mimeTypes[URLParts[0].split('.').pop()];
    
        if (!mimType) {
            mimType = 'text/plain';
        }
    
        res.writeHead(200, {"Content-Type": mimType});
        res.write(data, "binary");
        res.end();
    });
}).listen(port);