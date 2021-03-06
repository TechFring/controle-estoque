# Controle de Estoque

## Faz o controle de estoque e apresenta algumas estátisticas com base nos dados cadastrados

### Introdução
Esta aplicação trata se de um trabalho acadêmico e foi desenvolvida inicialmente com o propósito de obtenção de nota na Av1 (avaliação 1)
da disciplina de Aplicações Web. Disciplina que foi ministrada por Ivonete Ferreira
no 3° semestre do curso de Análise e Desenvolvimento de Sistemas.

### Funcionalidades
- Aplicação de página única (SPA)
- Responsividade
- Mantem os cadastros de clientes, produtos e vendas
- Campo para a busca de registros
- Apresenta algumas estátisticas em cada página
- Salva a última página acessada no armazenamento local

### Base de dados
A base de dados da aplicação possui triggers configuradas que são responsáveis por:
- Dar baixa no estoque
- Fazer o estorno de vendas
- Calcular e lançar o valor total da venda (preço unitário * quantidade)

### Assista ao vídeo da aplicação em funcionamento
[![Aplicação de controle de estoque](http://img.youtube.com/vi/Qjw5NFfL8qk/0.jpg)](http://www.youtube.com/watch?v=Qjw5NFfL8qk "Vídeo da aplicação em funcionamento")

### Captura de tela
![clientes](https://user-images.githubusercontent.com/54766216/86433743-edadd280-bcd1-11ea-9ce7-34ae6955fd98.jpg)

### Instalando a aplicação

#### Importando a base de dados
O arquivo com a base de dados se encontra em
> backend\model\database\trabalho.sql

#### Instalando as dependências do frontend
Abra o terminal > acesse o diretório em que está salva a aplicação > execute o comando a seguir
```
npm i
```

#### Ajustando o backend
A aplicação está configurada para acessar a porta 3309. Acesse o arquivo a seguir caso queira alterar para a porta padrão (3306)
> backend\model\ConnectionFactory.php

Copie e cole o código abaixo sobre a linha 4 do arquivo ConnectionFactory.php
```
private static $host = 'localhost';
```
