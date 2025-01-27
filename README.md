# PandoraGym: Sistema Completo para Gerenciamento de Academias  

O **PandoraGym** é uma solução integrada desenvolvida como parte do nosso **Trabalho de Conclusão de Curso (TCC)**, com o objetivo de facilitar a gestão de academias, oferecendo ferramentas tanto para alunos quanto para personal trainers.  

Este projeto foi desenvolvido em colaboração entre **Mauriani** e **Othavio**, abrangendo o frontend mobile, o backend, e a versão web do sistema.  

### Repositórios do Projeto  
1. **[PandoraGym Mobile](https://github.com/mauriani/PandoraGym)**: Um aplicativo mobile desenvolvido em React Native para alunos gerenciar seus treinos, histórico de atividades e metas.  
2. **[PandoraGym API](https://github.com/OthavioBF/pandoragym-api)**: Uma API RESTful, desenvolvida em Node.js, que serve como backend para o aplicativo e a versão web.  
3. **[PandoraGym Web](https://github.com/OthavioBF/pandoragym)**: Um sistema web desenvolvido para gerenciar academias, focado em administradores e personal trainers, utilizando as funcionalidades integradas ao backend.  

---

## 🎯 Funcionalidades  

### 📱 PandoraGym Mobile  
- **Listagem de Exercícios**: Apresente os treinos de forma detalhada, separados por categorias.  
- **Criação de Treinos**: Personal trainers podem criar novos treinos personalizados para seus alunos.  
- **Execução de Treinos**: Interface intuitiva para acompanhar as séries e repetições de cada exercício.  
- **Treinos Gratuitos**: Alunos podem explorar treinos oferecidos por personal trainers, visualizando uma prévia de seu perfil e treinos.  
- **Histórico de Treinos**: Monitore o progresso ao longo do tempo e acompanhe o desempenho de cada aluno.  
- **Programas de Treino**: Disponibilize pacotes de treino organizados por objetivos, como emagrecimento ou ganho de massa.  
- **Listagem de Personal Trainers**: Alunos podem pesquisar e visualizar informações sobre personal trainers disponíveis na plataforma.  

### 🌐 PandoraGym API  
- **Autenticação Segura**: Utilização de JWT para autenticação de usuários.  
- **Gerenciamento de Usuários**: Cadastro, login e atualização de perfis.  
- **Controle de Treinos**: Endpoints para criar, editar e visualizar treinos e exercícios.  
- **Armazenamento de Dados**: Persistência de histórico de treinos e progresso no banco de dados PostgreSQL.  
- **ORM com Prisma**: Utilização do Prisma para interação robusta e eficiente com o banco de dados.  
- **Integração com Frontend**: API desenhada para integração eficiente com o aplicativo mobile e a versão web.  

### 🖥️ PandoraGym Web  
- **Painel Administrativo**: Controle de alunos, personal trainers, e gerenciamento de treinos diretamente pelo navegador.  
- **Relatórios e Estatísticas**: Acompanhe métricas de desempenho dos alunos e atividades realizadas na academia.  
- **Cadastro e Gerenciamento**: Ferramentas para criar, editar ou excluir informações de treinos e usuários.  
- **Interface Amigável**: Design responsivo para diferentes dispositivos e intuitivo para facilitar o uso por administradores.  

---

## 🚀 Tecnologias Utilizadas  

### 📱 PandoraGym Mobile  
- **Linguagem**: JavaScript (React Native)  
- **Navegação**: React Navigation  
- **Gerenciamento de Estado**: Context API e React Query  
- **Estilização**: NativeWind e TailwindCSS  
- **Notificações**: OneSignal  
- **Gráficos**: Victory Native  
- **Armazenamento Local**: AsyncStorage  

### 🌐 PandoraGym API  
- **Linguagem**: JavaScript (Node.js)  
- **Framework**: Express.js  
- **ORM**: Prisma  
- **Banco de Dados**: PostgreSQL  
- **Autenticação**: JSON Web Tokens (JWT)  
- **Gerenciamento de Erros**: Middleware customizado  
- **Validação**: Joi para validação de entradas  
- **Documentação da API**: Swagger  

### 🖥️ PandoraGym Web  
- **Linguagem**: TypeScript  
- **Framework**: React.js  
- **Gerenciamento de Estado**: React Query  
- **Estilização**: TailwindCSS  
- **Integração com API**: Comunicação direta com a PandoraGym API para funcionalidades em tempo real.  

---

## 🛠️ Como Executar os Projetos  

### 📱 PandoraGym Mobile  
1. Clone o repositório:  
   ```bash  
   git clone https://github.com/mauriani/PandoraGym.git  
   cd PandoraGym  
   ```  
2. Instale as dependências:  
   ```bash  
   npm install  
   ```  
3. Configure as variáveis de ambiente:  
   Crie um arquivo `.env` com as chaves necessárias, como a URL da API.  
4. Execute o projeto:  
   - Para Android:  
     ```bash  
     npm run android  
     ```  
   - Para iOS:  
     ```bash  
     npm run ios  
     ```  

### 🌐 PandoraGym API  
1. Clone o repositório:  
   ```bash  
   git clone https://github.com/OthavioBF/pandoragym-api.git  
   cd pandoragym-api  
   ```  
2. Instale as dependências:  
   ```bash  
   npm install  
   ```  
3. Configure as variáveis de ambiente:  
   Crie um arquivo `.env` com as chaves para o banco de dados PostgreSQL e outros serviços (exemplo no `.env.example`).  
4. Gere as migrações com o Prisma:  
   ```bash  
   npx prisma migrate dev  
   ```  
5. Inicie o servidor:  
   ```bash  
   npm start  
   ```  
6. Acesse a documentação da API:  
   Após executar o servidor, a documentação estará disponível em `http://localhost:3000/api-docs`.  

### 🖥️ PandoraGym Web  
1. Clone o repositório:  
   ```bash  
   git clone https://github.com/OthavioBF/pandoragym.git  
   cd pandoragym  
   ```  
2. Instale as dependências:  
   ```bash  
   npm install  
   ```  
3. Configure as variáveis de ambiente:  
   Crie um arquivo `.env` com a URL da API e outras configurações necessárias.  
4. Execute o projeto:  
   ```bash  
   npm start  
   ```  
5. Acesse no navegador:  
   O sistema estará disponível em `http://localhost:3000`.  

---

## 🖼️ Capturas de Tela  

### PandoraGym Mobile  
*Adicione aqui capturas de tela do aplicativo, como tela de login, visualização de treinos e gráficos de progresso.*  

### PandoraGym Web  
*Adicione aqui capturas de tela do sistema web, como o painel administrativo e relatórios.*  

### PandoraGym API  
*Adicione aqui exemplos de endpoints documentados no Swagger.*  

---

## 👥 Contribuidores  

- **Frontend Mobile**: [Mauriani](https://github.com/mauriani)
- **Frontend Web**: [OthavioBF](https://github.com/OthavioBF)
- **Backend API e Web**: [OthavioBF](https://github.com/OthavioBF)  - [Mauriani](https://github.com/mauriani) 

---

## 📄 Licença  

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.  

---

## ✨ Contato  

Para dúvidas ou sugestões, entre em contato pelo e-mail: **seuemail@exemplo.com**  
```

### O que foi adicionado:  
- Detalhamento sobre a versão **web** do PandoraGym.  
- Como executar o projeto web.  
- Créditos ao **OthavioBF** pelo desenvolvimento do backend e da versão web.  

Se precisar de mais alterações ou aprimoramentos, é só avisar!
