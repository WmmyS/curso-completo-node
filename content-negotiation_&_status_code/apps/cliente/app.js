const http = require('http');

const opcoes = {
    hostname: 'localhost',
    port: 8080,
    path: '/',
    method: 'post',
    headers: {
        'Accept': 'application/json',
        'Content-type': 'application/json'
    }
}

// Content-type
// x-www-form-urlencoded => Formato padrão de formulários enviador via submit de páginas html, combinação chave: valor. Exemplo: 'nome=José'.

const html = 'nome=José' // x-www-form-urlencoded
const json = {nome: 'José' };
const string_json = JSON.stringify(json);

const buffer_corpo_response = []

const req = http.request(opcoes, function(res){

    // Assim podemos recuperar partes do buffer
    res.on('data', function(pedaco){
        buffer_corpo_response.push(pedaco)
    })

    // Executará no final do recebimento do buffer
    res.on('end', function() {
        const corpo_response = Buffer.concat(buffer_corpo_response).toString()
        console.log(corpo_response)
    })

    res.on('error', function() {

    })
});

req.write(string_json) //Anexa essa nossa string no body do nosso request
req.end();

/* http.get(opcoes, function(res){

    // Assim podemos recuperar partes do buffer
    res.on('data', function(pedaco){
        buffer_corpo_response.push(pedaco)
    })

    // Executará no final do recebimento do buffer
    res.on('end', function() {
        const corpo_response = Buffer.concat(buffer_corpo_response).toString()
        console.log(corpo_response)
    })

    res.on('error', function() {

    })
}); */