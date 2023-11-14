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
    
2. Instale o user ***nodeenv*** através do pip
    
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
    
2. Abra o phpMyAdmin no navegador e crie uma database chamada ***users***
3. Execute o seguinte código na seção SQL
    
    ```sql
    CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        cpf VARCHAR(14) NOT NULL UNIQUE,
        senha VARCHAR(255) NOT NULL
    );
    ```
