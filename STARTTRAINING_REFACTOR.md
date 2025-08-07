# Refatoração da Tela StartTraining

## Visão Geral

A tela de StartTraining foi refatorada para separar a **visualização de informações do treino** da **execução do treino**, criando uma experiência mais clara e organizada para o usuário.

## Estrutura Anterior vs Nova

### Antes
- Uma única tela que misturava informações do treino com execução
- Interface confusa com muitas informações simultâneas
- Usuário ia direto para execução sem overview do treino

### Depois
- **PreWorkoutScreen**: Tela de pré-visualização com informações do treino
- **WorkoutExecutionScreen**: Tela focada na execução do treino
- Fluxo mais intuitivo: Informações → Iniciar → Execução

## Arquivos Criados/Modificados

### Novos Arquivos
1. `src/screens/StartTraining/pages/PreWorkoutScreen.tsx`
   - Tela de pré-visualização do treino
   - Mostra estatísticas (calorias, duração, exercícios)
   - Lista de exercícios com preview
   - Botão "Iniciar Treino"

2. `src/screens/StartTraining/pages/WorkoutExecutionScreen.tsx`
   - Tela de execução do treino
   - Barra de progresso
   - Vídeo do exercício atual
   - Lista de exercícios com checkbox
   - Timer e controles de carga

3. `src/screens/StartTraining/__components__/WorkoutStats.tsx`
   - Componente reutilizável para estatísticas do treino
   - Mostra calorias, exercícios e duração estimada

4. `src/screens/StartTraining/__components__/ExercisePreviewItem.tsx`
   - Componente para item de exercício na pré-visualização
   - Thumbnail, nome, séries, reps e duração estimada

5. `src/screens/StartTraining/__components__/ProgressBar.tsx`
   - Componente de barra de progresso
   - Usado na tela de execução

### Arquivos Modificados
1. `src/screens/StartTraining/index.tsx`
   - Agora exporta as duas telas
   - PreWorkoutScreen como StartTraining (padrão)
   - WorkoutExecutionScreen como nova tela

2. `src/routes/stack.routes.tsx`
   - Adicionada nova rota `workoutExecution`
   - Import das duas telas
   - Tipos atualizados no RootStackParamList

## Fluxo de Navegação

```
Home/Lista de Treinos
    ↓
PreWorkoutScreen (startTraining)
    ↓ [Botão "Iniciar Treino"]
WorkoutExecutionScreen (workoutExecution)
    ↓ [Botão "Concluir Treino"]
Volta para Home
```

## Funcionalidades da PreWorkoutScreen

### Hero Section
- Imagem/vídeo de destaque do primeiro exercício
- Botão de play centralizado
- Título do treino e informações básicas

### Estatísticas
- **Calorias**: Estimativa baseada na duração
- **Exercícios**: Número total de exercícios
- **Duração**: Tempo estimado em minutos

### Lista de Exercícios
- Preview de cada exercício com thumbnail
- Informações: séries, repetições, carga
- Duração estimada por exercício
- Navegação visual com chevron

### Ações
- Botão "Iniciar Treino" ou "Continuar Treino"
- Menu de opções (editar/excluir treino)

## Funcionalidades da WorkoutExecutionScreen

### Barra de Progresso
- Indicador visual do progresso
- Contador de exercícios completados

### Exercício Atual
- Vídeo/thumbnail em destaque
- Informações detalhadas (séries, reps, carga)
- Timer de descanso
- Botão para editar carga

### Lista de Exercícios
- Checkboxes para marcar exercícios concluídos
- Seleção do exercício atual
- Scroll vertical para navegação

### Controles
- Botão "Concluir Treino" com contador
- Modal para edição de carga
- Validação de exercícios completados

## Benefícios da Refatoração

1. **UX Melhorada**: Separação clara entre visualização e execução
2. **Código Organizado**: Componentes reutilizáveis e responsabilidades bem definidas
3. **Manutenibilidade**: Cada tela tem uma responsabilidade específica
4. **Escalabilidade**: Fácil adicionar novas funcionalidades em cada tela
5. **Performance**: Carregamento otimizado por tela

## Próximos Passos Sugeridos

1. Adicionar animações de transição entre telas
2. Implementar cache de dados para melhor performance
3. Adicionar funcionalidade de preview de exercícios na PreWorkoutScreen
4. Implementar notificações push para lembretes de treino
5. Adicionar métricas de tempo real na execução

## Compatibilidade

- ✅ Mantém compatibilidade com rotas existentes
- ✅ Preserva funcionalidades originais
- ✅ Não quebra integrações existentes
- ✅ Melhora a experiência sem breaking changes
