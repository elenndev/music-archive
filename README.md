# Blog | Music Archive

Projeto construido utilizando o React e conjutamente com a API criada especialmente para o mesmo.

- Confira o blog [Music Archive](https://music-archive-blog.vercel.app) !
- [Backend do site](https://github.com/elenndev/music-archive-server.git).

## Funcionalidades
- Leitura e gerenciamento de publicações,rascunhos , playlist e albúm em destaque.
- Modo Claro/Escuro: Guarda a preferência de tema do usuário no local storage e em caso de primeira visita por exemplo, segue o tema do dispositivo através do `window.matchMedia`.
- Login para o acesso e proteção da página administrativa do blog.
- Criação automatizada de `iframe`: No dashboard, o invés de ter que acessar o spotify e ir em "incorporar playlist", basta fornecer o link de compartilhamento normal da playlist que ele será formatado e guarrtado no formato correto de um embed..
- Interação com a API do Spotify: No dashboard, o adm pode buscar um albúm pelo nome e assim definir o albúm em destaque que é renderizado na página inicial do blog.
- Mais detalhes sobre as funcionalidades do Dashboard podem ser melhor verificadas [aqui](https://github.com/elenndev/music-blog-dashboard.git).


