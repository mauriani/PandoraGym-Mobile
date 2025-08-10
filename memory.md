# Memory - PandoraGym Mobile

## Informações do Projeto

### Visão Geral
- **Nome**: PandoraGym Mobile
- **Tipo**: Aplicativo mobile React Native
- **Objetivo**: Sistema para gerenciamento de academias (parte mobile do TCC)
- **Desenvolvedores**: Mauriani e Othavio
- **Repositório**: https://github.com/mauriani/PandoraGym

### Arquitetura do Sistema
O PandoraGym é composto por 3 partes:
1. **Mobile** (React Native) - Para alunos
2. **API** (Node.js + Express + Prisma + PostgreSQL) - Backend
3. **Web** (React.js + TypeScript) - Para administradores e personal trainers

### Stack Tecnológica Mobile
- **Linguagem**: JavaScript (React Native)
- **Navegação**: React Navigation
- **Gerenciamento de Estado**: Context API e React Query
- **Estilização**: NativeWind e TailwindCSS
- **Gráficos**: Victory Native
- **Armazenamento Local**: Mmkv

### Funcionalidades Principais Mobile
- Listagem de Exercícios (por categorias)
- Criação de Treinos (personal trainers)
- Execução de Treinos (interface intuitiva)
- Treinos Gratuitos (prévia de personal trainers)
- Histórico de Treinos (progresso ao longo do tempo)
- Programas de Treino (pacotes por objetivos)
- Listagem de Personal Trainers

### Estrutura do Projeto
```
/Users/patrykypradodeoliveira/pandora/Pandora-Gym-Mobile/
├── README.md
├── memory.md (este arquivo)
└── [estrutura a ser mapeada]
```

### Comandos de Execução
```bash
# Instalação
npm install

# Execução Android
npm run android

# Execução iOS
npm run ios
```

### Configuração
- Arquivo `.env` necessário com URL da API
- Integração com PandoraGym API

### Padrões de Código
- JavaScript (React Native)
- Uso de Context API para estado global
- React Query para gerenciamento de dados
- TailwindCSS/NativeWind para estilização
- Victory Native para gráficos

### Repositórios Relacionados
- **API**: https://github.com/OthavioBF/pandoragym-api
- **Web**: https://github.com/OthavioBF/pandoragym

### Contatos
- **Email**: maurianim@gmail.com
- **LinkedIn Mauriani**: https://www.linkedin.com/in/maurianimaciel/
- **LinkedIn Othavio**: https://www.linkedin.com/in/othavio-rubim/

---

## Histórico de Sessões

### Sessão 1 - 2025-08-07
- **Ação**: Criação do arquivo memory.md
- **Status**: Arquivo base criado com informações do README.md
- **Próximos passos**: Mapear estrutura completa do projeto e padrões de código específicos

---

## Notas Importantes
- Este é um projeto de TCC (Trabalho de Conclusão de Curso)
- Foco na experiência do usuário aluno no mobile
- Integração com sistema web para personal trainers e administradores
- Licença MIT
