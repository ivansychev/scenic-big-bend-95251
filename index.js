const cool = require('cool-ascii-faces')
const express = require('express')
var http = require('http');
var path = require('path');
var socketIO = require('socket.io');
const PORT = process.env.PORT || 5000

const { Pool } = require('pg');
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: true
});

var app = express();
var server = http.Server(app);
var io = socketIO(server);

app
    .use('/public', express.static(path.join(__dirname, 'public')))
    .set('views', path.join(__dirname, 'views'))
    .set('view engine', 'ejs')
    .get('/', (req, res) => res.render('pages/index'))
    .get('/game',(req, res) => {
        res.sendFile(path.join(__dirname, 'index.html'));
    })
    .get('/collision',(req, res) => {
        res.sendFile(path.join(__dirname, 'dist/index.html'));
    }).get('/mygame',(req, res) => {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
    });

server.listen(PORT, () => console.log(`Listening on ${ PORT }`))

io.on('connection', function(socket) {
});

var players = {};
io.on('connection', function(socket) {
    socket.on('new player', function() {
        players[socket.id] = {
            x: 300,
            y: 300
        };
    });
    socket.on('movement', function(data) {
        var player = players[socket.id] || {};
        if (data.left) {
            player.x -= 5;
        }
        if (data.up) {
            player.y -= 5;
        }
        if (data.right) {
            player.x += 5;
        }
        if (data.down) {
            player.y += 5;
        }
    });
});
setInterval(function() {
    io.sockets.emit('state', players);
}, 1000 / 60);


/*
* .get('/cool', (req, res) => res.send(cool()))
    .get('/times', (req, res) => {
        let result = ''
        const times = process.env.TIMES || 5
        for (i = 0; i < times; i++) {
            result += i + ' '
            }
        res.send(result)
    })
    .get('/db', async (req, res) => {
     try {
         const client = await pool.connect()
         const result = await client.query('SELECT * FROM test_table');
        res.render('pages/db', result);
        client.release();
     } catch (err) {
        console.error(err);
        res.send("Error " + err);
    }
})
* */
