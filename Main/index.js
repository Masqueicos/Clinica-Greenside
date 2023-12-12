const express = require('express');
const mysql = require('mysql2');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
const notes = require('./SaveNotes'); // Certifique-se de que o caminho corresponda ao local do seu arquivo SaveNotes.js.

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

const mydb = mysql.createConnection({
  host: 'localhost',
  user: 'phpmyadmin',
  password: 'aluno',
  database: 'users'
})

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
app.use('/home/ryfh/Downloads/Main/consulta.js', express.static(path.join(__dirname, '/home/ryfh/Downloads/Main/consulta.js')));

// Adicione esta rota para o socket.io.js
app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'node_modules', 'socket.io-client', 'dist', 'socket.io.js'));
});

db.connect((err) => {
  if (err) {
    console.error('Erro na conexão com o MySQL:', err);
  } else {
    console.log('Conectado ao MySQL - users');
  }
});

mydb.connect((err) => {
  if (err) {
    console.error('Erro na conexão com o MySQL:', err);
  } else {
    console.log('Conectado ao MySQL - mydb');
  }
});


app.post('/agendarConsulta', (req, res) => {
  let { nome, data } = req.body;
  console.log(`${nome} - ${data}\nreq.body = ${JSON.stringify(req.body)}`);

  // Salve os dados no banco de dados
  if(!nome) nome='Marcio';
  if(!data) data='2023-10-12';
  mydb.query('INSERT INTO consultas (nome_do_paciente, data_da_consulta) VALUES (?, ?)', [nome, data], (err, result) => {
      if (err) {
          console.error('Erro ao agendar consulta:', err);
          res.status(500).json({ error: 'Erro interno no servidor' });
      } else {
          console.log('Consulta agendada com sucesso!');
          res.json({ success: true });
      }
  });
});

app.get('/obterConsultas', (req, res) => {
  // Consulte o banco de dados para obter as consultas
  mydb.query('SELECT * FROM consultas', (err, results) => {
      if (err) {
          console.error('Erro ao obter consultas do banco de dados:', err);
          res.status(500).json({ error: 'Erro interno no servidor' });
      } else {
          // Enviar os resultados como JSON para o cliente
          res.json(results);
      }
  });
});


app.post('/salvar-anotacao', (req, res) => {
  if (req.session.loggedin) {
    const userId = req.session.userId;
    const anotacao = req.body.anotacao;

     // Agora, você pode salvar a anotação com o ID do usuário associado.
    // Exemplo de consulta SQL:
    const query = 'INSERT INTO anotacoes (user_id, data, anotacao) VALUES (?, ?, ?)';
    db.query(query, [userId, new Date(), anotacao], (err, results) => {
      if (err) {
        console.error('Erro ao salvar a anotação:', err);
        res.send('Erro ao salvar a anotação.');
      } else {
        
        // Redirecione para a página inicial após salvar a anotação.
        res.redirect('/');
      }
    });
  } else {
    res.send('Faça login para salvar anotações.');
  }
});


app.get('/', (req, res) => {
  if (req.session.loggedin) {
    const userId = req.session.userId; // Obtém o ID do usuário da sessão

    // Modifique esta função para obter apenas as anotações do usuário atual.
    notes.obterAnotacoes(userId, (err, anotacoes) => {
      if (err) {
        console.error('Erro ao obter anotações:', err);
        res.send('Erro ao obter anotações.');
      } else {
        res.render('index.ejs', { anotacoes }); // Renderize a página 'index.ejs' com as anotações obtidas.
      }
    });
  } else {
    res.send('Faça login para acessar esta página. <a href="/log-in">Login</a>');
  }
});


app.post('/login', (req, res) => {
  const { name, senha } = req.body;

  const query = 'SELECT * FROM users WHERE name = ? AND senha = ?';

  db.query(query, [name, senha], (err, results) => {
    if (err) throw err;

    if (results.length > 0) {
      req.session.loggedin = true;
      req.session.userId = results[0].id; // Defina o ID do usuário na sessão.
      res.redirect('/');
    } else {
      res.send('Credenciais incorretas. <a href="/log-in">Tente novamente</a>');
    }
  });
});


app.get('/cadastro', (req, res) => { // Rota da página 'cadastro.ejs'
  res.render('cadastro.ejs');
});

app.get('/log-in', (req, res) => { // Rota da página 'login.ejs'
  res.render('login.ejs');
});

app.get('/chat', (req, res) => {
  res.sendFile(path.join(__dirname, 'chat.html'));
});

app.get('/contato', (req, res) => {
  res.sendFile(path.join(__dirname, 'consulta.html'));
});

app.get('/Upload', (req, res) => { 
  res.sendFile(path.join(__dirname, 'Upload.html'));
});

app.get('/', (req, res) => {
  const filePath = path.join(__dirname, 'views', 'chat.html');
  console.log('File Path:', filePath);
  res.sendFile(filePath);
});

app.get('/socket.io/socket.io.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'node_modules', 'socket.io-client', 'dist', 'socket.io.js'));
});



app.get('/sobre', (req, res) => { // Rota da página 'sobre.ejs'
  res.render('sobre.ejs');
});

app.get('/planos', (req, res) => { // Rota da página 'planos.ejs'
  res.render('planos.ejs');
});

app.get('/contato', (req, res) => {
  res.render('contato.ejs'); // Certifique-se de que 'contato' corresponda ao nome do seu arquivo ejs.
});

app.get('/pagamento', (req, res) => {
  res.render('pagamento.ejs'); // Certifique-se de que 'payment' corresponda ao nome do seu arquivo ejs.
});


app.get('/pagamento2', (req, res) => {
  res.render('pagamento.ejs'); // Certifique-se de que 'payment' corresponda ao nome do seu arquivo ejs.
});

app.get('/pagamento3', (req, res) => {
  res.render('pagamento.ejs'); // Certifique-se de que 'payment' corresponda ao nome do seu arquivo ejs.
});


app.post('/cadastro', (req, res) => {
  const { name, senha, cpf, email } = req.body;

  const query = 'INSERT INTO users (name, senha, cpf, email) VALUES (?, ?, ?, ?)';

  db.query(query, [name, senha, cpf, email], (err, results) => {
    if (err) throw err;

    // Redirecione para a página de login após o cadastro bem-sucedido.
    res.redirect('/log-in');
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
});