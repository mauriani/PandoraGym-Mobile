#!/usr/bin/env node

/**
 * Script para atualizar o IP do Android no arquivo de configuração da API
 * Uso: node scripts/update-android-ip.js <novo-ip>
 * Exemplo: node scripts/update-android-ip.js 192.168.1.100
 */

const fs = require('fs')
const path = require('path')

const newIP = process.argv[2]

if (!newIP) {
  console.error('❌ Erro: IP não fornecido')
  console.log('📖 Uso: node scripts/update-android-ip.js <novo-ip>')
  console.log('📖 Exemplo: node scripts/update-android-ip.js 192.168.1.100')
  process.exit(1)
}

// Validar formato do IP
const ipRegex = /^(\d{1,3}\.){3}\d{1,3}$/
if (!ipRegex.test(newIP)) {
  console.error('❌ Erro: Formato de IP inválido')
  console.log('📖 Use o formato: xxx.xxx.xxx.xxx')
  process.exit(1)
}

const configPath = path.join(__dirname, '..', 'src', 'config', 'api.ts')

try {
  // Ler o arquivo atual
  let content = fs.readFileSync(configPath, 'utf8')
  
  // Encontrar e substituir o IP do Android
  const androidIPRegex = /android: 'http:\/\/(\d{1,3}\.){3}\d{1,3}:3333'/
  const newAndroidURL = `android: 'http://${newIP}:3333'`
  
  if (androidIPRegex.test(content)) {
    content = content.replace(androidIPRegex, newAndroidURL)
    
    // Escrever o arquivo atualizado
    fs.writeFileSync(configPath, content, 'utf8')
    
    console.log('✅ IP do Android atualizado com sucesso!')
    console.log(`🔧 Nova URL: http://${newIP}:3333`)
    console.log('📱 Reinicie o app para aplicar as mudanças')
  } else {
    console.error('❌ Erro: Não foi possível encontrar a configuração do Android no arquivo')
  }
} catch (error) {
  console.error('❌ Erro ao atualizar o arquivo:', error.message)
  process.exit(1)
}
