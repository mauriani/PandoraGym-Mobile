# Configuração da API - PandoraGym Mobile

Este documento explica como a configuração da API funciona no PandoraGym Mobile e como fazer alterações quando necessário.

## 🔧 Como Funciona

O sistema automaticamente seleciona a URL da API baseado em:
- **Ambiente**: Desenvolvimento (`__DEV__ = true`) ou Produção (`__DEV__ = false`)
- **Plataforma**: iOS ou Android (`Platform.OS`)

### URLs Configuradas

| Ambiente | Plataforma | URL |
|----------|------------|-----|
| **Produção** | iOS/Android | `https://pandoragym-api.vercel.app` |
| **Desenvolvimento** | iOS | `http://localhost:3333` |
| **Desenvolvimento** | Android | `http://192.168.68.109:3333` |

## 📁 Arquivos Importantes

- `src/config/api.ts` - Configuração centralizada da API
- `src/services/api.tsx` - Cliente Axios configurado
- `.env` - Variáveis de ambiente (não commitado)
- `.env.example` - Exemplo das variáveis necessárias

## 🛠️ Como Alterar o IP do Android

### Método 1: Script Automático (Recomendado)
```bash
# Atualizar para um novo IP
npm run update-android-ip 192.168.1.100

# Ou usando node diretamente
node scripts/update-android-ip.js 192.168.1.100
```

### Método 2: Edição Manual
1. Abra o arquivo `src/config/api.ts`
2. Encontre a linha: `android: 'http://192.168.68.109:3333'`
3. Substitua pelo seu IP local: `android: 'http://SEU_IP_AQUI:3333'`
4. Salve o arquivo

## 🔍 Como Descobrir Seu IP Local

### macOS/Linux:
```bash
ifconfig | grep "inet " | grep -v 127.0.0.1
```

### Windows:
```cmd
ipconfig | findstr "IPv4"
```

### Alternativa Universal:
```bash
# No terminal onde a API está rodando, ela geralmente mostra o IP
npm start
# Procure por algo como: "Server running on http://192.168.x.x:3333"
```

## 🚀 Fluxo de Desenvolvimento

1. **Inicie a API** (backend) na porta 3333
2. **Configure o IP** se necessário (apenas Android)
3. **Inicie o Metro bundler**: `npm start`
4. **Execute o app**: `npm run android` ou `npm run ios`

## 📱 Diferenças entre Plataformas

### iOS (Simulador)
- ✅ `localhost` funciona perfeitamente
- ✅ Não precisa configurar IP
- ✅ Conecta automaticamente

### Android (Dispositivo Físico/Emulador)
- ❌ `localhost` NÃO funciona
- ✅ Precisa do IP da máquina host
- ⚠️ IP pode mudar ao trocar de rede

## 🔄 Logs de Debug

Em desenvolvimento, o console mostra a configuração atual:
```
🔧 API Configuration: {
  platform: 'android',
  environment: 'development',
  baseURL: 'http://192.168.68.109:3333'
}
```

## ⚠️ Problemas Comuns

### "Network Error" no Android
- **Causa**: IP incorreto ou API não está rodando
- **Solução**: Verifique o IP e se a API está ativa na porta 3333

### "Unable to connect" no iOS
- **Causa**: API não está rodando no localhost:3333
- **Solução**: Inicie a API com `npm start` no projeto backend

### App não atualiza após mudança de IP
- **Causa**: Cache do React Native
- **Solução**: Reinicie o Metro bundler e o app

## 🏗️ Build de Produção

Para builds de produção, o sistema automaticamente usa:
```
https://pandoragym-api.vercel.app
```

Não é necessário configurar nada adicional.

## 📝 Notas Importantes

- O arquivo `.env` não é commitado no Git (está no .gitignore)
- Use `.env.example` como referência para criar seu `.env`
- Sempre teste em ambas as plataformas após mudanças
- Em produção, apenas a URL do Vercel é usada
