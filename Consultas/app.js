const express = require('express');
const mysql = require('mysql2');
const moment = require('moment');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Configurando o body-parser
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
    host: 'localhost',
    user: 'phpmyadmin',
    password: 'aluno',
    database: 'meu_banco_de_dados'
  });

// Conectar ao banco de dados
db.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao banco de dados:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL');
});

// Configurando o EJS como mecanismo de visualização
app.set('view engine', 'ejs');

// Servindo arquivos estáticos da pasta 'public'
app.use(express.static('public'));

// Rota para exibir consultas agendadas
app.get('/', (req, res) => {
  // Exemplo de consulta
  db.query('SELECT * FROM consultas', (err, results) => {
    if (err) {
      console.error('Erro ao executar a consulta:', err);
      return res.status(500).send('Erro interno do servidor');
    }

    // Formatando a data antes de exibir
    const consultasFormatadas = results.map((consulta) => ({
      id: consulta.id,
      dia: moment(consulta.dia).format('YYYY-MM-DD'),
      horario: consulta.horario,
    }));

    res.render('index', { consultas: consultasFormatadas });
  });
});

// Rota para agendar uma nova consulta
app.post('/nova-consulta', (req, res) => {
  const { dia, horario } = req.body;

  // Valide os dados conforme necessário

  // Insira os dados no banco de dados
  const sql = 'INSERT INTO consultas (dia, horario) VALUES (?, ?)';
  const values = [dia, horario];

  db.query(sql, values, (err) => {
    if (err) {
      console.error('Erro ao agendar a consulta:', err);
      return res.status(500).send('Erro interno do servidor');
    }

    // Redirecione para a página inicial após agendar a consulta
    res.redirect('/');
  });
});

// Iniciando o servidor na porta especificada
app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});


// ROTA ADICIONADA Adicione esta rota antes da rota para exibir as consultas
app.post('/cancelar-consulta', (req, res) => {
    const consultaId = req.body.consultaId;
  
    // Adicione lógica para cancelar a consulta no banco de dados (excluindo ou marcando como cancelada)
    const sql = 'DELETE FROM consultas WHERE id = ?';
    const values = [consultaId];
  
    db.query(sql, values, (err) => {
      if (err) {
        console.error('Erro ao cancelar a consulta:', err);
        return res.status(500).send('Erro interno do servidor');
      }
  
      // Redirecione para a página inicial após cancelar a consulta
      res.redirect('/');
    });
  });