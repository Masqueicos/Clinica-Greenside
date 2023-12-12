# Clínica Greenside

## Criação de ambientes de desenvolvimento

Abaixo está o passo a passo da criação de um ambiente de desenvolvimento no Linux Ubuntu 20.04 LTS usando o terminal.

### Apache

O Apache é um software de servidor de internet HTTP. Ele é gratuito, de código aberto e perfeito para desenvolvedores independentes e para pequenos negócios que queiram ter seu próprio site, por exemplo. Para instalá-lo é preciso seguir os seguintes passos:

1. Abra o terminal e instale o ***apache2***
    
    ```bash
    sudo apt install apache2
    ```
    
2. Se o apache for instalado corretamente, será possível acessar a página index do seu site através do endereço [**http://localhost/**](http://localhost/)
3. Para editar a página index acesse a pasta ***var/www/html*** e abra o arquivo ***index.html***
    
    ```bash
    cd var/www/html
    sudo nano index.html
    ```
    
4. Para editar a página index acesse a pasta ***var/www/html*** e abra o arquivo ***index.html***
    
    ```bash
    cd var/www/html
    sudo nano index.html
    ```
    

### MySQL ou MariaDB

O MySQL é um sistema de gerenciamento de banco de dados, que utiliza a linguagem SQL como interface. Atualmente ele é um dos sistemas de gerenciamento de bancos de dados mais populares. Para instalá-lo é preciso seguir os seguintes passos:

1. Abra o terminal e instale o ***mysql-server*** ou o ***mariadb-server***
    
    ```bash
    sudo apt install mysql-server
    ```
    
    ```bash
    sudo apt install mariadb-server
    ```
    

### phpMyAdmin

phpMyAdmin é um aplicativo web livre e de código aberto desenvolvido em PHP para a administração do MySQL pela internet. Nele é possível criar e remover bases de dados, criar, remover e alterar tabelas, inserir, remover e editar campos, executar códigos SQL e manipular campos chaves. Para instalá-lo é preciso seguir os seguintes passos:

1. Abra o terminal e instale o ***phpmyadmin***
    
    ```bash
    sudo apt install phpmyadmin
    ```
    
2. Durante a configuração é necessário selecionar a opção ***apache2***, definir o user como ***root*** e a senha para acessar o phpMyAdmin
3. Se o phpMyAdmin for instalado corretamente, será possível acessar a página index do seu site através do endereço [http://localhost/phpmyadmin](http://localhost/phpmyadmin). O user é ***phpmyadmin*** e a senha que você definiu anteriormente.
4. Para conectá-lo ao banco de dados acesse o tutorial e execute o MySQL ou MariaDB
    
    ```sql
    show databases;
    GRANT ALL ON *.* TO 'phpmyadmin'@'localhost';
    FLUSH PRIVILEGES;
    quit
    ```
    

### NodeJS

Node.js é um software de código aberto que permite a execução de códigos JavaScript fora de um navegador web. O NodeJS interpreta esses códigos e faz a sua conversão para a linguagem de máquina a ser executada pelo computador. Para instalá-lo é preciso seguir os seguintes passos:

1. Abra o terminal e instale o ***python3-pip***
    
    ```bash
    sudo apt install python3-pip
    ```
    
2. Instale o ******user ***nodeenv*** através do pip
    
    ```bash
    pip3 install --user nodeenv
    ```
    
3. Reinicie sua máquina ou digite ***source ~/.profile*** no terminal
    
    ```bash
    source ~/.profile
    ```
    
4. Vá até a pasta em que você quer instalar o NodeJS e crie um ambiente de desenvolvimento nela, substituindo ***************************************nome_do_ambiente*************************************** pelo nome do ambiente Node que você desejar
    
    ```bash
    nodeenv nome_do_ambiente
    ```
    
5. Ative o Node com esse comando e o prompt deverá indicar o nome do ambiente entre parênteses antes do seu usuário, e para desativá-lo use o segundo comando
    
    ```bash
    source ./nome_do_ambiente/bin/activate
    deactivate_node
    ```
    

### ExpressJS

Express.JS é um framework de software livre e de código aberto para NodeJS que fornece recursos para a construção de servidores web. Esse é um dos mais frameworks mais populares para servidores em NodeJS. Para instalá-lo é preciso seguir os seguintes passos:

1. Abra o terminal e instale o ***express*** e o que mais for necessário através do npm
    
    ```bash
    npm install express mysql2 ejs express-session body-parser
    ```
    

### Configurações Finais

1. Abra o phpMyAdmin no navegador e crie uma database chamada ***users***
2. Execute o seguinte código na seção SQL
    
    ```sql
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        cpf VARCHAR(14) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS consultas (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome_do_paciente VARCHAR(255) NOT NULL,
        data_da_consulta DATE NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS anotacoes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        data DATETIME NOT NULL,
        anotacao TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id)
    );
    ```
    
3. Volte a pagina inicial execute o seguinte código na seção SQL
    
    ```sql
    CREATE DATABASE meu_banco_de_dados;
    
    USE meu_banco_de_dados;
    
    CREATE TABLE consultas (
      id INT AUTO_INCREMENT PRIMARY KEY,
      dia DATE,
      horario TIME
    );
    
    INSERT INTO consultas (dia, horario) VALUES
      ('2023-12-07', '14:30:00'),
      ('2023-12-08', '10:00:00'),
      ('2023-12-09', '16:45:00');
    ```
    
4. Entre na pasta ***Main*** e confira se o arquivo “***package.json***” está atualizado como mostrado abaixo
    
    ```json
    {
      "name": "Main",
      "version": "1.0.0",
      "description": "",
      "main": "app.js",
      "dependencies": {
        "body-parser": "^1.20.2",
        "bootstrap": "^5.3.2",
        "cookie-parser": "^1.4.6",
        "cors": "^2.8.5",
        "ejs": "^3.1.9",
        "express": "^4.18.2",
        "express-session": "^1.17.3",
        "mysql2": "^3.6.2",
        "path": "^0.12.7",
        "pusher": "^5.1.3",
        "select2": "^4.1.0-rc.0",
        "socket.io": "^4.7.2",
        "socket.io-client": "^4.7.2"
      },
    ```
    
    Use o *********************************npm init -y********************************* no console da pasta para criar os arquivos json caso eles ainda não existam, e depois use o código abaixo
    
    ```bash
    npm install body-parser bootstrap cookie-parser cors ejs express express-session mysql2 path pusher select2 [socket.io](http://socket.io/) socket.io-client
    ```
    
5. Entre na pasta ***Consultas*** e confira se o arquivo “***package.json***” está atualizado como mostrado abaixo
    
    ```json
    {
      "name": "Consultas",
      "version": "1.0.0",
      "description": "",
      "main": "app.js",
      "dependencies": {
        "body-parser": "^1.20.2",
        "ejs": "^3.1.9",
        "express": "^4.18.2",
        "moment": "^2.29.4",
        "mysql2": "^3.6.5"
      },
    ```
    
    Use o *********************************npm init -y********************************* no console da pasta para criar os arquivos json caso eles ainda não existam, e depois use o código abaixo
    
    ```bash
    npm install body-parser ejs express moment mysql2
    ```
