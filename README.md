Segue uma versão ajustada para incluir a descrição das telas do protótipo no README:

---

# PandoraGym: Sistema Completo para Gerenciamento de Academias  

O **PandoraGym** é uma solução integrada desenvolvida como parte do nosso **Trabalho de Conclusão de Curso (TCC)**, com o objetivo de facilitar a gestão de academias, oferecendo ferramentas tanto para alunos quanto para personal trainers.  

Este projeto foi desenvolvido em colaboração entre **Mauriani** e **Othavio**, abrangendo o frontend mobile, o backend, e a versão web do sistema.  

### Repositórios do Projeto  
1. **[PandoraGym Mobile](https://github.com/mauriani/PandoraGym)**: Um aplicativo mobile desenvolvido em React Native para alunos e personal trainers gerenciarem treinos, histórico de atividades e metas.  
2. **[PandoraGym API](https://github.com/OthavioBF/pandoragym-api)**: Uma API RESTful, desenvolvida em Node.js, que serve como backend para o aplicativo e a versão web.  
3. **[PandoraGym Web](https://github.com/OthavioBF/pandoragym)**: Um sistema web desenvolvido para gerenciar academias, focado em administradores e personal trainers, utilizando as funcionalidades integradas ao backend.  

---

## 🎯 Funcionalidades  

### 📱 PandoraGym Mobile  
O aplicativo PandoraGym foi projetado para oferecer funcionalidades focadas em alunos e personal trainers.  

- **Listagem de Exercícios**: Apresente os treinos de forma detalhada, separados por categorias.  
- **Criação de Treinos**: Personal trainers podem criar novos treinos personalizados para seus alunos.  
- **Execução de Treinos**: Interface intuitiva para acompanhar as séries e repetições de cada exercício.  
- **Treinos Gratuitos**: Alunos podem explorar treinos oferecidos por personal trainers, visualizando uma prévia de seu perfil e treinos.  
- **Histórico de Treinos**: Monitore o progresso ao longo do tempo e acompanhe o desempenho de cada aluno.  
- **Programas de Treino**: Disponibilize pacotes de treino organizados por objetivos, como emagrecimento ou ganho de massa.  
- **Listagem de Personal Trainers**: Alunos podem pesquisar e visualizar informações sobre personal trainers disponíveis na plataforma.  

---

## 🖼️ Protótipo PandoraGym Mobile  

Durante o desenvolvimento do **PandoraGym Mobile**, foram criadas telas baseadas nos requisitos funcionais (RF) do projeto:  

### **Figura 1. Tela de Criação de Treino**  
**Baseada no RF06**: Essa tela permite que os personal trainers criem treinos personalizados, adicionando exercícios, séries e repetições.  

### **Figura 2. Tela de Realização de Treino**  
**Baseada no RF07**: Essa tela foi projetada para que os alunos acompanhem seus treinos em tempo real, com detalhamento dos exercícios e suas respectivas instruções.  

### **Figura 3. Tela de Histórico de Treino**  
**Baseada no RF08 e RF20**: Nesta tela, os alunos podem visualizar o histórico de treinos realizados ao longo de semanas e meses, permitindo monitorar seu progresso.  

### **Figura 4. Tela de Programas de Treinos**  
**Baseada no RF13**: Apresenta uma lista de programas de treino organizados por objetivos, como emagrecimento, hipertrofia, entre outros.  

### **Figura 5. Tela de Listagem de Personal Trainers**  
**Baseada no RF14**: Essa funcionalidade exibe uma lista de personal trainers disponíveis, permitindo que os alunos conheçam seus perfis e treinos.  

--- 

## 🛠️ Tecnologias Utilizadas  

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
- **Estilização**: Styled-components ou TailwindCSS  
- **Integração com API**: Comunicação direta com a PandoraGym API para funcionalidades em tempo real.  

--- 

Essa estrutura detalha as principais funcionalidades e protótipos do aplicativo mobile, destacando as telas e os requisitos funcionais implementados. Caso precise de mais ajustes ou imagens, posso ajudar!