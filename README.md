# spotifood / ifood-frontend-test

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:
[Git](https://git-scm.com), [Node.js](https://nodejs.org/en/). 
Além disto é bom ter um editor para trabalhar com o código como [VSCode](https://code.visualstudio.com/)

<h4 align="center"> 
	🚀 Concluído... 🚀
</h4>

### Features

- [x] Lista de Playlist
- [x] Filtros 
- [x] Login no spotify para acessar a chave

### 🎲 Rodando o Back End (servidor - Responsável em pegar a chave de acesso)

```bash
# Clone este repositório
$ git clone <https://github.com/spotify/web-api-auth-examples>

# Acesse a pasta do projeto
$ cd web-api-auth-examples

# Instale as dependências
$ npm install

# Após a instalação acesse a pasta
$ cd web-api-auth-examples

# Abra o arquivo
$ app.js

# Busque pelas variáveis “client_id”, “client_secret” e “redirect_ui” e altere para:
$ var client_id = '6d0768c9900d466f8945f731cf743ba2';
$ var client_secret = '0cfcbf3b690a49078f85fb4f06979180';
$ var redirect_uri = 'http://localhost:8888/callback'; 

# Na linha 107 no primeiro red.redirect e altere:
$ res.redirect('http://localhost:8080/#'

# Vá para a pasta:
$ cd authorization_code

# Execute a aplicação em modo de desenvolvimento
$ node app.js

# O servidor inciará na porta:8888
```
### 🎲 Rodando o Front End
```bash

# Clone este repositório
$ https://github.com/gregoryls1/spotifood

# Acesse a pasta do projeto
$ cd spotifood

# Instale as dependências
$ npm install

# Execute a aplicação em modo de desenvolvimento
$ npm start

# O servidor inciará na porta:8080
```

### 🛠 Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [Node.js](https://nodejs.org/en/)
- [React](https://pt-br.reactjs.org/)
- [JavaScript](https://www.javascript.com/)
- [Webpack4](https://webpack.js.org/)
- [Babel](https://babeljs.io/)
- [Jest](https://jestjs.io/pt-BR/)
