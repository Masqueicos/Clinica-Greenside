const mysql = require('mysql2');
const cors = require('cors');
const db = require('./index').db;  // Importe o objeto db do seu index.js
app.use(cors());

// Remova a segunda declaração abaixo
/*
const db = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'aluno',
  database: 'mydb'
});
*/

function listarConsultas() {
    db.query('SELECT * FROM consultas', (err, results) => {
        if (err) {
            console.error('Erro ao obter consultas do banco de dados:', err);
        } else {
            // Atualizar a lista de consultas na interface
            var listaConsultas = document.getElementById('listaConsultas');
            listaConsultas.innerHTML = '';
            results.forEach(consulta => {
                var listItem = document.createElement('li');
                listItem.textContent = consulta.nome_do_paciente + ' - ' + consulta.data_da_consulta;
                listaConsultas.appendChild(listItem);
            });
        }
    });
}

module.exports = { listarConsultas };
