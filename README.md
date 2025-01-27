# PandoraGym: Sistema Completo para Gerenciamento de Academias  

O **PandoraGym** é uma solução integrada desenvolvida como parte do nosso **Trabalho de Conclusão de Curso (TCC)**, com o objetivo de facilitar a gestão de academias, oferecendo ferramentas tanto para alunos quanto para personal trainers.  

Este projeto foi desenvolvido em colaboração entre **Mauriani** e **Othavio**, abrangendo tanto o frontend mobile quanto o backend da aplicação.  

### Repositórios do Projeto  
1. **[PandoraGym Mobile](https://github.com/mauriani/PandoraGym)**: Um aplicativo mobile desenvolvido em React Native para alunos e personal trainers gerenciarem treinos, histórico de atividades e metas.  
2. **[PandoraGym API](https://github.com/OthavioBF/pandoragym-api)**: Uma API RESTful, desenvolvida em Node.js, que serve como backend para o aplicativo, oferecendo recursos como autenticação, gerenciamento de treinos e armazenamento de dados.  

---

## 🎯 Funcionalidades  

### 📱 PandoraGym Mobile  
- **Gerenciamento de Treinos**: Os alunos podem visualizar seus treinos organizados por dias e categorias (ex.: pernas, braços).  
- **Histórico de Atividades**: Visualize o progresso de treinos ao longo de semanas ou meses.  
- **Interatividade**: Suporte a vídeos explicativos de exercícios, checkboxes para marcação de atividades concluídas.  
- **Gráficos de Progresso**: Monitore métricas de desempenho e evolução.  
- **Notificações**: Alertas de treinos e lembretes configuráveis.  
- **Tema Dinâmico**: Modo claro e escuro para melhor usabilidade.  

### 🌐 PandoraGym API  
- **Autenticação Segura**: Utilização de JWT para autenticação de usuários.  
- **Gerenciamento de Usuários**: Cadastro, login e atualização de perfis.  
- **Controle de Treinos**: Endpoints para criar, editar e visualizar treinos e exercícios.  
- **Armazenamento de Dados**: Persistência de histórico de treinos e progresso no banco de dados PostgreSQL.  
- **ORM com Prisma**: Utilização do Prisma para interação robusta e eficiente com o banco de dados.  
- **Integração com Frontend**: API desenhada para integração eficiente com o aplicativo mobile.  

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

---

## 🖼️ Capturas de Tela  

### PandoraGym Mobile  
*Adicione aqui capturas de tela do aplicativo, como tela de login, visualização de treinos e gráficos de progresso.*  

### PandoraGym API  
*Adicione aqui exemplos de endpoints documentados no Swagger.*  

---

## 👥 Contribuidores  

- **Frontend Mobile**: [Mauriani](https://github.com/mauriani)  
- **Backend API**: [OthavioBF](https://github.com/OthavioBF)  

---

## 📄 Licença  

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.  

---

## ✨ Contato  

Para dúvidas ou sugestões, entre em contato pelo e-mail: **seuemail@exemplo.com**  
```

### O que foi adicionado:  
- Menção de que o projeto é parte do TCC.  
- Créditos ao **Othavio** como co-desenvolvedor.  
- Destaque ao uso do **Prisma** e do **PostgreSQL** no backend.  
- Detalhamento do processo de migração no backend com o Prisma.  

Se precisar de mais ajustes ou exemplos específicos, é só avisar!
