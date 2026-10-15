// const mysql = require("mysql2/promise");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "", 
//   database: "sistema_musica",
//   waitForConnections: true,
//   connectionLimit: 10,
//   queueLimit: 0
// });

// console.log("Conectando ao banco sistema_musica");

// module.exports = pool;

const mysql = require("mysql2");

const pool = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "", 
  database: "sistema_musica",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool;
