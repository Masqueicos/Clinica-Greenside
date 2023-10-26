const express = require('express');
const mysql = require('mysql2');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');

const app = express();
const port = 8001;

app.listen(port, () => {
  console.log(`Servidor em execução na porta ${port}`);
});

const db = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'aluno',
  database: 'users'
});

app.use(
  session({
    secret: 'sua_chave_secreta',
    resave: true,
    saveUninitialized: true,
  })
);

app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

db.connect((err) => {
  if (err) {
    console.error('Erro na conexão com o MySQL:', err);
  } else {
    console.log('Conectado ao MySQL');
  }
});


app.get('/', (req, res) => {
  res.render('index.ejs');
});

app.post('/login', (req, res) => {
  const { name, senha } = req.body;

  const query = 'SELECT * FROM users WHERE name = ? AND senha = ?';

  db.query(query, [name, senha], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      req.session.loggedin = true;
      req.session.name = name;
      res.redirect('/dashboard');
    } else {
      res.send('Credenciais incorretas. <a href="/">Tente novamente</a>');
    }
  });
});

app.get('/dashboard', (req, res) => {
  if (req.session.loggedin) {
    res.render('dashboard.ejs'); // Substitua 'dashboard.ejs' pelo nome da página do dashboard.
  } else {
    res.send('Faça login para acessar esta página. <a href="/">Login</a>');
  }
});

app.get('/cadastro', (req, res) => {
  res.render('cadastro.ejs');
});

app.post('/cadastro', (req, res) => {
  const { name, senha, cpf, email } = req.body;

  const query = 'INSERT INTO users (name, senha, cpf, email) VALUES (?, ?, ?, ?)';

  db.query(query, [name, senha, cpf, email], (err, results) => {
    if (err) throw err;

    // Redirecione para a página de login após o cadastro bem-sucedido.
    res.redirect('/');
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});
