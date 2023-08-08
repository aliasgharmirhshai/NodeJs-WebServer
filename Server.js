const express = require('express');
const app = express();
require('dotenv').config();

(function () {
    const [nodePath, currentPath, ip] = process.argv;

    // validate ip addr
    if (!ip.match(/^(\d{1,3}\.){3}\d{1,3}$/))
        return console.error('\x1b[31m%s\x1b[0m\n', `please enter valid ip addr: ${ip}`);

    app.get('/', (req, res) => {
        res.send('Hello, world!');
    });

    app.listen(process.env.PORT, ip, () => {
        console.log(`Server running at http://${ip}:${process.env.PORT}`);
    });
})();