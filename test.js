const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
    req.on("connect", function (chunk) {
        console.log(chunk.length)
    });
    res.writeHead(200);
    res.write('data')
    res.end();
})

server.listen(3001, () => {
    console.log('listening on port 3001')
});