const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',      // Se o seu utilizador do MySQL for diferente, altere aqui
  password: '',      // Se o seu MySQL tiver palavra-passe, digite-a entre as aspas
  database: 'sistema_musica',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;