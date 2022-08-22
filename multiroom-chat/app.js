/* Importar configurações do servidor */
const app = require('./config/server');

/* Parametrizar a porta de escuta */
const server = app.listen(8080, () => {
    console.log('Server online');
});

// Estamos direcionando o socket io para que ele também escute dentro dessa porta do servidor
const Server = require('socket.io');
const io = new Server(server);

// Aplicando o server io como variável para nossa aplicação
app.set('io', io);

// Criar conexão por websocket
io.on('connection', function(socket){
    console.log('Usuário conectado')

    socket.on('disconnect', function(){
        console.log('Usuário desconectou')
    })

    socket.on('msgParaServidor', function(data){
        
        /*Diálogo*/
        socket.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}
        )

        socket.broadcast.emit(
            'msgParaCliente',
            {apelido: data.apelido, mensagem: data.mensagem}
        )

        /*Participantes*/
        if (parseInt(data.apelido_atualizado_nos_clientes) == 0) {
            socket.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            )
    
            socket.broadcast.emit(
                'participantesParaCliente',
                {apelido: data.apelido}
            )
        }
        
    }) 

})

// Ouvindo pedidos de execução
// on('nome', function(data){})

// Pedidos para executar alguma ação
// emit('nome', function(data){}) // Aceita qualquer propriedade inclusive função