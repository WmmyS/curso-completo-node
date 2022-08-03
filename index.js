const http = require('http');

const server = http.createServer(function(req, res) {
    const categoria = req.url;
    
    if(categoria == '/tecnologia'){
        res.end("<html><meta charset=\"UTF-8\"><body>Portal de tecnologia</body></body></html>")
    } else if (categoria == '/moda') {
        res.end("<html><meta charset=\"UTF-8\"><body>Portal de moda</body></body></html>")
    } else if (categoria == '/beleza') {
        res.end("<html><meta charset=\"UTF-8\"><body>Portal de beleza</body></body></html>")
    } else {
        res.end("<html><meta charset=\"UTF-8\"><body>Portal de notícias</body></body></html>")
    }

})

server.listen(3000);
console.log('Server started');