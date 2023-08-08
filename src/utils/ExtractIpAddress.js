class ExtractIpAddress {
    constructor(ipAddr) {
        this.ipAddr = ipAddr;
        this.colonIndex = this.ipAddr.lastIndexOf(':');
    }
    get port() {
        return this.ipAddr.slice(this.colonIndex + 1);
    }
    get ip() {
        return this.ipAddr.slice(0, this.colonIndex);
    }
}

module.exports = { ExtractIpAddress };