const http = require('http');
const url = require('url');

const server = http.createServer((req, res)=>{
    let URL = url.parse(req.url)
    if(URL.pathname === '/'){
        res.write('Hello World');
        res.end();
    }
    else if(URL.pathname === '/hey'){
        res.write(JSON.stringify([1, 2, 3]));
        res.end();
    }
    else{
        res.write('no');
        res.end();
    }
});

server.listen(5000);