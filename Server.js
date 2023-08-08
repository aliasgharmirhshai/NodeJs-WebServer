const express = require('express');
const { ExtractIpAddress } = require('./src/utils/ExtractIpAddress');
const app = express();

(function () {
    const [nodePath, currentPath, ipAddr] = process.argv;

    // validate ip addr
    if (!/^(\d{1,3}\.){3}\d{1,3}:\d{1,5}$/.test(ipAddr)) {
        console.error('\x1b[31merror:\x1b[0m %s', `please enter valid ip addr and port: ${ipAddr}`);
        console.error('\x1b[33musage:\x1b[0m %s\n', 'IP:PORT (e.g. 192.168.1.2:3000)');
        return;
    }

    const { ip, port } = new ExtractIpAddress(ipAddr);

    app.get('/', ({ route = null, url = null, socket = null, rawHeaders = null }, res) => {
        console.log({ route, url, clientIp: socket.remoteAddress, rawHeaders });
        res.send('Hello, world!');
    });

    app.listen(port, ip, () => {
        console.log(`Server running at http://${ip}:${port}`);
    });
})();